export default class Slash extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, "slash");
        this.delay = 0;
        this.maxDelay = 50;
        this.scene.add.existing(this);

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

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.delay === this.maxDelay) {
            this.destroy();
        }
        this.delay++;
    }
}