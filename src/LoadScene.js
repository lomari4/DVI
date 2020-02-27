class LoadScene extends Phaser.Scene {
    constructor() {
        super('LoadScene');
    }
    preload() {
        this.load.image("title_bg", "./assets/backgrounds/backgroundForest_extended.png");
        this.load.image("playButton", "./assets/play_button.png");

    }

    create() {
        this.add.image(0, 0, "title_bg").setOrigin(0);
        this.add.image(100, 100, "playButton").setOrigin(0);
    }

    update(time, delta) {}
}