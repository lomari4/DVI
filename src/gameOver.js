export default class GameOver extends Phaser.Scene {

    constructor() {
        super({ key: 'GameOver' });
    }

    init(dato) {
        //Level del argumento
        this.level = dato.level;
    }

    create() {
        this.checkLevel(); //ver que nivel ha llamado al game over

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 55, "gameOver").setDepth(1);
        let botonMenu = this.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height / 2 + 40, "menu_Button").setDepth(1).setInteractive();
        botonMenu.on("pointerup", () => {
            this.scene.stop(this.levelKey); //parar la escena del nivel
            this.scene.start("Game"); //menu
        });

        let botonLevel = this.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height / 2 + 40, "retry_Button").setDepth(1).setInteractive();
        botonLevel.on("pointerup", () => {
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