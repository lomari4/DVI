export default class Yeti extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'yeti');
        this.vel = 60;
		this.distancetowolf = 250;
		this.heightsizewalk = 115;
        this.heightsizehurt = 100;
		this.hurtflag = false;
		this.stunDelay = 3000;
		this.pivotY = 0.32;
		this.pivotX = 0.25;
	}
	
	addPhysics() {
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this); //enable body
		this.body.setCollideWorldBounds(true);
		this.body.syncBounds = true;
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
			frameRate: 3,
			repeat: 0,

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
		this.body.setSize(0, this.heightsizewalk); //ajustar el collider
        this.play('walkyeti', true);
		if (this.flipX)
		{
			this.setOrigin(0.5,this.pivotY);
			this.body.setVelocityX(this.vel);
		}
		else
		{
			this.setOrigin(this.pivotX,this.pivotY);
			this.body.setVelocityX(-this.vel);
		}
	}

	update() {

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
			this.body.setSize(0, this.heightsizehurt); //ajustar el collider
			this.play('hurtyeti', false);
			this.body.setVelocityX(0);
		}

		//fliperar el sprite (por default esta a la izquierda)
		if (this.body.velocity.x > 0)
			this.setFlipX(true); //derecha
		else if (this.body.velocity.x < 0)
			this.setFlipX(false); //izquierda

	}

	playerInRange(wolf) {
        return Math.abs(this.x - wolf.x) <= this.distancetowolf && (this.y - wolf.y < 1 && this.y - wolf.y > -1);
	}

	checkAttack(wolf, game) {
		if (this.playerInRange(wolf) && (this.x > wolf.x && !this.flipX || this.x < wolf.x && this.flipX)) { //jugador en rango y yeti mirandolo
            this.play('attackyeti', false);
            this.body.setVelocityX(0);
		}
		else if (this.anims.currentFrame.index === 9)
			this.walk();
	}

}