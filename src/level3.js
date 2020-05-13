export default class Level3 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level3' });
		this.level = 3;
		this.tileSize = 64;
	}

	preload() { }

	create() {
		//GENERAL//
		this.game = this.scene.get('Game'); //(clase Game con todas las funciones que van a compartir todos los niveles)
		this.counter = 0; //contador del numero de tiles que has cambiado
		this.checkWin = 0; //contador del numero de tiles totales en el mapa
		this.winFlag = false;

		//añadimos el sonido
		this.music = this.game.addSoundtrack(this.level, this);
		this.music.setLoop(true);
		this.music.play();

		//MAPA//
		this.map = this.game.addMap(this, this.level); //hay que pasarle el nivel como segundo arg
		this.background = this.game.addBackground(this, this.level);
		this.groundLayer = this.game.addGround(this, this.map);
		let enemy_collisionLayer = this.game.addEnemyCollision(this.map);

		//Cuenta el numero de tiles que hay en el mapa
		this.checkWin = this.game.countTotalTiles(this.map, this.groundLayer);

		//HUD de vidas
		this.game.addHud(this);

		//Progreso en el juego
		this.game.textProgress(this);

		//JUGADOR//
		this.wolf = this.game.spawnPlayer(this, 0, 1940, this.groundLayer);
		//colisiones del jugador
		this.collider = this.physics.add.collider(this.wolf, this.groundLayer);
		//ataque del jugador
		this.slash = this.add.group();

		//CAMARA//
		this.game.addCamera(this, this.wolf, this.groundLayer);

		//ENEMIGOS//
		//crear grupo con todos los enemigos para las fisicas
		this.enemies = this.physics.add.group();

		//funciones de spawn de enemigos
		this.game.spawnSwub(this, 200, 1015, this.enemies);
		this.game.spawnSwub(this, 900, 1115, this.enemies);
		this.game.spawnYeti(this, 1200, 1910, this.enemies);
		this.game.spawnYeti(this, 2000, 1910, this.enemies);
		this.game.spawnBoar(this, 1600, 1330, this.enemies);
		this.game.spawnIcedrake(this, 1700, 1000, this.enemies);
		this.game.spawnYeti(this, 1700, 500, this.enemies);
		this.game.spawnIcedrake(this, 700, 550, this.enemies);

		//colisiones de los enemigos
		this.game.addEnemyPhysics(this, this.enemies, this.groundLayer, enemy_collisionLayer);

		//grupo de proyectiles
		this.projectiles = this.add.group();
		//grupo de hielos creados por los yetis
		this.ices = this.add.group();

		//OVERLAPS//
		this.physics.add.overlap(this.wolf, this.ices, this.game.knockBack, this.game.overlapcallback, this);
		this.physics.add.overlap(this.wolf, this.enemies, this.game.knockBack, this.game.overlapcallback, this);
		this.physics.add.overlap(this.wolf, this.projectiles, this.game.knockBack, this.game.hitBeam, this.game.overlapcallback, this);
		this.physics.add.overlap(this.enemies, this.slash, this.game.stunEnemy, null, this);

	}

	update(time, delta) {
		if (!this.wolf.winGame) {
			//update del jugador
			this.wolf.update(this.game);

			//update de los enemigos (ver si pueden atacar)
			this.game.enemyUpdate(this, this.enemies, this.wolf);

			//ver si ha pausado el juego
			this.game.updatePauseResume(this, this.level);

			//FUNCION DE CONGELAR EL SUELO DE LOS SWUB
			this.counter -= this.game.checkIfFreeze(this, this.enemies, this.wolf, this.game, this.groundLayer);

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

		//COMPRUEBA SI HA GANADO
		this.game.checkIfWin(this, this.counter, this.checkWin, this.wolf, this.enemies, this.game, this.level);

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

