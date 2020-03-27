
export default class Wolf extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'wolf');
        this.setFlipX(true);
        this.scene.add.existing(this);
        this.health = 3;
        this.scene.physics.add.existing(this); //enable body
        this.body.setCollideWorldBounds(true);
        this.hurtflag = false;
        this.cursors = this.scene.input.keyboard.addKeys('W, A, D, SPACE');
    }

    createAnims() {
        this.scene.anims.create({
            key: 'runwolf',
            frames: this.scene.anims.generateFrameNames('wolf', {
                prefix: 'wolf_',
                suffix: '.png',
                start: 19,
                end: 25,
                zeroPad: 2
            }),
            frameRate: 10,

        });
        this.animA = this.scene.anims.create({
            key: 'attackwolf',
            frames: this.scene.anims.generateFrameNames('wolf', {
                prefix: 'wolf_',
                suffix: '.png',
                start: 8,
                end: 14,
                zeroPad: 2
            }),
            frameRate: 14,

        });
        this.scene.anims.create({
            key: 'jumpwolf',
            frames: this.scene.anims.generateFrameNames('wolf', {
                prefix: 'wolf_',
                suffix: '.png',
                start: 17,
                end: 18,
                zeroPad: 2
            }),
            frameRate: 6,
           

        });
        this.scene.anims.create({
            key: 'idlewolf',
            frames: this.scene.anims.generateFrameNames('wolf', {
                prefix: 'wolf_',
                suffix: '.png',
                start: 1,
                end: 7,
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: -1,

        });
        this.scene.anims.create({
            key: 'hurtwolf',
            frames: this.scene.anims.generateFrameNames('wolf', {
                prefix: 'wolf_',
                suffix: '.png',
                start: 15,
                end: 15,
                zeroPad: 2
            }),
            frameRate: 1.5,
        });
        this.scene.anims.create({
            key: 'deadwolf',
            frames: this.scene.anims.generateFrameNames('wolf', {
                prefix: 'wolf_',
                suffix: '.png',
                start: 16,
                end: 16,
                zeroPad: 2
            }),
            frameRate: 1.5,
        });
    }

    update(game) {

        this.body.setSize(0, 97); //ajustar el collider
        //this.setOrigin(0.5,0.5);

        //izquierda
        if (this.cursors.A.isDown && (!this.anims.isPlaying || (this.body.onFloor() && this.anims.isPlaying && this.anims.currentAnim.key !== 'hurtwolf'))) {
            this.body.setVelocityX(-300);
            if (this.body.onFloor()) {
                this.play('runwolf', true);
            }
        }
        //derecha
        else if (this.cursors.D.isDown && (!this.anims.isPlaying || (this.body.onFloor() && this.anims.isPlaying && this.anims.currentAnim.key !== 'hurtwolf'))) {
            this.body.setVelocityX(300);
            if (this.body.onFloor()) {
                this.play('runwolf', true);
            }
        }
        //atacar. No se puede spamear
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.SPACE) && this.body.onFloor()) {
            this.body.setVelocityX(0);
            this.play('attackwolf', false);
            game.audio_playerAttack();
        }
        else if (this.cursors.A.isUp && this.cursors.D.isUp && this.cursors.W.isUp && (!this.anims.isPlaying || (this.anims.isPlaying && this.anims.currentAnim.key === 'runwolf'))){
            this.body.setVelocityX(0);
            //idle
            if (this.body.onFloor())
                this.play('idlewolf', true);
            /* a veces el sprite no toca el suelo cuando corre, por lo que no añadimos la animacion de caida
            else
                this.play('jump', true);
            */
        }
        //saltar
        if (this.cursors.W.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-420);
            this.play('jumpwolf', true);
            if (this.body.onFloor())
                game.audio_playerJump();
        }

        //fliperar el sprite (por default esta a la izquierda)
        if (this.body.velocity.x > 0)
            this.setFlipX(true); //derecha
        else if (this.body.velocity.x < 0)
            this.setFlipX(false); //izquierda

    }
}