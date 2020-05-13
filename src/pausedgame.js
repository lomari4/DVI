export default class PausedGame extends Phaser.Scene {

    constructor() {
        super({ key: 'PausedGame' });
        this.widthAdded = 150;
        this.heightAdded = 40;
        this.heighttoGameOver = 55;
    }

    init(dato) {
        //Level del argumento
        this.level = dato.level;
        this.escena = dato.escena;
    }

    create() {
        this.checkLevel(); //ver que nivel ha llamado al pause gmae

        let menuSelect = this.sound.add("menu_select_sound", {
            volume: 0.40,
        });
        let menuHover = this.sound.add("menu_hover_sound", {
            volume: 2,
        });

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - this.heighttoGameOver, "gameOver").setDepth(1);
        let botonPause = this.add.image(this.game.renderer.width / 2 - this.widthAdded, this.game.renderer.height / 2 + this.heightAdded, "pause").setDepth(1).setInteractive();
        botonPause.on("pointerup", () => {
            this.scene.resume(this.levelKey);
            this.escena.paused = false;
            this.escena.scale.startFullscreen();
            this.escena.music.resume();
            this.scene.stop();
        });

        let botonLevel = this.add.image(this.game.renderer.width / 2 + this.widthAdded, this.game.renderer.height / 2 + this.heightAdded, "retry_Button").setDepth(1).setInteractive();
        botonLevel.on("pointerover", () => {
            menuHover.play();
            botonLevel.setTexture('retry_Button_hover');
        });
        botonLevel.on("pointerout", () => {
            botonLevel.setTexture('retry_Button');
        });
        botonLevel.on("pointerup", () => {
            menuSelect.play();
            this.scene.start(this.levelKey);
            this.escena.scale.startFullscreen();
            this.scene.resume(this.levelKey);
            this.escena.paused = false;
        });


    }
    checkLevel() {
        switch (this.level) {
            case 1: this.levelKey = 'Level1'; break;
            case 2: this.levelKey = 'Level2'; break;
            case 3: this.levelKey = 'Level3'; break;
            case 4: this.levelKey = 'Level4'; break;
        }
    }

}