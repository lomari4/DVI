export default class Level4 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level4' });
		this.level = 4;
		this.tileSize = 64;
	}

	preload() { }

	stunBoss(boss,slash){
		if(!boss.invincible){
			this.game.stunEnemy(boss, slash);
			this.game.delayStun(this,boss);
		}
	}

	create() {
		//GENERAL//
		this.game = this.scene.get('Game'); //(clase Game con todas las funciones que van a compartir todos los niveles)
		this.counter = 0; //contador del numero de tiles que has cambiado
		this.checkWin = 0; //contador del numero de tiles totales en el mapa
		this.winFlag = false;

		//añadimos el sonido SOLO cuando entra en la zona del boss
		/*this.music = this.game.addSoundtrack(this.level, this);
		this.music.setLoop(true);
		this.music.play();*/

		//MAPA//
		this.map = this.game.addMap(this, this.level); //hay que pasarle el nivel como segundo arg
		this.background = this.game.addBackground(this, this.level);
		this.groundLayer = this.game.addGround(this, this.map);

		//Cuenta el numero de tiles que hay en el mapa
		this.checkWin = this.game.countTotalTiles(this.map, this.groundLayer);

		//HUD de vidas
		this.hud = this.game.addHud(this);

		//Progreso en el juego
		this.game.textProgress(this);

		//JUGADOR//
		this.wolf = this.game.spawnPlayer(this, 2600, 919, this.groundLayer);
		//colisiones del jugador
		this.collider = this.physics.add.collider(this.wolf, this.groundLayer);
		//ataque del jugador
		this.slash = this.add.group();

		//CAMARA//
		this.game.addCamera(this, this.wolf, this.groundLayer); //editar
		//this.cameras.main.setZoom(0.7);
		//TO DO: ZONA DONDE CUANDO EL JUAGDOR PISE, SE BLOQUEE LA CAMARA
		//this.cameras.main.stopFollow();

		//BOSS//
		//crear grupo con todos los enemigos para las fisicas
		this.enemies = this.physics.add.group();

		//spawn boss
		//habia pensado hacerlo aparecer con la animacion de muerto, pero al reves sprite.anims.playReverse("die")
		//....		

		this.game.spawnBoss(this, 2800, 850, this.enemies);

		//colisiones de los enemigos
        this.physics.add.collider(this.enemies, this.groundLayer);

        this.enemies.getChildren().forEach(function (item) {
            item.addPhysics();
        }, this);


		//OVERLAPS//
		this.physics.add.overlap(this.wolf, this.enemies, this.game.knockBack, this.game.overlapcallback, this);
		this.physics.add.overlap(this.enemies, this.slash, this.stunBoss, null, this);

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
			//ataque del jugador
			this.game.checkPlayerAttack(this, this.slash, this.enemies, this.game);
			//ataque de los enemigos
			this.game.checkPlayerisAttacked(this, this.wolf, this.game);
		}

		//MUESTRA EL PROGRESO AL JUGADOR
		this.game.showProgress(this.counter, this.checkWin);

		//COMPRUEBA SI HA GANADO (SI EL BOSS HA MUERTO Y SI NIVEL ESTA DESCONGELADO)
		this.enemies.getChildren().forEach(function (item) {
			if(item.isAlive())
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

