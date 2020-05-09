export default class Ice extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy) {
        super(scene, x, y, "ice");
        this.w = 372;
        this.h = 41;

        this.scene.add.existing(this);

        this.coolDown = 0;
        this.coolDownMax = 90;

        this.scene.physics.add.existing(this); //enable body

        if (enemy.flipX) {
            this.setFlipX(true);
        }
        else {
            this.setFlipX(false);
        }
        this.body.allowGravity = false;
        scene.ices.add(this);

    }

    createAnims() {
        this.scene.anims.create({
            key: 'iceAnim',
            frames: this.scene.anims.generateFrameNames('ice', {
                prefix: 'ice_',
                suffix: '.png',
                start: 1,
                end: 3,
                zeroPad: 2
            }),
            frameRate: 12,
            repeat: 0,

        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.body.setSize(this.w, this.h);
        this.setOrigin(0.5,1);
        if (this.coolDown > this.coolDownMax)
            this.destroy();
        this.coolDown++;
    }
}
