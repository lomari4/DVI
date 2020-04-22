export default class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy) {
        super(scene, x, y, "beam");

        this.minX = 70;
        this.maxX = 3300;
        this.vel = 230;

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

        this.mapBoundaryLeft = -70;
        this.mapBoundaryRight = 3300;
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
            frameRate: 7,
            repeat: -1,

        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.body.setSize(80, 20);

        if (this.x < this.mapBoundaryLeft || this.x > this.mapBoundaryRight) //se va del mapa
            this.destroy();
    }
}
