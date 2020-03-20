export default class Swub extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'swub');
    }
    create(){
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //enable body
        this.body.setCollideWorldBounds(true);
        this.body.setVelocityX(-40);
    }

    createAnims()
    {
        this.scene.anims.create({
			key: 'walkswub',
			frames: this.scene.anims.generateFrameNames('swub', {
			  prefix: 'swub_',
			  suffix: '.png',
			  start: 1,
			  end: 6,
			  zeroPad: 2
			}),
			frameRate: 6,
			repeat: -1,
			
		});
		this.scene.anims.create({
			key: 'hurtswub',
			frames: this.scene.anims.generateFrameNames('swub', {
			  prefix: 'swub_',
			  suffix: '.png',
			  start: 7,
			  end: 7,
			  zeroPad: 2
			}),
			frameRate: 1,
			repeat: -1,
			
		});
		
    }
 
    update() {

        this.body.setSize(0, 53); //ajustar el collider
 
        if (this.body.touching.right || this.body.blocked.right) {
            this.body.setVelocityX(-40); // turn left
        }
        else if (this.body.touching.left || this.body.blocked.left) {
            this.body.setVelocityX(40); // turn right
        }

        this.play('walkswub', true);
      
        //fliperar el sprite (por default esta a la izquierda)
        if (this.body.velocity.x > 0)
            this.setFlipX(true); //derecha
        else if (this.body.velocity.x < 0)
            this.setFlipX(false); //izquierda

        //falta animacion de hurt y descongelar

    }
}