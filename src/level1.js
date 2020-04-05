export default class Level1 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level1' });
		this.level = 1;
	}
	preload() { }

	create() {
		//GENERAL//
		//añadimos el JUEGO (clase Game con todas las funciones que van a compartir todos los niveles)
		let game = this.scene.get('Game');
		this.counter = 0; //contador del numero de tiles que has cambiado
		this.checkWin = 0; //contador del numero de tiles totales en el mapa
		//añadimos el sonido
		this.music = this.sound.add("level1_sound");
		this.music.setLoop(true);
		this.music.play();

		//MAPA//
		this.map = game.addMap(this, this.level); //hay que pasarle el nivel como segundo arg
		this.groundLayer = game.addGround(this, this.map);
		let enemy_collisionLayer = game.addEnemyCollision(this.map);

		//Cuenta el numero de tiles que hay en el mapa
		let i , j;
		for(j = 0; j < this.map.width; ++j){
			for(i = 0; i < this.map.height; ++i){
				if (this.groundLayer.hasTileAtWorldXY(j*64, i*64)) {
					this.checkWin++;
				}
			}
		}

		//HUD de vidas
		this.hud = game.addHud(this);

		//JUGADOR//
		this.wolf = game.spawnPlayer(this, 0, 919, this.groundLayer);
		//colisiones del jugador
		this.collider = this.physics.add.collider(this.wolf, this.groundLayer);

		//CAMARA//
		game.addCamera(this, this.wolf, this.groundLayer);

		//ENEMIGOS//
		//crear grupo con todos los enemigos para las fisicas
		this.enemies = this.physics.add.group();
		//funciones de spawn de enemigos
		game.spawnSwub(this, 1300, 919, this.enemies);
		game.spawnIcedrake(this, 900, 965, this.enemies);
		game.spawnIcedrake(this, 900, 580, this.enemies);
		this.enemies.getChildren().forEach(function (item) { //necesario para crear cada enemigo con sus propiedades. Hacerlo antes de añadirlo al grupo no funciona
			item.create();
		}, this);
		//colisiones de los enemigos
		this.physics.add.collider(this.enemies, this.groundLayer);
		this.physics.add.collider(this.enemies, enemy_collisionLayer);
		this.physics.add.collider(this.enemies, this.enemies);

	}

	update(time, delta) {
		//cogemos el juego (nos lo podemos ahorrar si hacemos var global game, pero preferimos no tenerla)
		let game = this.scene.get('Game');

		//update del jugador
		this.wolf.update(game);

		//update de los enemigos
		this.enemies.getChildren().forEach(function (item) {
			item.update();
		}, this);

		//FUNCION DE DESCONGELAR EL SUELO DEL JUGADOR
		if (this.wolf.body.onFloor() && this.wolf.isAlive()) {
			//rango de descongelacion del lobo: delante,medio,atras
			this.counter += game.defrost(this.wolf.x - 64, this.wolf.y + 64, this.groundLayer);
			this.counter += game.defrost(this.wolf.x, this.wolf.y + 64, this.groundLayer);
			this.counter += game.defrost(this.wolf.x + 64, this.wolf.y + 64, this.groundLayer);
		}

		//ATAQUES Y COLISIONES CON ENEMIGOS
		//funcion overlap para colisiones con el jugador
		if (this.wolf.isAlive() && this.counter != this.checkWin)
			this.physics.add.overlap(this.wolf, this.enemies, game.knockBack, game.overlapcallback, this);

		//jugador dañado por el knockBack
		if (this.wolf.hurtflag === true) {
			game.hurtPlayer(this, this.wolf);
			game.updateHealthHud(this.wolf, this);

			if (!this.wolf.isAlive())
				game.audio_gameOver(); //audio game over cuando matan al lobo
			else
				game.audio_playerHurt();

		}

		if(this.counter == this.checkWin){
			//Esto hay que poner un cartel de victoria
			game.gameOver(this.wolf, this);
			this.time.delayedCall(3000, game.sceneGameOver, [this.level], this);
		}

		//GAME OVER
		if (!this.wolf.isAlive()) { //ha perdido
			game.gameOver(this.wolf, this);
			//delay para la escena Game over
			this.time.delayedCall(3000, game.sceneGameOver, [this.level], this);
		}

	}

}

