//import Menu from './src/scenes/menu.js'
//import Game from './src/scenes/game.js'
let game
window.onload = function() {
    var config = {
        type: Phaser.AUTO,
        width: 1472, 
        height: 736, 
        pixelArt: true,
        parent: 'mains',
        input: {
            gamepad: true
        },
        audio: {
            disableWebAudio: true
        },
        scale: {
            /*mode: Phaser.Scale.FIT,*/
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        //scene: [Menu, Game],
        scene: [Game, Play],
        physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: true } }

    };
    game = new Phaser.Game(config);
}