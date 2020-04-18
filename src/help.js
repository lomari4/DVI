export default class Help extends Phaser.Scene {

    constructor() {
        super({ key: 'Help' });
        this.heightMinus = 8;
        this.widthPlus = 350;
        this.heightPlus = 240;
    }

    create() {
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);
        let menuSelect = this.sound.add("menu_select_sound",{
            volume: 0.40,
        });
        let menuHover = this.sound.add("menu_hover_sound",{
            volume: 2,
        });
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - this.heightMinus, "helpBoard").setDepth(1);
        let b = this.add.image(this.game.renderer.width / 2 + this.widthPlus, this.game.renderer.height / 2 + this.heightPlus, "menu_Button").setDepth(1).setInteractive();
        b.on("pointerup", () => {
            menuSelect.play();
            this.scene.start("Game"); //menu
        });
        b.on("pointerover", () => {
            menuHover.play();
            b.setTexture('menu_Button_hover');
        });
        b.on("pointerout", () => {
            b.setTexture('menu_Button');
        });

    }

}