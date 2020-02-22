let game;

window.onload= function(){
    var config = {
        type: Phaser.AUTO,
        width: 100,
        height: 100,
        pixelArt: true,
        parent: 'mains',
        input: {
            gamepad: true
        },
        scale: {
            /*mode: Phaser.Scale.FIT,*/
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [ Game ]
        /*physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: false } }*/
        
    };
    game = new Phaser.Game(config);
}