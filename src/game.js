export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }
    preload() {
        //Cargamos el audio
        this.load.audio("menuSound", "./assets/music/soundtrack/Night2.mp3");
        //Cargamos la imagen BackGround
        this.load.image("title_bg", "./assets/backgrounds/title_screen.png");
        //Cargamos el nombre del Juego
        this.load.image("logo", "./assets/logo2.0.png");
        //Cargamos el boton
        this.load.image("playButton", "./assets/play_button.png");
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
            this.scene.start("Play");
            sounds.stop();
        })
    }

    update(time, delta) { }

}