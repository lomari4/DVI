export default class Icedrake extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'icedrake');
		this.coolDown = 500;
		this.maxcoolDown = 500;
		this.vel = 70;
		this.difDrakeandWolf = 16;
		this.distancetowolf = 600;
		this.heightsizewalk = 70;
		this.heightsizeattack = 83;
		this.heightsizehurt = 84;
		this.distSpawnBeam = 70;
		this.hurtflag = false;
		this.rangeY = 2;
		this.stunDelay = 3000;
		this.isAttacking = false;
		this.winGame = false;
	}

	addPhysics() {
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this); //enable body
		this.body.setCollideWorldBounds(true);
	}

	createAnims() {
		this.scene.anims.create({
			key: 'walkicedrake',
			frames: this.scene.anims.generateFrameNames('icedrake', {
				prefix: 'icedrake_',
				suffix: '.png',
				start: 4,
				end: 7,
				zeroPad: 2
			}),
			frameRate: 4,
			repeat: 0,

		});
		this.animAttack = this.scene.anims.create({
			key: 'attackicedrake',
			frames: this.scene.anims.generateFrameNames('icedrake', {
				prefix: 'icedrake_',
				suffix: '.png',
				start: 19,
				end: 23,
				zeroPad: 2
			}),
			frameRate: 8,
			repeat: 0,

		});
		this.scene.anims.create({
			key: 'hurticedrake',
			frames: this.scene.anims.generateFrameNames('icedrake', {
				prefix: 'icedrake_',
				suffix: '.png',
				start: 8,
				end: 8,
				zeroPad: 2
			}),
			frameRate: 1,
			repeat: 0,

		});
	}

	walk() {
		this.body.setSize(0, this.heightsizewalk); //ajustar el collider
		this.play('walkicedrake', true);
		if (this.flipX)
			this.body.setVelocityX(this.vel);
		else
			this.body.setVelocityX(-this.vel);
	}

	preUpdate(t, dt) {
		if (!this.winGame) {
			super.preUpdate(t, dt);

			if (!this.hurtflag && this.anims.currentAnim.key != 'attackicedrake') {
				this.walk();
			}

			if (this.body.touching.right || this.body.blocked.right) {
				this.body.setVelocityX(-this.vel); // turn left
			}
			else if (this.body.touching.left || this.body.blocked.left) {
				this.body.setVelocityX(this.vel); // turn right
			}

			if (this.hurtflag) {
				this.body.setSize(0, this.heightsizehurt);
				this.play('hurticedrake', false);
				this.body.setVelocityX(0);
				this.coolDown = this.maxcoolDown;
			}
			if (this.isAttacking) {
				this.body.setSize(0, this.heightsizeattack);
			}

			//fliperar el sprite (por default esta a la izquierda)
			if (this.body.velocity.x > 0)
				this.setFlipX(true); //derecha
			else if (this.body.velocity.x < 0)
				this.setFlipX(false); //izquierda
		}
	}

	playerInRange(wolf) {
		return Math.abs(this.x - wolf.x) <= this.distancetowolf && (this.y - wolf.y - this.difDrakeandWolf < this.rangeY && this.y - wolf.y - this.difDrakeandWolf > -this.rangeY);
	}

	checkAttack(wolf, game) {
		if (wolf.isAlive() && this.playerInRange(wolf) && (this.x > wolf.x && !this.flipX || this.x < wolf.x && this.flipX)) { //jugador en rango y dragon mirandolo
			if (this.coolDown > this.maxcoolDown) {
				this.isAttacking = true;
				this.play('attackicedrake', true);
				let beam;
				if (this.flipX)
					beam = game.spawnBeam(this.scene, this.x + this.distSpawnBeam, this.y, this);
				else
					beam = game.spawnBeam(this.scene, this.x - this.distSpawnBeam, this.y, this);
				beam.play('beamAnim', true);
				game.audio_dragonbreath();
				this.coolDown = 0;
				this.body.setVelocityX(0);
			}
		}
		if (this.anims.currentFrame.index === 5 && this.isAttacking) {
			this.isAttacking = false;
			this.walk();
		}
		this.coolDown++;
	}
}