//import Menu from './src/scenes/menu.js'
//import Game from './src/scenes/game.js'

window.onload = function() {
    var config = {
        type: Phaser.AUTO,
        width: 1600, //2046
        height: 960, //1028 
        pixelArt: true,
        parent: 'mains',
        input: {
            gamepad: true
        },
        scale: {
            /*mode: Phaser.Scale.FIT,*/
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        //scene: [Menu, Game],
        scene: [Game],
        physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: true } }

    };
    let game = new Phaser.Game(config);
}