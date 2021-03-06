export default class Swub extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'swub');
        this.vel = 40;
        this.heightsizewalk = 53;
        this.heightsizehurt = 69;
        this.hurtflag = false;
        this.stunDelay = 4500;
        this.winGame = false;
    }

    addPhysics() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body
        this.body.setCollideWorldBounds(true);
    }

    createAnims() {
        this.scene.anims.create({
            key: 'walkswub',
            frames: this.scene.anims.generateFrameNames('swub', {
                prefix: 'swub_',
                suffix: '.png',
                start: 1,
                end: 6,
                zeroPad: 2
            }),
            frameRate: 6,
            repeat: -1,

        });
        this.scene.anims.create({
            key: 'hurtswub',
            frames: this.scene.anims.generateFrameNames('swub', {
                prefix: 'swub_',
                suffix: '.png',
                start: 7,
                end: 7,
                zeroPad: 2
            }),
            frameRate: 1,
            repeat: -1,

        });

    }

    walk() {
        this.body.setSize(0, this.heightsizewalk); //ajustar el collider
        this.play('walkswub', true);
        if (this.flipX)
            this.body.setVelocityX(this.vel);
        else
            this.body.setVelocityX(-this.vel);
    }

    preUpdate(t, dt) {
        if (!this.winGame) {
            super.preUpdate(t, dt);

            if (!this.hurtflag) {
                this.walk();
            }

            if (this.body.touching.right || this.body.blocked.right) {
                this.body.setVelocityX(-this.vel); // turn left
            }
            else if (this.body.touching.left || this.body.blocked.left) {
                this.body.setVelocityX(this.vel); // turn right
            }

            if (this.hurtflag) {
                this.body.setSize(0, this.heightsizehurt); //ajustar el collider
                this.play('hurtswub', false);
                this.body.setVelocityX(0);
            }

            //fliperar el sprite (por default esta a la izquierda)
            if (this.body.velocity.x > 0)
                this.setFlipX(true); //derecha
            else if (this.body.velocity.x < 0)
                this.setFlipX(false); //izquierda
        }
    }

    checkAttack(wolf, game) { }
}