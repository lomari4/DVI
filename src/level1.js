export default class Level1 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level1' });
	}
	preload() { }

	//RECORDAR INDENTAR CON ALT+SHIFT+F
	create() {
		//GENERAL//
		//añadimos el JUEGO (clase Game con todas las funciones que van a compartir todos los niveles)
		let game = this.scene.get('Game');

		//añadimos el sonido
		this.music = this.sound.add("level1_sound");
		this.music.setLoop(true);
		this.music.play();

		//MAPA//
		let map = game.addMap(this, 1); //hay que pasarle el nivel como segundo arg
		let groundLayer = game.addGround(this, map);
		let enemy_collisionLayer = game.addEnemyCollision(map)

		//HUD de vidas
		this.hud = game.addHud(this);

		//JUGADOR//
		this.wolf = game.spawnPlayer(this, 0, 919, groundLayer);
		//colisiones del jugador
		this.collider = this.physics.add.collider(this.wolf, groundLayer);
		
		//CAMARA//
		game.addCamera(this, this.wolf, groundLayer);

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
		this.physics.add.collider(this.enemies, groundLayer);
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

		//ATAQUES Y COLISIONES CON ENEMIGOS
		//funcion overlap para colisiones con el jugador
		this.physics.add.overlap(this.wolf, this.enemies, game.hurtPlayer, null, this);

		//jugador dañado
		if (this.wolf.hurtflag === true) {
			//jugador invencible por tiempo
			this.time.addEvent({
				delay: 1000,
				callback: ()=>{
					this.wolf.invincible=false;
				},
			});
			this.wolf.health -= 1;
			this.wolf.hurtflag = false;
			if (this.wolf.health <= 0)
				game.audio_gameOver();

			game.audio_playerHurt();
			game.updateHealthHud(this.wolf, this);
		}

		if (this.wolf.health <= 0) { //ha perdido. Al pulsar enter se resetea el juego
			//this.scene.restart();
			this.wolf.alive = false;

			game.gameOver(this.wolf,this,this.enemies);
			//delay para la escena Game over
			this.time.addEvent({ delay: 4500, callback: game.sceneGameOver, callbackScope: this, loop: false });
		}
		
	}

}

