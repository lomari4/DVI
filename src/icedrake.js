export default class Icedrake extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'icedrake');
        this.setFlipX(true);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body
		this.body.setCollideWorldBounds(true);
		this.body.setVelocityX(70);
    }
    createAnims()
    {
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
			repeat: -1,
			
		});
		this.scene.anims.create({
			key: 'attackicedrake',
			frames: this.scene.anims.generateFrameNames('icedrake', {
			  prefix: 'icedrake_',
			  suffix: '.png',
			  start: 10,
			  end: 23,
			  zeroPad: 2
			}),
			frameRate: 8,
			repeat: -1,
			
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
			repeat: -1,
			
		});
    }
 
    update() {

        this.body.setSize(0, 65); //ajustar el collider
 
        if (this.body.touching.right || this.body.blocked.right) {
            this.body.setVelocityX(-70); // turn left
        }
        else if (this.body.touching.left || this.body.blocked.left) {
            this.body.setVelocityX(70); // turn right
		}

        this.play('walkicedrake', true);
        
        //this.play('attack', true);

        //fliperar el sprite (por default esta a la izquierda)
        if (this.body.velocity.x > 0)
            this.setFlipX(true); //derecha
        else if (this.body.velocity.x < 0)
            this.setFlipX(false); //izquierda

        //falta animacion de hurt y descongelar

    }
}