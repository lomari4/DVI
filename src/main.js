import Game from './game.js'
import Help from './help.js'
import Level1 from './level1.js'
import Level2 from './level2.js'
import Level3 from './level3.js'
import Level4 from './level4.js'
import GameOver from './gameOver.js'
import GameWin from './gameWin.js'
import PausedGame from './pausedgame.js'

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
    scene: [Game, Help, Level1, Level2, Level3, Level4, GameOver, GameWin, PausedGame],
    physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: false } }

};
new Phaser.Game(config);
