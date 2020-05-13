export default class PausedGame extends Phaser.Scene {

    constructor() {
        super({ key: 'PausedGame' });
        this.widthAdded = 150;
        this.heightAdded = 40;
        this.heighttoPauseGame = 150;
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

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - this.heighttoPauseGame, "pause").setDepth(1);
        
        this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        let font = this.add.renderTexture(0, 0, this.game.renderer.width, this.game.renderer.height);
        font.fill(0x000000, 0.5);
    }
    checkLevel() {
        switch (this.level) {
            case 1: this.levelKey = 'Level1'; break;
            case 2: this.levelKey = 'Level2'; break;
            case 3: this.levelKey = 'Level3'; break;
            case 4: this.levelKey = 'Level4'; break;
        }
    }
    update(){
        if (this.key.isDown) {
            this.scene.resume(this.levelKey);
            this.escena.music.resume();
            this.scene.stop();
        }
    }

}