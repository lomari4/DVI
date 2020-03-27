export default class GameOver extends Phaser.Scene {

    constructor() {
		super({ key: 'GameOver' });
    }

    preload() {
        this.load.image("playButton", "./assets/play_button.png");

        this.load.image("gameOver", "./assets/game_over.png");
    }

    create() {
    
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 200, "gameOver").setDepth(1);
        let botonMenu = this.add.image(this.game.renderer.width / 2 - 150, this.game.renderer.height / 2 + 250, "playButton").setDepth(1).setInteractive();
        botonMenu.on("pointerup", () => {
            this.scene.start("Game");
        });

        let botonLevel = this.add.image(this.game.renderer.width / 2 + 150, this.game.renderer.height / 2 + 250, "playButton").setDepth(1).setInteractive();
        botonLevel.on("pointerup", () => {
            this.scale.startFullscreen();
            this.scene.start('Level1');
        });


    }
    
}