import Game from './game.js'
import Help from './help.js'
import Level1 from './level1.js'
import GameOver from './gameOver.js'
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
    scene: [Game, Help, Level1, GameOver],
    physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: false } }

};
new Phaser.Game(config);
