export default class Help extends Phaser.Scene {

    constructor() {
        super({ key: 'Help' });
    }

    create() {
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 8, "helpBoard").setDepth(1);
        let b = this.add.image(this.game.renderer.width / 2 + 350, this.game.renderer.height / 2 + 240, "menu_Button").setDepth(1).setInteractive();
        b.on("pointerup", () => {
            this.scene.start("Game"); //menu
        });
        
    }

}