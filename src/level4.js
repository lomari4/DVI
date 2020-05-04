export default class Level4 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level4' });
		this.level = 4;
		this.tileSize = 64;
		this.zoneX = 2000;
	}

	preload() { }

	resetBounds(){
		this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;
	}

	modifyBounds(){
		this.physics.world.bounds.width = this.groundLayer.width; //TODO CAMBIAR ESTO
        this.physics.world.bounds.height = this.groundLayer.height;
	}

	//Camara stop cuando boss spawnea
	cameraStop(){
        this.cameras.main.stopFollow();
        this.cameras.main.setScroll(this.cameras.main.x + 2500);
        this.cameras.main.flash(250, 255, 0 , 0);
        this.inZone = true;
    }

	create() {
		//GENERAL//
		this.game = this.scene.get('Game'); //(clase Game con todas las funciones que van a compartir todos los niveles)
		this.counter = 0; //contador del numero de tiles que has cambiado
		this.checkWin = 0; //contador del numero de tiles totales en el mapa
		this.winFlag = false;
		this.inZone = false;
		this.bossInvincible = true;

		//MAPA//
		this.map = this.game.addMap(this, this.level); //hay que pasarle el nivel como segundo arg
		this.background = this.game.addBackground(this, this.level);
		this.groundLayer = this.game.addGround(this, this.map);
		this.collisionLayer = this.game.addEnemyCollision(this.map); //para limitar el movimiento en la zona del boss

		//Cuenta el numero de tiles que hay en el mapa
		this.checkWin = this.game.countTotalTiles(this.map, this.groundLayer);

		//HUD de vidas
		this.hud = this.game.addHud(this);

		//Progreso en el juego
		this.game.textProgress(this);

		//JUGADOR//
		//this.wolf = this.game.spawnPlayer(this, 0, 919, this.groundLayer);
		this.wolf = this.game.spawnPlayer(this, 1900, 919, this.groundLayer); //TESTING
		//colisiones del jugador
		this.collider = this.physics.add.collider(this.wolf, this.groundLayer);
		//ataque del jugador
		this.slash = this.add.group();

		//CAMARA//
		this.game.addCamera(this, this.wolf, this.groundLayer);

		//BOSS//
		this.enemies = this.physics.add.group();

		//spawn boss
		this.game.spawnBoss(this, 2800, 719, this.enemies);

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
		this.physics.add.overlap(this.enemies, this.slash, this.game.stunEnemy, null, this);
		this.physics.add.overlap(this.wolf, this.projectiles, this.game.knockBack, this.game.hitBeam, this.game.overlapcallback, this);

	}

	update(time, delta) {
		if (!this.wolf.winGame) {
			//update del jugador
			this.wolf.update(this.game);

			//update de los enemigos
			this.game.enemyUpdate(this, this.enemies, this.wolf);

			//FUNCION DE DESCONGELAR EL SUELO DEL JUGADOR
			this.counter += this.game.checkIfMelt(this.wolf, this.game, this.groundLayer);

			//ATAQUES
			//ataque del jugador. Solo efectivo si boss no es invencible
			this.enemies.getChildren().forEach(function (item) {
				if(!item.invincible)
					this.game.checkPlayerAttack(this, this.slash, this.enemies, this.game);
			},this);

			//ataque de los enemigos al juagdor
			this.game.checkPlayerisAttacked(this, this.wolf, this.game);

			//ZONA BOSS
			if(this.wolf.x > this.zoneX && !this.inZone){
				this.wolf.inZone = true;
				//bloquear camara
				this.cameraStop();
				//audio
				this.music = this.game.addSoundtrack(this.level, this);
				this.music.setLoop(true);
				this.music.play();	
				//nueva capa de collision para que el jugador no pueda escapar del boss
				this.collider = this.physics.add.collider(this.wolf, this.collisionLayer);
			}
		}

		//MUESTRA EL PROGRESO AL JUGADOR
		this.game.showProgress(this.counter, this.checkWin);

		//COMPRUEBA SI HA GANADO (SI EL BOSS HA MUERTO Y SI NIVEL ESTA DESCONGELADO)
		this.enemies.getChildren().forEach(function (item) {
			if(!item.isAlive())
				this.game.checkIfWin(this, this.counter, this.checkWin, this.wolf, this.enemies, this.game, this.level);
		},this);

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

