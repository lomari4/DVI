export default class Level4 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level4' });
		this.level = 4;
		this.tileSize = 64;
		this.zoneX = 2000;
	}

	preload() { }

	create() {
		//GENERAL//
		this.game = this.scene.get('Game'); //(clase Game con todas las funciones que van a compartir todos los niveles)
		this.counter = 0; //contador del numero de tiles que has cambiado
		this.checkWin = 0; //contador del numero de tiles totales en el mapa
		this.winFlag = false;
		this.inZone = false;
		//tecla de pausa
		this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

		//añadimos el sonido
		this.music = this.game.addSoundtrack(this.level, this);
		this.music.setVolume(0.3);
		this.music.pause();

		//MAPA//
		this.map = this.game.addMap(this, this.level); //hay que pasarle el nivel como segundo arg
		this.background = this.game.addBackground(this, this.level);
		this.groundLayer = this.game.addGround(this, this.map);
		this.collisionLayer = this.game.addEnemyCollision(this.map); //para limitar el movimiento en la zona del boss

		//Cuenta el numero de tiles que hay en el mapa
		this.checkWin = this.game.countTotalTiles(this.map, this.groundLayer);

		//HUD de vidas del jugador
		this.game.addHud(this);

		//icono para mutear musica
		this.game.addIconAudio(this);

		//Progreso en el juego
		this.game.textProgress(this);

		//JUGADOR//
		this.wolf = this.game.spawnPlayer(this, 0, 919, this.groundLayer);

		//colisiones del jugador
		this.collider = this.physics.add.collider(this.wolf, this.groundLayer);
		//ataque del jugador
		this.slash = this.add.group();

		//CAMARA//
		this.game.addCamera(this, this.wolf, this.groundLayer);

		//BOSS//
		this.enemies = this.physics.add.group();

		//spawn boss
		this.game.spawnBoss(this, 3200, 719, this.enemies);

		//colisiones de los enemigos
		this.physics.add.collider(this.enemies, this.groundLayer);
		this.physics.add.collider(this.enemies, this.collisionLayer);
		this.enemies.getChildren().forEach(function (item) {
			item.addPhysics();
		}, this);

		//grupo de proyectiles
		this.projectiles = this.add.group();

		//OVERLAPS//
		this.physics.add.overlap(this.wolf, this.enemies, this.game.knockBack, this.game.overlapcallback, this);
		this.physics.add.overlap(this.enemies, this.slash, this.game.hitBoss, null, this);
		this.physics.add.overlap(this.wolf, this.projectiles, this.game.knockBack, this.game.hitBeam, this.game.overlapcallback, this);

	}

	update(time, delta) {
		if (!this.wolf.winGame) {
			//update del jugador
			this.wolf.update(this.game);

			//ver si enemigo puede atacar
			this.game.enemyUpdate(this, this.enemies, this.wolf);

			//ver si ha pausado el juego
			this.game.updatePauseResume(this, this.level, this.key, this.wolf);

			//FUNCION DE DESCONGELAR EL SUELO DEL JUGADOR
			this.counter += this.game.checkIfMelt(this.wolf, this.game, this.groundLayer);
			
			//ATAQUES
			//ver si jugador esta dañado
			this.game.checkPlayerisAttacked(this, this.wolf, this.game);

			//ZONA BOSS
			if (this.wolf.x > this.zoneX && !this.wolf.inZone) {
				//HUD de vidas del boss
				this.game.boss_addHud(this);
				this.wolf.inZone = true;
				//bloquear camara
				this.game.BossCameraStop(this);
				//audio
				if(this.game.musicOn)
					this.music.resume();
				//nueva capa de collision para que el jugador no pueda escapar del boss
				this.collider = this.physics.add.collider(this.wolf, this.collisionLayer);
			}
		}

		//MUESTRA EL PROGRESO AL JUGADOR
		this.game.showProgress(this.counter, this.checkWin);

		//COMPRUEBA SI HA GANADO (SI EL BOSS HA MUERTO Y SI NIVEL ESTA DESCONGELADO)
		if (this.wolf.killedBoss){
			this.music.stop();
			this.game.checkIfWin(this, this.counter, this.checkWin, this.wolf, this.enemies, this.game, this.level);
			this.physics.world.removeCollider(this.collider);
			this.game.addCamera(this, this.wolf, this.groundLayer);
		}

		//COMPRUEBA SI HA PERDIDO
		if (!this.wolf.loseGame)
			this.game.checkIfLose(this, this.wolf, this.game, this.level);
		if (this.wolf.loseGame)
			this.game.gameOver(this.wolf, this);

		//si ha ganado, audio de game win y fade in del nuevo bg
		if (this.wolf.winGame && !this.winFlag) {
			this.game.audio_gameWin();
			this.game.bgFadeIn(this, this.level);
			this.winFlag = true;
		}

	}

}

