export default class Boss extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'boss');
        this.vel = 100;
		this.distancetowolf = 1500;
        this.isAttacking = false;
        this.difBossandWolf = 30; 
        this.stunDelay = 500;     
        this.countUp = 50;  
        this.countDown = 800;  
		this.health = 5;
	}

	addPhysics() {
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this); //enable body
		this.body.setCollideWorldBounds(true);
		this.body.allowGravity = false;
        this.body.syncBounds = true; //para sincronizar sprite con el collider box

	}

	createAnims() {
		this.scene.anims.create({
			key: 'walkboss',
			frames: this.scene.anims.generateFrameNames('boss', {
				prefix: 'boss_',
				suffix: '.png',
				start: 1,
				end: 6,
				zeroPad: 2
			}),
			frameRate: 2,
			repeat: -1,

		});
		this.scene.anims.create({
			key: 'attackboss',
			frames: this.scene.anims.generateFrameNames('boss', {
				prefix: 'boss_',
				suffix: '.png',
				start: 8,
				end: 15,
				zeroPad: 2
			}),
			frameRate: 10,
			repeat: -1,

		});
		this.scene.anims.create({
			key: 'hurtboss',
			frames: this.scene.anims.generateFrameNames('boss', {
				prefix: 'boss_',
				suffix: '.png',
				start: 7,
				end: 7,
				zeroPad: 2
			}),
			frameRate: 1,
			repeat: 0,

        });
        this.scene.anims.create({
			key: 'dissapearboss',
			frames: this.scene.anims.generateFrameNames('boss', {
				prefix: 'boss_',
				suffix: '.png',
				start: 16,
				end: 23,
				zeroPad: 2
			}),
			frameRate: 1,
			repeat: 0,

		});
	}

	walk() {
		this.play('walkboss', true);
		if (this.body.y < this.countUp) {
			this.body.setVelocityY(this.vel);
		}
		else if(this.body.y > this.countDown){
			this.body.setVelocityY(-this.vel);
        }
	}

	preUpdate(t, dt) {
		if (!this.winGame) {
			super.preUpdate(t, dt);

			if (this.hurtflag) {
				this.play('hurtboss', false);
				this.isAttacking = false;
				this.body.setVelocityY(0);
			}
			else if(this.body.velocity.y === 0 && !this.hurtflag) {
				this.body.setVelocityY(-this.vel);
			}
			else {
				this.walk();
			}

		}

	}

	playerInRange(wolf) {
		return Math.abs(this.x - wolf.x) <= this.distancetowolf && (this.y - wolf.y + this.difBossandWolf < this.rangeY && this.y - wolf.y + this.difBossandWolf > -this.rangeY);
	}

	checkAttack(wolf, game) {
		if (wolf.isAlive() && this.playerInRange(wolf)) { //jugador en rango
			if (this.coolDown > this.maxcoolDown) {
				this.play('attackboss', true);
				this.coolDown = 0;
				this.isAttacking = true;
			}
		}
		else if (this.anims.currentFrame.index === 8)
			this.walk();

		if (this.anims.currentFrame.index === 5 && this.isAttacking) //animacion de slam
		{
			this.isAttacking = false;
		}
		this.coolDown++;
	}
	isAlive() {
        return this.health > 0;
    }

}