var cursors; //PREGUNTAR
class Play extends Phaser.Scene {
	constructor() {
		super('Play');
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

		//ESTO SE HARIA EN SU PROPIA CLASE APARTE
		//JUGADOR//
		this.wolf = this.physics.add.sprite(0, 0, 'wolf');
		this.wolf.setBounce(0.1);
		this.wolf.setCollideWorldBounds(true);
		this.physics.add.collider(groundLayer, this.wolf);
		//para que la camara siga al jugador
		this.cameras.main.setBounds(0, 0, bg.width, bg.height); //para que no se salga del mapa
		this.cameras.main.startFollow(this.wolf);
		//CONTROLES//
		this.cursors = this.input.keyboard.addKeys("W, A, D, SPACE");
	}

	update(time, delta) {

		/*EN CLASE WOLF APARTE
		//izquierda
		if (this.cursors.A.isDown) {
			player.body.setVelocityX(-200); // move left
			//player.anims.play('walk', true); // play walk animation
			player.flipX = false; // 
		}
		//derecha
		if (this.cursors.D.isDown) {
			player.body.setVelocityX(200); // move right
			//player.anims.play('walk', true); // play walk animatio
			player.flipX = true; // flip to right
		}
		//idle
		else {
			player.body.setVelocityX(0);
			player.anims.play('idle', true);
		}
		if (cursors.space.isDown || cursors.up.isDown && this.player.body.onFloor()) {
			this.player.setVelocityY(-350);
			//this.player.play('jump', true);
		}
		*/

	}

}


/*function cargarImagen(url) {
	return new Promise(
		resolve => {
		const imagen = new Image();
		imagen.addEventListener('load', () => resolve(imagen));
		imagen.src = url;
	}
	);
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

cargarImagen('assets/tiles/snow_middle.png').then(
imagen => {
	for (let i = 0; i < 40; i++) {
		context.drawImage(imagen, 0, 0, 32, 32 , i * 32, 608, 32, 32);
	}
}
);




cargarImagen('assets/tiles/sheetFont.png').then(
	imagen => {
		for (let i = 0; i < 40; i++) {
			for(let j = 0; j < 19; j++)
			context.drawImage(imagen, 0, 0, 32, 32 , i * 32, j * 32, 32, 32);
		}
	}
);*/