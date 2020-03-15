
export default class Wolf extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'wolf');
        this.body.setBounce(0.1);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);    
        this.cursors = this.scene.input.keyboard.addKeys('W, A, D, SPACE');
        //this.updateScore();
    }
    /*
    point() {
      this.score++;
      this.updateScore();
    }
    
    updateScore() {
      this.label.text = 'Score: ' + this.score;
    }
    */

    preUpdate() {

        //izquierda
        if (this.cursors.A.isDown) {
            this.body.setVelocityX(-200); //moverse a la izquierda
            this.play('run', true); //iniciar walk animation
            this.player.flipX = false; // 
        }
        //derecha
        if (this.cursors.D.isDown) {
            this.body.setVelocityX(200); //moverse a la derecha 
            this.play('run', true); //iniciar walk animation
            this.flipX = true; // flip sprite xq el default esta hacia la izquierda
        }
        //saltar
        if (this.cursors.W.isDown && this.body.onFloor()) {
            this.setVelocityY(-350);
            this.play('jump', true);
        }
        //atacar izquierda
        if (this.cursors.SPACE.isDown && !this.player.flipX) {
            this.body.setVelocityX(0);
            this.play('attack', true);
            this.flipX = false;
        }
        //atacar derecha
        if (this.cursors.SPACE.isDown && this.player.flipX) {
            this.body.setVelocityX(0);
            this.play('attack', true);
            this.flipX = true;
        }
        /*
        //idle
        else {
            this.body.setVelocityX(0);
            this.play('idle', true);
        }
        //falta animacion de hurt y morir
        */
    }
}