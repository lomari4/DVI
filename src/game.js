class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        this.load.image("title_bg", "./assets/winterBackground.jpg");
        this.load.image("logo", "./assets/logo.png");
        this.load.image("playButton", "./assets/play_button.png");

    }

    create() {

        console.log("gaifj");
        /*this.aGrid=new AlignGrid({scene:this, rows:11, cols:11});
        this.aGrid.showNumbers();*/
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.width * 0.2, "logo").setDepth(1);

        let clickButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "playButton").setDepth(1).setInteractive();

        clickButton.on("pointerover", () => {
            console.log("ASDAS");
        })

        clickButton.on("pointerup", () => {
            this.scene.start("Play");
        })

        clickButton.on("pointerout", () => {
            console.log("dasdaasdas");
        })
    }

    update(time, delta) {}

}