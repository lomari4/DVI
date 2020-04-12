export default class Icedrake extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'icedrake');
	}
	create() {
		this.coolDown = 500;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this); //enable body
		this.body.setCollideWorldBounds(true);
		this.body.setVelocityX(70);
		this.hurtflag = false;
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
				//start: 23,
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
		this.body.setSize(0, 65); //ajustar el collider
		this.play('walkicedrake', true);
		if (this.flipX)
			this.body.setVelocityX(70);
		else
			this.body.setVelocityX(-70);
	}

	update() {

		if (!this.hurtflag && this.anims.currentAnim.key !== 'attackicedrake') {
			this.walk();
		}

		if (this.body.touching.right || this.body.blocked.right) {
			this.body.setSize(0, 65); //ajustar el collider
			this.body.setVelocityX(-70); // turn left
		}
		else if (this.body.touching.left || this.body.blocked.left) {
			this.body.setSize(0, 65); //ajustar el collider
			this.body.setVelocityX(70); // turn right
		}

		if (this.hurtflag) {
			this.body.setSize(0, 83); //ajustar el collider
			this.play('hurticedrake', false);
			this.body.setVelocityX(0);
		}

		//fliperar el sprite (por default esta a la izquierda)
		if (this.body.velocity.x > 0)
			this.setFlipX(true); //derecha
		else if (this.body.velocity.x < 0)
			this.setFlipX(false); //izquierda

	}

	playerInRange(wolf) {
		return Math.abs(this.x - wolf.x) <= 500 && this.y === wolf.y + 16;
	}

	checkAttack(wolf, game) {
		if (this.playerInRange(wolf) && (this.x > wolf.x && !this.flipX || this.x < wolf.x && this.flipX)) { //jugador en rango y dragon mirandolo
			if (this.coolDown > 500) {
				this.body.setSize(0, 85); //ajustar el collider
				this.play('attackicedrake', true);
				let beam;
				if (this.flipX)
					beam = game.spawnBeam(this.scene, this.x + 70, this.y, this);
				else
					beam = game.spawnBeam(this.scene, this.x - 70, this.y, this);
				beam.play('beamAnim', true);
				this.coolDown = 0;
				this.body.setVelocityX(0);
			}
		}
		else if (this.anims.currentFrame.index === 5) {
			this.walk();
		}
		this.coolDown++;
	}

}