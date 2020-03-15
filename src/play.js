//import Wolf from './wolf.js';


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
		this.wolf = this.physics.add.sprite(0, 919, 'wolf', 'wolf_01.png').setFlipX(true);
		this.wolf.setCollideWorldBounds(true);
		this.physics.add.collider(groundLayer, this.wolf);
		//this.wolf.anchor.setTo(0.5,0.5);
		//para que la camara siga al jugador
		this.cameras.main.setBounds(0, 0, bg.width, bg.height); //para que no se salga del mapa
		this.cameras.main.startFollow(this.wolf);
		//CONTROLES//
		this.cursors = this.input.keyboard.addKeys("W, A, D, SPACE");
		
		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNames('wolf', {
			  prefix: 'wolf_',
			  suffix: '.png',
			  start: 19,
			  end: 25,
			  zeroPad: 2
			}),
			frameRate: 10,
			repeat: -1,
			
		});
		this.anims.create({
			key: 'attack',
			frames: this.anims.generateFrameNames('wolf', {
			  prefix: 'wolf_',
			  suffix: '.png',
			  start: 8,
			  end: 14,
			  zeroPad: 2
			}),
			frameRate: 8,
			repeat: -1,
			
		});
		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNames('wolf', {
			  prefix: 'wolf_',
			  suffix: '.png',
			  start: 17,
			  end: 18,
			  zeroPad: 2
			}),
			frameRate: 5,
			repeat: -1,
			
		});
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNames('wolf', {
			  prefix: 'wolf_',
			  suffix: '.png',
			  start: 1,
			  end: 7,
			  zeroPad: 2
			}),
			frameRate: 5,
			repeat: -1,
			
		});
		//this.wolf.play('run');
		
	}
	

	update(time, delta) {

		this.wolf.setSize(0,97); //ajustar el collider

		//izquierda
		if (this.cursors.A.isDown) {
			this.wolf.setVelocityX(-300);
			if(this.wolf.body.onFloor())
           		this.wolf.play('run', true); 
        }
        //derecha
        else if (this.cursors.D.isDown) {
            this.wolf.setVelocityX(300); 
			if(this.wolf.body.onFloor())
				this.wolf.play('run', true); 
		}
		//atacar
        else if (this.cursors.SPACE.isDown) {
			this.wolf.setVelocityX(0);
			if(this.wolf.body.onFloor())
           		this.wolf.play('attack', true);
		}
		else {
			this.wolf.setVelocityX(0);
			//idle
			if(this.wolf.body.onFloor())
				this.wolf.play('idle', true);
		}
		//saltar
		if(this.cursors.W.isDown && this.wolf.body.onFloor()) {
			this.wolf.setVelocityY(-415);
			this.wolf.play('jump', true);
		}
		
		//fliperar el sprite (por default esta a la izquierda)
		if (this.wolf.body.velocity.x > 0) 
			this.wolf.setFlipX(true); //derecha
		else if (this.wolf.body.velocity.x < 0) 
			this.wolf.setFlipX(false); //izquierda
		  
		//falta animacion de hurt y morir
		
		
	}

}

