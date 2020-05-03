export default class Boss extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'boss');
		this.vel = 100;
		this.velFall = 200;
		this.chargeDelay = 4000;
		this.maxCharge = 900;
		this.charge = 900;
		this.health = 5;
		this.invincible = true;
		this.setScale(2);
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
			frameRate: 7,
			repeat: -1,

		});
		this.scene.anims.create({
			key: 'attackboss',
			frames: this.scene.anims.generateFrameNames('boss', {
				prefix: 'boss_',
				suffix: '.png',
				start: 8,
				end: 13,
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
			key: 'vulnerableboss',
			frames: this.scene.anims.generateFrameNames('boss', {
				prefix: 'boss_',
				suffix: '.png',
				start: 24,
				end: 24,
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
				start: 15,
				end: 23,
				zeroPad: 2
			}),
			frameRate: 1,
			repeat: 0,

		});
	}

	walk() {
		this.play('walkboss', true);
	}

	preUpdate(t, dt) {
		if (!this.winGame && this.invincible) {
			super.preUpdate(t, dt);

			if (this.hurtflag) {
				this.play('hurtboss', false);
				this.isAttacking = false;
				this.body.setVelocityY(0);
			}
			else if (this.body.velocity.y === 0 && !this.hurtflag) {
				this.body.setVelocityY(-this.vel);
			}
			if (this.body.blocked.down) {
				this.body.setVelocityY(-this.vel);
			}
			else if (this.body.blocked.up) {
				this.body.setVelocityY(this.vel);
			}
		}

	}

	checkAttack(wolf, game) {
		if (wolf.isAlive() && wolf.inZone) {
			if (this.charge <= 0) { //tiene que cargar
				this.body.setVelocityY(0);
				this.invincible = false;
				this.play('vulnerableboss', true);
				this.body.setVelocityY(this.velFall);
				this.scene.time.addEvent({
					delay: this.chargeDelay, //tiempo que el boss es vulnerable y esta cargando
					callback: () => {
						this.invincible = true;
						this.charge = this.maxCharge;
					},
				});
			}
			else
				this.play('attackboss', true);

			this.charge--;
		}
		else
			this.walk();
	}

	isAlive() {
		return this.health > 0;
	}

}