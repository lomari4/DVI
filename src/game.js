export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }
    //PRELOAD DE TODO EL JUEGO
    preload() {
        //TITLE SCREEN
        //Cargamos el audio
        this.load.audio("menuSound", "./assets/music/soundtrack/Night2.mp3");
        //Cargamos la imagen BackGround
        this.load.image("title_bg", "./assets/backgrounds/title_screen.png");
        //Cargamos el nombre del Juego
        this.load.image("logo", "./assets/logo2.0.png");
        //Cargamos el boton
        this.load.image("playButton", "./assets/play_button.png");

        //LEVELS
        //cargamos el audio
		this.load.audio("gameSound", "./assets/music/soundtrack/Snow.mp3");
		this.load.image("bg", "./assets/backgrounds/backgroundForest_extended.png");

		//cargamos el icono de fullscreen
		this.load.image('fullscreen', './assets/hud/fullscreen.png');

		//cargamos el tilemap
		this.load.image('tiles', './assets/tiles/tilemap.png');
		//cargamos imagen bloque collision
		this.load.image('collision_tile', './assets/tiles/collision.png');
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
		this.load.image('hud_full', 'assets/hud/hud1.png');
		this.load.image('hud_2left', 'assets/hud/hud2.png');
		this.load.image('hud_1left', 'assets/hud/hud3.png');
		this.load.image('hud_empty', 'assets/hud/hud4.png');
    }

    create() {
        //Añadimos las Imagenes y el sonido
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.width * 0.19, "logo").setDepth(1);
        let clickButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 250, "playButton").setDepth(1).setInteractive();

        this.sound.pauseOnBlur = false;
        let sounds = this.sound.add("menuSound");
        sounds.play();

        //Si se pulsa el botón de play
        clickButton.on("pointerup", () => {
            this.scale.startFullscreen();
            this.scene.start("Level1");
            sounds.destroy();
        })
    }

}