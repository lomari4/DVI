export default class Slash extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, "slash");
        this.scene.add.existing(this);
        this.w = 41;
        this.h = 67;

        this.scene.physics.add.existing(this); //enable body
        if (player.flipX) {
            this.setFlipX(false);
        }
        else {
            this.setFlipX(true);
        }
        this.body.allowGravity = false;
        scene.slash.add(this);
    }

    createAnims() {
        this.scene.anims.create({
            key: 'slashAnim',
            frames: this.scene.anims.generateFrameNames('slash', {
                prefix: 'slash_',
                suffix: '.png',
                start: 1,
                end: 6,
                zeroPad: 2
            }),
            frameRate: 12,
            repeat: -1,

        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.body.setSize(this.w, this.h);
        if (this.anims.currentFrame.index === 6) {
            this.destroy();
        }
    }
}