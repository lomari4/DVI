//import Game from './game.js';
import Wolf from './wolf.js';
import Swub from './swub.js';
import Icedrake from './icedrake.js';

export default class Level1 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level1' });
	}
	preload() {}

	create() {
		//GENERAL//
		//añadimos el sonido
		let soundsGame = this.sound.add("gameSound");
		soundsGame.setLoop(true);
		soundsGame.play();
		//MAPA//
		//añadimos el background que tiene fullscreen de funcionalidad
		let bg = this.add.image(0, 0, "bg").setOrigin(0).setDepth(-1).setInteractive();
		bg.on('pointerup', function () {
			if (this.scale.isFullscreen)
				this.scale.stopFullscreen();
			else
				this.scale.startFullscreen();
		}, this);
		//añadimos el mapa
		let map = this.make.tilemap({
			key: 'map',
			tileWidth: 64,
			tileHeight: 64
		});
		//añadimos los tileset al map
		let tileset = map.addTilesetImage('tilemap', 'tiles', 64, 64);
		let collisionset = map.addTilesetImage('collisions', 'collision_tile', 64, 64);
		//añadimos la capa ground del mapa. Asegurarse de que el primer arg coincide con el nombre en tiled
		let groundLayer = map.createStaticLayer('ground', tileset); //sera layer dinamica en un futuro
		//añadimos capa enemyCollisions para las colisiones de enemigos en plataformas
		let enemy_collisionLayer = map.createStaticLayer('enemyCollisions', collisionset).setVisible(false);
		//añadimos colision por grupo de tiled collision editor
		groundLayer.setCollisionFromCollisionGroup()
		enemy_collisionLayer.setCollisionFromCollisionGroup()
		//boundaries del mundo
		this.physics.world.bounds.width = groundLayer.width;
		this.physics.world.bounds.height = groundLayer.height;

		//HUD de vidas
		this.hud = this.add.sprite(10, 10, "hud_full").setOrigin(0);
		this.hud.setScrollFactor(0);
		
		//JUGADOR//
		this.wolf = new Wolf(this,0,919);
		this.wolf.createAnims(); //crear las animaciones del wolf
		this.physics.add.collider(this.wolf, groundLayer);
		//para que la camara siga al jugador
		this.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height); //para que no se salga del mapa
		this.cameras.main.startFollow(this.wolf);

		//ENEMIGOS//
		//crear grupo con todos los enemigos para las fisicas
		this.enemies = this.physics.add.group();
		this.spawnSwub(1300,919);
		this.spawnIcedrake(900, 965);
		this.spawnIcedrake(900, 600);
		this.enemies.getChildren().forEach(function(item) { //necesario para crear cada enemigo con sus propiedades. Hacerlo antes de añadirlo al grupo no es correcto
			item.create();
		}, this);
		this.physics.add.collider(this.enemies, groundLayer);
		this.physics.add.collider(this.enemies, enemy_collisionLayer);
		this.physics.add.collider(this.enemies, this.enemies); 
		
	}
	
	spawnSwub(x,y){
		let temp = new Swub(this, x, y);
		temp.createAnims();
        this.enemies.add(temp);
	}

	spawnIcedrake(x,y){
		let temp = new Icedrake(this, x, y);
		temp.createAnims(); 
        this.enemies.add(temp);
	}

	hurtPlayer(player,enemy){ //no funciona bien
		//knock-back al jugador
		if(player.body.touching.left) {
			player.body.setVelocityX(10);
			player.body.setVelocityY(5);
		} else if (player.body.touching.right) {
			player.body.setVelocityX(-10);
			player.body.setVelocityY(5);
		} else if (player.body.touching.up) {
			player.body.setVelocityY(10);
		}
		player.play('hurtwolf');

		//si health is 0, muere
	}
	

	update(time, delta) {

		//update del jugador
		this.wolf.update();
		//update de los enemigos
		this.enemies.getChildren().forEach(function(item) {
			item.update();
		}, this);
	
		
		//ATAQUES Y COLISIONES CON ENEMIGOS
		//funcion overlap para colisiones con el jugador
		//this.physics.add.overlap(this.wolf, this.enemies, this.hurtPlayer, null, this); //no funciona bien
	}

}

