export default class GameOver extends Phaser.Scene {

    constructor() {
		super({ key: 'GameOver' });
    }

    init(dato){
        //Level del argumento
        this.level = dato.level;
    }

    preload() {
        this.load.image("menuButton", "./assets/menuButton.png");
        this.load.image("retryButton", "./assets/retryButton.png");
        this.load.image("bg", "./assets/backgrounds/title_screen.png");
        this.load.image("gameOver", "./assets/game_over.png");
    }

    create() {
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 200, "gameOver").setDepth(1);
        let botonMenu = this.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height / 2 + 250, "menuButton").setDepth(1).setInteractive();
        botonMenu.on("pointerup", () => {
            this.scene.start("Game");
        });

        let botonLevel = this.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height / 2 + 250, "retryButton").setDepth(1).setInteractive();
        botonLevel.on("pointerup", () => {
            switch (this.level){
                case 1: this.scene.start('Level1'); break;
                case 2: break;
                default: this.scene.start("Level1"); break;
            }
        });

    }
    
}