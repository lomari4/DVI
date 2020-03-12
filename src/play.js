class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    preload() {
		//cargamos el audio
		this.load.audio("gameSound", "./assets/music/soundtrack/Snow.mp3");
		this.load.image("bg", "./assets/backgrounds/backgroundForest_extended.png");

		//cargamos el tilemap
		this.load.image('tiles', './assets/tiles/tilemap.png');
		//cargamos las plantas
		this.load.image('bush', './assets/environment/bush.png');
		this.load.image('bushFrozen', './assets/environment/bushFrozen.png');
		this.load.image('treePine', './assets/environment/treePine.png');
		this.load.image('treePineFrozen', './assets/environment/treePineFrozen.png');

		//cargamos el mapa de tiled en json
		this.load.tilemapTiledJSON('map', './assets/levels/nivel1.json');
		this.load.image('fullscreen', './assets/fullScreen.png');
    }

    create() {
		//añadimos el sonido
		let soundsGame = this.sound.add("gameSound");
		soundsGame.setLoop(true);
		soundsGame.play();
		
		//añadimos el background
		this.add.image(0, 0, "bg").setOrigin(0).setDepth(0);
		
		//añadimos el boton fullscreen con su funcionalidad
		let button = this.add.image(1472-80, 16, 'fullscreen', 0).setOrigin(0).setInteractive();

        button.on('pointerup', function () {
            if (this.scale.isFullscreen)
            	this.scale.stopFullscreen();
            else
            	this.scale.startFullscreen();
		}, this);

		/*NO FUNCIONA, DA EXCEPCION EN make.tilemap
		//añadimos el mapa
		let map = this.make.tilemap({ 
			key: 'map', 
			tileWidth: 64, 
			tileHeight: 64 
		  });
		//añadimos los tiles 64x64 al map
		let tileset = map.addTilesetImage('tilemap', 'tiles', 64, 64);
		//añadimos las capas del mapa. Asegurarse de que los args coinciden con los nombres de las layers en tiled
		let groundLayer = map.createStaticLayer('ground', tileset); //sera layer dinamica en un futuro
		let plantsLayer = map.createStaticLayer('plants', plantmap); //sera layer dinamica en un futuro
		//ground.setCollisionFromCollisionGroup() //colision por grupo de tiled collision editor
		*/
       
    }

    update(time, delta) {}

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