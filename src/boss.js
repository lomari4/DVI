export default class Boss extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'boss');
		this.vel = 300;
		this.velFall = 200;
		this.chargeDelay = 4000;
		this.maxCharge = 900;
		this.charge = 900;
		this.health = 6;
		this.invincible = true;
		this.invincibleCounter = 3000;
		this.stunDelay = 250;
		this.distSpawnBeamX = 200;
		this.distSpawnBeamY = 80;
		this.setScale(1.5);
		this.maxcoolDown = 200;
		this.coolDown = 200;
	}

	addPhysics() {
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this); //enable body
		this.body.setCollideWorldBounds(true);
		this.body.allowGravity = false;
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
			frameRate: 6,
			repeat: 0,

		});
	}

	walk() {
		this.play('walkboss', true);
	}

	preUpdate(t, dt) {
		this.body.setSize(137, 189); //ajustar el collider
		if (!this.winGame && this.invincible) {
			super.preUpdate(t, dt);

			if (this.body.velocity.y === 0 && !this.hurtflag) {
				this.body.setVelocityY(-this.vel);
			}
			if (this.body.blocked.down) {
				this.body.setVelocityY(-this.vel);
			}
			else if (this.body.blocked.up) {
				this.body.setVelocityY(this.vel);
			}
		}
		else if (!this.winGame && this.hurtflag && this.isAlive()) {
			this.play('hurtboss', false);
			this.body.setVelocityY(0);
		}

	}

	checkAttack(wolf, game) {
		if(this.isAlive()){
			if (wolf.isAlive() && wolf.inZone) {
				if (this.charge <= 0) { //tiene que cargar
					this.body.setVelocityY(0);
					this.invincible = false;
					this.play('vulnerableboss', true);
					this.body.setVelocityY(this.velFall);
					this.coolDown = this.maxcoolDown;
					this.scene.time.addEvent({ //TO DO: CANCELAR ESTO CUANDO this.hurtFlag. Si no se puede, hay que hacerlo con un contador o algo
						delay: this.chargeDelay, //tiempo que el boss es vulnerable y esta cargando
						callback: () => {
							this.invincible = true;
							this.charge = this.maxCharge;
						},
					});

				}
				else if (this.coolDown >= this.maxcoolDown) {
					this.play('attackboss', true);
					let beam = game.spawnBeam(this.scene, this.x - this.distSpawnBeamX, this.y + this.distSpawnBeamY, this);
					beam.setScale(1.3);
					beam.play('beamAnim', true);
					this.coolDown = 0;
				}
				this.charge--;
				this.coolDown++;
			}
			else
				this.walk();
		}
		else{
			this.play('dissapearboss', true);
			if(this.anims.currentFrame.index === 9)
			{
				this.destroy();
				wolf.killedBoss = true;
			}
		}
	}

	isAlive() {
		return this.health > 0;
	}

}