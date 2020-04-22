export default class Yeti extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'yeti');
		this.vel = 40;
		this.distancetowolf = 250;
		this.hurtflag = false;
		this.stunDelay = 3000;
		this.difYetiandWolf = 30;
		this.pivotY = 0.32;
		this.pivotX = 0.25;
		this.coolDown = 300;
		this.rangeY = 5;
		this.maxcoolDown = 300;
		this.distSpawnIce = 180;
		this.distSpawnIceY = 60;
		this.isAttacking = false;
		this.winGame = false;
	}

	addPhysics() {
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this); //enable body
		this.body.setCollideWorldBounds(true);
		this.body.syncBounds = true; //para sincronizar sprite con el collider box
	}

	createAnims() {
		this.scene.anims.create({
			key: 'walkyeti',
			frames: this.scene.anims.generateFrameNames('yeti', {
				prefix: 'yeti_',
				suffix: '.png',
				start: 4,
				end: 7,
				zeroPad: 2
			}),
			frameRate: 2,
			repeat: -1,

		});
		this.scene.anims.create({
			key: 'attackyeti',
			frames: this.scene.anims.generateFrameNames('yeti', {
				prefix: 'yeti_',
				suffix: '.png',
				start: 8,
				end: 16,
				zeroPad: 2
			}),
			frameRate: 7,
			repeat: -1,

		});
		this.scene.anims.create({
			key: 'hurtyeti',
			frames: this.scene.anims.generateFrameNames('yeti', {
				prefix: 'yeti_',
				suffix: '.png',
				start: 17,
				end: 17,
				zeroPad: 2
			}),
			frameRate: 1,
			repeat: 0,

		});
	}

	walk() {
		this.play('walkyeti', true);
		if (this.flipX) {
			this.setOrigin(0.5, this.pivotY);
			this.body.setVelocityX(this.vel);
		}
		else {
			this.setOrigin(this.pivotX, this.pivotY);
			this.body.setVelocityX(-this.vel);
		}
	}

	preUpdate(t, dt) {
		if (!this.winGame) {
			super.preUpdate(t, dt);

			if (!this.hurtflag && this.anims.currentAnim.key != 'attackyeti') {
				this.walk();
			}
			if (this.body.touching.right || this.body.blocked.right) {
				this.body.setVelocityX(-this.vel); // turn left
			}
			else if (this.body.touching.left || this.body.blocked.left) {
				this.body.setVelocityX(this.vel); // turn right
			}

			if (this.hurtflag) {
				this.play('hurtyeti', false);
				this.body.setVelocityX(0);
				if (this.flipX)
					this.setOrigin(0.5, this.pivotY);
				else
					this.setOrigin(this.pivotX, this.pivotY);
			}

			//fliperar el sprite (por default esta a la izquierda)
			if (this.body.velocity.x > 0)
				this.setFlipX(true); //derecha
			else if (this.body.velocity.x < 0)
				this.setFlipX(false); //izquierda

		}

	}

	playerInRange(wolf) {
		return Math.abs(this.x - wolf.x) <= this.distancetowolf && (this.y - wolf.y + this.difYetiandWolf < this.rangeY && this.y - wolf.y + this.difYetiandWolf > -this.rangeY);
	}

	checkAttack(wolf, game) {
		if (wolf.isAlive()) {
			if (this.playerInRange(wolf) && (this.x > wolf.x && !this.flipX || this.x < wolf.x && this.flipX)) { //jugador en rango y yeti mirandolo
				if (this.coolDown > this.maxcoolDown) {
					this.play('attackyeti', true);
					this.body.setVelocityX(0);
					this.coolDown = 0;
					this.isAttacking = true;
				}
			}
			else if (this.anims.currentFrame.index === 8)
				this.walk();

			if (this.anims.currentFrame.index === 5 && this.isAttacking) //animacion de slam
			{
				this.isAttacking = false;
				let ice;
				if (this.flipX) {
					ice = game.spawnIce(this.scene, this.x + this.distSpawnIce, this.y + this.distSpawnIceY, this);
				}
				else {
					ice = game.spawnIce(this.scene, this.x - this.distSpawnIce, this.y + this.distSpawnIceY, this);
				}
			}
			this.coolDown++;
		}
	}

}