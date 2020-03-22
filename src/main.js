import Game from './game.js'
import Level1 from './level1.js'
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
        disableWebAudio: false
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    //scene: [Menu, Game],
    scene: [Game, Level1],
    physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: true } }

};
new Phaser.Game(config);
