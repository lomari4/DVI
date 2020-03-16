
export default class Wolf extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'wolf');
        this.setFlipX(true);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body
        this.body.setCollideWorldBounds(true);
        this.cursors = this.scene.input.keyboard.addKeys('W, A, D, SPACE');
    }

    createAnims()
    {
        this.scene.anims.create({
			key: 'run',
			frames: this.scene.anims.generateFrameNames('wolf', {
			  prefix: 'wolf_',
			  suffix: '.png',
			  start: 19,
			  end: 25,
			  zeroPad: 2
			}),
			frameRate: 10,
			repeat: -1,
			
		});
		this.scene.anims.create({
			key: 'attack',
			frames: this.scene.anims.generateFrameNames('wolf', {
			  prefix: 'wolf_',
			  suffix: '.png',
			  start: 8,
			  end: 14,
			  zeroPad: 2
			}),
			frameRate: 8,
			repeat: -1,
			
		});
		this.scene.anims.create({
			key: 'jump',
			frames: this.scene.anims.generateFrameNames('wolf', {
			  prefix: 'wolf_',
			  suffix: '.png',
			  start: 17,
			  end: 18,
			  zeroPad: 2
			}),
			frameRate: 5,
			repeat: -1,
			
		});
		this.scene.anims.create({
			key: 'idle',
			frames: this.scene.anims.generateFrameNames('wolf', {
			  prefix: 'wolf_',
			  suffix: '.png',
			  start: 1,
			  end: 7,
			  zeroPad: 2
			}),
			frameRate: 5,
			repeat: -1,
			
		});
    }
 
    update(time,delta) {

        this.body.setSize(0, 97); //ajustar el collider
        //this.setOrigin(0.5,0.5);

        //izquierda
        if (this.cursors.A.isDown) {
            this.body.setVelocityX(-300);
            if (this.body.onFloor())
                this.play('run', true);
        }
        //derecha
        else if (this.cursors.D.isDown) {
            this.body.setVelocityX(300);
            if (this.body.onFloor())
                this.play('run', true);
        }
        //atacar
        else if (this.cursors.SPACE.isDown) {
            this.body.setVelocityX(0);
            if (this.body.onFloor()) {
                this.play('attack', true);
				/*
				let s = this.scene.sound.add("wolf_attack");
                s.play()
                */
            }
        }
        else {
            this.body.setVelocityX(0);
            //idle
            if (this.body.onFloor())
                this.play('idle', true);
            /* a veces el sprite no toca el suelo cuando corre, por lo que no añadimos la animacion de caida
            else
                this.play('jump', true);
            */
        }
        //saltar
        if (this.cursors.W.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-415);
            this.play('jump', true);
        }

        //fliperar el sprite (por default esta a la izquierda)
        if (this.body.velocity.x > 0)
            this.setFlipX(true); //derecha
        else if (this.body.velocity.x < 0)
            this.setFlipX(false); //izquierda

        //falta animacion de hurt y morir

    }
}