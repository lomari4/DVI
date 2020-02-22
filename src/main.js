window.onload= function(){
    var config = {
        type: Phaser.AUTO,
        width: 1024,
        height: 1024,
        pixelArt: true,
        parent: 'mains',
        input: {
            gamepad: true
        },
        scale: {
            /*mode: Phaser.Scale.FIT,*/
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [ Game ],
        physics: { default: 'arcade', arcade: { /*gravity: { y: 400 },*/ debug: true } }
        
    };
    let game = new Phaser.Game(config);
}