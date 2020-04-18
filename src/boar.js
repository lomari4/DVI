export default class Boar extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
		super(scene, x, y, 'boar');
        this.vel = 90;
        this.velplus = 200;
		this.difBoarandWolf = 6;
		this.distancetowolf = 580;
		this.heightsizewalk = 85;
		this.heightsizehurt = 95;
		this.hurtflag = false;
		this.stunDelay = 3000;
	}
	
	addPhysics() {
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this); //enable body
		this.body.setCollideWorldBounds(true);
	}

	createAnims() {
		this.scene.anims.create({
			key: 'walkboar',
			frames: this.scene.anims.generateFrameNames('boar', {
				prefix: 'boar_',
				suffix: '.png',
				start: 1,
				end: 6,
				zeroPad: 2
			}),
			frameRate: 6,
			repeat: -1,

		});
		this.scene.anims.create({
			key: 'hurtboar',
			frames: this.scene.anims.generateFrameNames('boar', {
				prefix: 'boar_',
				suffix: '.png',
				start: 12,
				end: 12,
				zeroPad: 2
			}),
			frameRate: 1,
			repeat: 0,

		});
	}

	walk() {
		this.body.setSize(0, this.heightsizewalk); //ajustar el collider
        this.play('walkboar', true);
		if (this.flipX)
			this.body.setVelocityX(this.vel);
		else
			this.body.setVelocityX(-this.vel);
	}

	update() {
		if (this.body.touching.right || this.body.blocked.right) {
			this.body.setVelocityX(-this.vel); // turn left
		}
		else if (this.body.touching.left || this.body.blocked.left) {
			this.body.setVelocityX(this.vel); // turn right
		}

		if (this.hurtflag) {
			this.body.setSize(0, this.heightsizehurt); //ajustar el collider
			this.play('hurtboar', false);
			this.body.setVelocityX(0);
		}

		//fliperar el sprite (por default esta a la izquierda)
		if (this.body.velocity.x > 0)
			this.setFlipX(true); //derecha
		else if (this.body.velocity.x < 0)
			this.setFlipX(false); //izquierda

	}

	playerInRange(wolf) {
        return Math.abs(this.x - wolf.x) <= this.distancetowolf && (this.y - wolf.y - this.difBoarandWolf < 1 && this.y - wolf.y - this.difBoarandWolf > -1);

	}

	checkAttack(wolf, game) {
		if (this.playerInRange(wolf) && (this.x > wolf.x && !this.flipX || this.x < wolf.x && this.flipX)) { //jugador en rango y boar mirandolo
            if (this.flipX)
                this.body.setVelocityX(this.velplus);
            else
                this.body.setVelocityX(-this.velplus);
		}
		else {
			this.walk();
		}
	}

}