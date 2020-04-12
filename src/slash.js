export default class Slash extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player){
        super(scene, x, y, "slash");
        this.count = 0;

        this.scene.add.existing(this);
    
        this.scene.physics.add.existing(this); //enable body
        if(player.flipX){
            this.setFlipX(false);
        }
        else {
            this.setFlipX(true);
        }
        this.body.allowGravity = false;
        scene.slash.add(this);
    }

    update(){
        //this.body.setSize(50, 81);
        if(this.count === 50){
            this.destroy();
        }
        this.count++;
    }
}