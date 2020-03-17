import Wolf from './wolf.js';
import Swub from './swub.js';
import Icedrake from './icedrake.js';

export default class Play extends Phaser.Scene {

	constructor() {
		super({ key: 'Play' });
	}
	preload() {
		//cargamos el audio
		this.load.audio("gameSound", "./assets/music/soundtrack/Snow.mp3");
		this.load.image("bg", "./assets/backgrounds/backgroundForest_extended.png");

		//cargamos el icono de fullscreen
		this.load.image('fullscreen', './assets/hud/fullscreen.png');

		//cargamos el tilemap
		this.load.image('tiles', './assets/tiles/tilemap.png');

		//cargamos el mapa de tiled en json
		this.load.tilemapTiledJSON('map', './assets/levels/nivel1.json');

		//cargamos el spritesheet del jugador
		//this.load.atlas('wolf', 'assets/mainCharacter/wolf_sprites/wolf.png', 'assets/mainCharacter/wolf_sprites/wolf.json');
		this.load.atlas('wolf', './assets/mainCharacter/wolf_sprites/wolf.png', './assets/mainCharacter/wolf_sprites/wolf.json');
		//cargamos el spritesheet de los enemigos
		this.load.atlas('swub', './assets/enemies/swub_sprites/swub.png', './assets/enemies/swub_sprites/swub.json');
		this.load.atlas('icedrake', './assets/enemies/icedrake_sprites/icedrake.png', './assets/enemies/icedrake_sprites/icedrake.json');
		//audio de wolf
		this.load.audio("wolf_attack", "./assets/music/effects/wolf_attack.wav");
		//añadimos imagen de las vidas
		this.load.image('hudfull', 'assets/hud/heart_full.png');
		this.load.image('hudempty', 'assets/hud/heart_empty.png');
	}

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
		//añadimos el tileset al map
		let tileset = map.addTilesetImage('tilemap', 'tiles', 64, 64);
		//añadimos la capa ground del mapa. Asegurarse de que el primer arg coincide con el nombre en tiled
		let groundLayer = map.createStaticLayer('ground', tileset); //sera layer dinamica en un futuro
		//añadimos colision por grupo de tiled collision editor
		groundLayer.setCollisionFromCollisionGroup()
		//boundaries del mundo
		this.physics.world.bounds.width = groundLayer.width;
		this.physics.world.bounds.height = groundLayer.height;

		//Para las vidas, habra que mejorarlo
		let i;
		for(i = 0; i < 3; ++i){
			this.hud = this.add.sprite( i * 70 + 10, 10, "hudfull").setOrigin(0).setInteractive();
			this.hud.setScrollFactor(0);
		}
		
		//JUGADOR//
		this.wolf = new Wolf(this,0,919);
		this.wolf.createAnims(); //crear las animaciones del wolf
		this.physics.add.collider(this.wolf, groundLayer);
		//para que la camara siga al jugador
		this.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height); //para que no se salga del mapa
		this.cameras.main.startFollow(this.wolf);

		//SWUB
		this.swub = new Swub(this,1000,919);
		this.swub.createAnims();
		this.physics.add.collider(this.swub, groundLayer);

		//ICEDRAKE
		this.icedrake = new Icedrake(this, 900, 965);
		this.icedrake.createAnims(); 
		this.physics.add.collider(this.icedrake, groundLayer);

		/* no funciona no se porque
		//crear grupo con todos los enemigos para las fisicas
		this.enemies = this.physics.add.group();
		this.enemies.add(this.icedrake);
		this.enemies.add(this.swub);
		*/

		//ATAQUES Y COLISIONES CON ENEMIGOS
		//funcion overlap para colisiones con el jugador
		//this.physics.add.overlap(this.wolf, this.enemies, this.hurtPlayer, null, this);
		this.physics.add.overlap(this.wolf, this.swub, this.hurtPlayer, null, this);


	}

	hurtPlayer(player,enemy){
		//knock-back al jugador
		if(player.body.touching.left) {
			player.body.setVelocityX(500);
			player.body.setVelocityY(10);
		} else if (player.body.touching.right) {
			player.body.setVelocityX(-500);
			player.body.setVelocityY(10);
		} else if (player.body.touching.up) {
			player.body.setVelocityY(10);
		}
		player.play('hurtwolf');
	}
	

	update(time, delta) {
		this.wolf.update();
		this.swub.update();
		this.icedrake.update(); 
	}

}

