class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        this.load.image("title_bg", "./assets/backgrounds/backgroundForest_extended.png");
        this.load.image("playButton", "./assets/play_button.png");

    }

    create() {

        console.log("gaifj");
        /*this.aGrid=new AlignGrid({scene:this, rows:11, cols:11});
        this.aGrid.showNumbers();*/
        this.add.image(0, 0, "title_bg").setOrigin(0);
        this.clickButton = this.add.image(100, 100, "playButton")
            .setInteractive().setOrigin(0);
    }

    update(time, delta) {}

}