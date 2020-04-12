export default class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy) {
        super(scene, x, y, "beam");

        this.minX = 70;
        this.maxX = 3300;
        this.vel = 150;

        this.scene.add.existing(this);

        this.scene.physics.add.existing(this); //enable body
        //this.body.setCollideWorldBounds(true);
        if (enemy.flipX) {
            this.body.setVelocityX(this.vel);
            this.setFlipX(true);
        }
        else {
            this.body.setVelocityX(-this.vel);
            this.setFlipX(false);
        }
        this.body.allowGravity = false;
        scene.projectiles.add(this);
    }

    createAnims() {
        this.scene.anims.create({
            key: 'beamAnim',
            frames: this.scene.anims.generateFrameNames('icedrake', {
                prefix: 'icedrake_',
                suffix: '.png',
                start: 24,
                end: 26,
                zeroPad: 2
            }),
            frameRate: 3,
            repeat: -1,

        });
    }

    update(player) {
        this.body.setSize(85, 20);
        if (this.x < -this.minX || this.x > this.maxX || player.hurtflag)
            this.destroy();
    }
}
