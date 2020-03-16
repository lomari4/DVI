export default class Icedrake extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'icedrake');
        this.setFlipX(true);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body
        this.body.setCollideWorldBounds(true);
        this.body.setVelocityX(-100);
    }

    createAnims()
    {
        this.scene.anims.create({
			key: 'walk',
			frames: this.scene.anims.generateFrameNames('icedrake', {
			  prefix: 'icedrake_',
			  suffix: '.png',
			  start: 1,
			  end: 7,
			  zeroPad: 2
			}),
			frameRate: 10,
			repeat: -1,
			
		});
		this.scene.anims.create({
			key: 'attack',
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
		//faltaria que le stuneasen
    }
 
    update(time,delta) {

        this.body.setSize(0, 70); //ajustar el collider
        //this.setOrigin(0.5,0.5);
        //this.body.setVelocityX(-50);
 
        if (this.body.touching.right || this.body.blocked.right) {
            this.body.setVelocityX(-50); // turn left
        }
        else if (this.body.touching.left || this.body.blocked.left) {
            this.body.setVelocityX(50); // turn right
        }
        this.play('walk', true);
        
        //this.play('attack', true);

        //fliperar el sprite (por default esta a la izquierda)
        if (this.body.velocity.x > 0)
            this.setFlipX(true); //derecha
        else if (this.body.velocity.x < 0)
            this.setFlipX(false); //izquierda

        //falta animacion de hurt y descongelar

    }
}