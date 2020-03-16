import Wolf from './wolf.js';


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
		this.load.atlas('wolf', 'assets/mainCharacter/wolf_sprites/wolf.png', 'assets/mainCharacter/wolf_sprites/wolf.json');

		//audio de wolf
		this.load.audio("wolf_attack", "./assets/music/effects/wolf_attack.wav");
	}

	create() {
		//GENERAL//
		//añadimos el sonido
		let soundsGame = this.sound.add("gameSound");
		soundsGame.setLoop(true);
		soundsGame.play();

		//añadimos el boton fullscreen con su funcionalidad
		let button = this.add.image(1472 - 80, 16, 'fullscreen', 0).setOrigin(0).setInteractive();
		button.on('pointerup', function () {
			if (this.scale.isFullscreen)
				this.scale.stopFullscreen();
			else
				this.scale.startFullscreen();
		}, this);

		//MAPA//
		//añadimos el background
		let bg = this.add.image(0, 0, "bg").setOrigin(0).setDepth(-1);
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
		this.physics.world.bounds.width = bg.width;
		this.physics.world.bounds.height = bg.height;

		
		//JUGADOR//
		this.wolf = new Wolf(this,0,919);
		this.wolf.createAnims(); //crear las animaciones del wolf
		this.physics.add.collider(this.wolf, groundLayer);
		//para que la camara siga al jugador
		this.cameras.main.setBounds(0, 0, bg.width, bg.height); //para que no se salga del mapa
		this.cameras.main.startFollow(this.wolf);

	}
	

	update(time, delta) {

		this.wolf.update();
	}

}

