
export default class Wolf extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'wolf');
        this.setFlipX(true);
        this.scene.add.existing(this);
        this.health = 3; //vidas del lobo
        this.scene.physics.add.existing(this); //enable body
        this.body.setCollideWorldBounds(true);
        this.winGame = false;
        this.loseGame = false;
        this.hurtflag = false;
        this.cursors = this.scene.input.keyboard.addKeys('W, A, D, SPACE');
        this.invincible = false;
        this.slashHeight = 25;
        this.slashWidth = 135;
        this.vel = 300;
        this.jumpvel = -420;
        this.heightsize = 100;
        this.heightsizedead = 52;
        this.knockBackUP = 300;
        this.knockBackSIDE = 200;
        this.beamHit = false;
        this.invincibleCounter = 1200;
        this.killedBoss = false;
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
            frameRate: 2,
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
            frameRate: 1,
        });
    }

    preUpdate(t, dt) {
        if (this.isAlive()) {
            super.preUpdate(t, dt);
            this.body.setSize(0, this.heightsize); //ajustar el collider
        }
    }

    attackAnimDone(){
        if (this.anims.currentAnim.key == 'attackwolf')
        {
            if(this.anims.currentFrame.index === 7)
                return true;
            else
                return false;
        }
        return true;
    }

    update(game) {
        //izquierda
        if (this.cursors.A.isDown && (!this.anims.isPlaying || (this.body.onFloor() && this.anims.isPlaying && this.anims.currentAnim.key !== 'hurtwolf' && this.attackAnimDone())) && this.isAlive() && !this.winGame) {
            this.body.setVelocityX(-this.vel);
            if (this.body.onFloor()) {
                this.play('runwolf', true);
            }
        }
        //derecha
        else if (this.cursors.D.isDown && (!this.anims.isPlaying || (this.body.onFloor() && this.anims.isPlaying && this.anims.currentAnim.key !== 'hurtwolf' && this.attackAnimDone())) && this.isAlive() && !this.winGame) {
            this.body.setVelocityX(this.vel);
            if (this.body.onFloor()) {
                this.play('runwolf', true);
            }
        }
        //idle
        else if (this.cursors.A.isUp && this.cursors.D.isUp && (!this.anims.isPlaying || (this.anims.isPlaying && this.anims.currentAnim.key === 'runwolf'))) {
            this.body.setVelocityX(0);
            if (this.body.onFloor())
                this.play('idlewolf', true);
        }

        //atacar. No se puede spamear
        if (Phaser.Input.Keyboard.JustDown(this.cursors.SPACE) && this.body.onFloor() && this.isAlive() && !this.winGame && (this.anims.currentAnim.key === 'runwolf' || this.anims.currentAnim.key === 'idlewolf')) {
            this.body.setVelocityX(0);
            this.play('attackwolf', false);
            let slash;
            if (this.flipX)
                slash = game.spawnSlash(this.scene, this.x + this.slashWidth, this.y + this.slashHeight, this);
            else
                slash = game.spawnSlash(this.scene, this.x - this.slashWidth, this.y + this.slashHeight, this);

            slash.play('slashAnim', true);
            game.audio_playerAttack();
        }
        
        //saltar
        if (this.cursors.W.isDown && this.body.onFloor() && this.isAlive() && !this.winGame && this.attackAnimDone()) {
            this.body.setVelocityY(this.jumpvel);
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
    isAlive() {
        return this.health > 0;
    }
}