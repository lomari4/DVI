export default class Icedrake extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'icedrake');
	}
	create() {
		this.count = 500;
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
				//start: 19,
				start: 23,
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

	update() {

		if (this.body.touching.right || this.body.blocked.right) {
			this.body.setSize(0, 65); //ajustar el collider
			this.body.setVelocityX(-70); // turn left
		}
		else if (this.body.touching.left || this.body.blocked.left) {
			this.body.setSize(0, 65); //ajustar el collider
			this.body.setVelocityX(70); // turn right
		}

		if (!this.hurtflag) {
			this.body.setSize(0, 65); //ajustar el collider
			this.play('walkicedrake', true);
			if (this.body.velocity.x === 0)
				if (this.flipX)
					this.body.setVelocityX(70);
				else
					this.body.setVelocityX(-70);
		}
		else {
			this.body.setSize(0, 75); //ajustar el collider
			this.play('hurticedrake', false);
			this.body.setVelocityX(0);
		}

		//fliperar el sprite (por default esta a la izquierda)
		if (this.body.velocity.x > 0)
			this.setFlipX(true); //derecha
		else if (this.body.velocity.x < 0)
			this.setFlipX(false); //izquierda

	}

	checkAttack(wolf, game) {
		if (!this.hurtflag) {
			if ((this.x - wolf.x > 300 || wolf.x - this.x > 300)) //si el jugador no esta en rango
			{
				this.play('walkicedrake', true);
				if (this.flipX)
					this.body.setVelocityX(70);
				else
					this.body.setVelocityX(-70);
			}
			else {
				if (this.y == (wolf.y + 16) && ((this.x > wolf.x && !this.flipX) || (this.x < wolf.x && this.flipX))) { //esta en la misma altura y que este mirando al jugador
					//Esta animacion no va bien
					//this.body.setSize(0, 75); //ajustar el collider
					this.play('attackicedrake', true);
					//un mejor contador habria que hacer
					if (this.count > 500) {
						let beam;
						if (this.flipX)
							beam = game.spawnBeam(this.scene, this.x + 70, this.y, this);
						else
							beam = game.spawnBeam(this.scene, this.x - 70, this.y, this);
						beam.play('beamAnim', true);
						this.count = 0;
					}
					this.body.setVelocityX(0);
				}
				else {
					this.play('walkicedrake', true);
					if (this.flipX)
						this.body.setVelocityX(70);
					else
						this.body.setVelocityX(-70);
				}
			}

			this.count++;
		}
	}

	/*
	playerInRange(wolf){
		return this.x - wolf.x > 300 || wolf.x - this.x > 300;
	}
*/
}