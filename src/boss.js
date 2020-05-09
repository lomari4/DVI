export default class Boss extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'boss');
		this.vel = 300;
		this.velFall = 200;
		this.chargeDelay = 4000;
		this.maxCharge = 900;
		this.charge = 900;
		this.health = 6;
		this.winGame = false;
		this.invincible = true;
		this.hurtFlag = false;
		this.invincibleCounter = 3000;
		this.distSpawnBeamX = 100;
		this.distSpawnBeamY = 100;
		this.setScale(2);
		this.maxcoolDown = 100;
		this.coolDown = 100;
		this.dieSound = false;
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
			frameRate: 5,
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
		if (!this.winGame) {
			super.preUpdate(t, dt);

			if (this.invincible && !this.hurtFlag) {
				this.body.setSize(137, 179); //ajustar el collider
				if (this.body.velocity.y === 0) {
					this.body.setVelocityY(-this.vel);
				}
				if (this.body.blocked.down) {
					this.body.setVelocityY(-this.vel);
				}
				else if (this.body.blocked.up) {
					this.body.setVelocityY(this.vel);
				}
			}
			else if (this.hurtFlag && this.isAlive()) {
				this.body.setSize(137, 190); //ajustar el collider
				this.play('hurtboss', false);
				this.body.setVelocityY(0);
			}
		}

	}

	checkAttack(wolf, game) {
		if (this.isAlive()) {
			if (wolf.isAlive() && wolf.inZone) {
				if (this.charge <= 0 && !this.hurtFlag) { //tiene que cargar
					this.body.setSize(137, 150); //ajustar el collider
					this.body.setVelocityY(0);
					this.invincible = false;
					this.play('vulnerableboss', true);
					this.body.setVelocityY(this.velFall);
					this.coolDown = this.maxcoolDown;
					this.scene.time.addEvent({
						delay: this.chargeDelay, //tiempo que el boss es vulnerable y esta cargando
						callback: () => {
							this.invincible = true;
							this.hurtFlag = false;
							this.charge = this.maxCharge;
						},
					});

				}
				else if (this.coolDown >= this.maxcoolDown && !this.hurtFlag) {
					this.play('attackboss', true);
					let beam = game.spawnBeam(this.scene, this.x - this.distSpawnBeamX, this.y + this.distSpawnBeamY, this);
					game.audio_bossBeam();
					beam.setScale(1.2);
					beam.play('beamAnim', true);
					this.coolDown = 0;
				}

				//cada vez que le quita una vida el jugador, el boss dispara mas rapido
				switch (this.health) {
					case 1: this.maxcoolDown = 120; this.vel = 410; break;
					case 2: this.maxcoolDown = 130; this.vel = 380; break;
					case 3: this.maxcoolDown = 140; this.vel = 350; break;
					case 4: this.maxcoolDown = 160; this.vel = 340; break;
					case 5: this.maxcoolDown = 180; this.vel = 320; break;
				}
				this.charge--;
				this.coolDown++;
			}
			else
				this.walk();
		}
		else {
			this.body.setVelocityY(-60);
			this.play('dissapearboss', true);
			if (!this.dieSound) {
				game.audio_bossDie();
				this.dieSound = true;
			}
			if (this.anims.currentFrame.index === 9) {
				this.destroy();
				wolf.killedBoss = true;
			}
		}
	}

	isAlive() {
		return this.health > 0;
	}

}