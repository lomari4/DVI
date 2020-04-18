export default class GameOver extends Phaser.Scene {

    constructor() {
        super({ key: 'GameOver' });
        this.widthAdded = 150;
        this.heightAdded = 40;
        this.heighttoGameOver = 55;
    }

    init(dato) {
        //Level del argumento
        this.level = dato.level;
    }

    create() {
        this.checkLevel(); //ver que nivel ha llamado al game over
        let menuSelect = this.sound.add("menu_select_sound",{
            volume: 0.40,
        });
        let menuHover = this.sound.add("menu_hover_sound",{
            volume: 2,
        });

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - this.heighttoGameOver, "gameOver").setDepth(1);
        let botonMenu = this.add.sprite(this.game.renderer.width / 2 - this.widthAdded, this.game.renderer.height / 2 + this.heightAdded, "menu_Button").setDepth(1).setInteractive();
        botonMenu.on("pointerover", () => {
            menuHover.play();
            botonMenu.setTexture('menu_Button_hover');
        });
        botonMenu.on("pointerout", () => {
            botonMenu.setTexture('menu_Button');
        });
        botonMenu.on("pointerup", () => {
            menuSelect.play();
            this.scene.stop(this.levelKey); //parar la escena del nivel
            this.scene.start("Game"); //menu
        });

        let botonLevel = this.add.sprite(this.game.renderer.width / 2 + this.widthAdded, this.game.renderer.height / 2 + this.heightAdded, "retry_Button").setDepth(1).setInteractive();
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