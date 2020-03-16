export default class Swub extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'swub');
        this.setFlipX(true);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body
        this.body.setCollideWorldBounds(true);
    }

    createAnims()
    {
        this.scene.anims.create({
			key: 'walk',
			frames: this.scene.anims.generateFrameNames('swub', {
			  prefix: 'swub_',
			  suffix: '.png',
			  start: 1,
			  end: 3,
			  zeroPad: 2
			}),
			frameRate: 10,
			repeat: -1,
			
		});
		this.scene.anims.create({
			key: 'unfreeze',
			frames: this.scene.anims.generateFrameNames('swub', {
			  prefix: 'swub_',
			  suffix: '.png',
			  start: 4,
			  end: 6,
			  zeroPad: 2
			}),
			frameRate: 8,
			repeat: -1,
			
		});
		//faltaria que le stuneasen
    }
 
    update(time,delta) {

        this.body.setSize(0, 97); //ajustar el collider
        //this.setOrigin(0.5,0.5);
        this.play('walk', true);
        this.body.setVelocityX(-50);
/*
        //izquierda
        if (this.cursors.A.isDown) {
            this.body.setVelocityX(-300);
            if (this.body.onFloor()){
                this.play('run', true);
            }

        }
        //derecha
        else if (this.cursors.D.isDown) {
            this.body.setVelocityX(300);
            if (this.body.onFloor()){
                this.play('run', true);
            }
        }
        //atacar
        else if (this.cursors.SPACE.isDown) {
            this.body.setVelocityX(0);
            if (this.body.onFloor()) {
                this.play('attack', true);
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
           
        }
        //saltar
        if (this.cursors.W.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-400);
            this.play('jump', true);
        }

        //fliperar el sprite (por default esta a la izquierda)
        if (this.body.velocity.x > 0)
            this.setFlipX(true); //derecha
        else if (this.body.velocity.x < 0)
            this.setFlipX(false); //izquierda

        //falta animacion de hurt y morir
*/
    }
}