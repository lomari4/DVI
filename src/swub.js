export default class Swub extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'swub');
        this.vel = 40;
        this.noVelocity = 0;
        this.heightsizewalk = 53;
        this.heightsizehurt = 69;
        this.widthsize = 0;
    }
    create() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body
        this.body.setCollideWorldBounds(true);
        this.body.setVelocityX(-this.vel);
        this.hurtflag = false;

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

    update() {

        if (this.body.touching.right || this.body.blocked.right) {
            this.body.setVelocityX(-this.vel); // turn left
        }
        else if (this.body.touching.left || this.body.blocked.left) {
            this.body.setVelocityX(this.vel); // turn right
        }
        if(!this.hurtflag){
            this.body.setSize(this.widthsize, this.heightsizewalk); //ajustar el collider
            this.play('walkswub', true);
            if(this.body.velocity.x === this.noVelocity)
                if(this.flipX)
                    this.body.setVelocityX(this.vel);
                else
                    this.body.setVelocityX(-this.vel);
        }
        else{
            this.body.setSize(this.widthsize, this.heightsizehurt); //ajustar el collider
            this.play('hurtswub', false);
            this.body.setVelocityX(this.noVelocity);
        }

        //fliperar el sprite (por default esta a la izquierda)
        if (this.body.velocity.x > this.noVelocity)
            this.setFlipX(true); //derecha
        else if (this.body.velocity.x < this.noVelocity)
            this.setFlipX(false); //izquierda
    }

    checkAttack(wolf, game){}
}