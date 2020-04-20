export default class Ice extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, enemy) {
        super(scene, x, y, "ice");

        this.scene.add.existing(this);
        
        this.coolDown = 0;
        this.coolDownMax = 200;

        this.scene.physics.add.existing(this); //enable body

        if (enemy.flipX) {
            this.setFlipX(true);
        }
        else {
            this.setFlipX(false);
        }
        this.body.allowGravity = false;
        scene.ices.add(this);

    }

    update(player,game) {
        //this.body.setSize(80, 20);
        if (this.coolDown > this.coolDownMax)
            this.destroy();  
        this.coolDown++;
    }
}
