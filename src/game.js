import Wolf from './wolf.js';
import Swub from './swub.js';
import Icedrake from './icedrake.js';
import Beam from './beam.js';
import Slash from './slash.js';

//RECORDAR INDENTAR CON ALT+SHIFT+F
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
        this.tileSize = 64;
        this.widthAdded = 200;
        this.heightAdded = 250;
        this.tileIndex = 6;
        this.posHud = 10;
        this.textProgressX = 10;
        this.textProgressY = 70;
    }

    //PRELOAD DE TODO EL JUEGO//
    preload() {
        //TITLE SCREEN
        //Cargamos el audio
        this.load.audio("menuSound", "./assets/music/soundtrack/Night2.mp3");
        //Cargamos la imagen BackGround
        this.load.image("title_bg", "./assets/backgrounds/title_screen.png");
        //Cargamos el nombre del Juego
        this.load.image("logo", "./assets/logo2.0.png");
        //Cargamos los botones
        this.load.image("playButton", "./assets/play_button.png");
        this.load.image("helpButton", "./assets/help_button.png");
        //seccion ayuda
        this.load.image("helpBoard", "./assets/helpBoard.png");
        //slash player
        this.load.image("slash", "./assets/mainCharacter/attackWolf.png");

        //GAME OVER SCREEN
        this.load.image("menu_Button", "./assets/menu_button.png");
        this.load.image("retry_Button", "./assets/retry_button.png");
        this.load.image("gameOver", "./assets/gameOverBoard.png");
        //WIN SCREEN
        this.load.image("bg2", "./assets/backgrounds/backgroundColorForest_extended.png");
        this.load.image("gameWin", "./assets/gameWin.png");

        //LEVELS//
        //AUDIO
        //cargamos el audio
        this.load.audio("level1_sound", "./assets/music/soundtrack/Snow.mp3")
        //cargamos los efectos de sonido del jugador
        this.load.audio("player_jump_sound", "./assets/music/effects/jump.wav");
        this.load.audio("player_attack_sound", "./assets/music/effects/wolf_attack.wav");
        this.load.audio("player_hurt_sound", "./assets/music/effects/wolf_hurt.wav");
        this.load.audio("ice_splash_sound", "./assets/music/effects/ice_splash.wav");
        //efectos de sonido generales
        this.load.audio("gameover_sound", "./assets/music/effects/game_over.wav");
        this.load.audio("gamewin_sound", "./assets/music/effects/game_win.wav");

        //GENERAL
        //añadimos imagen de las vidas
        this.load.image('hud_full', 'assets/hud/hud1.png');
        this.load.image('hud_2left', 'assets/hud/hud2.png');
        this.load.image('hud_1left', 'assets/hud/hud3.png');
        this.load.image('hud_empty', 'assets/hud/hud4.png');

        //MAPA
        //cargamos el tilemap
        this.load.image('tiles', './assets/tiles/tilemap.png');
        //cargamos imagen bloque collision
        this.load.image('collision_tile', './assets/tiles/collision.png');
        //cargamos el MAPA de tiled en json
        this.load.tilemapTiledJSON('map1', './assets/levels/nivel1.json'); //nivel 1
        //BG
        this.load.image("bg", "./assets/backgrounds/backgroundForest_extended.png");

        //SPRITESHEETS
        //cargamos el spritesheet del jugador
        //this.load.atlas('wolf', 'assets/mainCharacter/wolf_sprites/wolf.png', 'assets/mainCharacter/wolf_sprites/wolf.json');
        this.load.atlas('wolf', './assets/mainCharacter/wolf_sprites/wolf.png', './assets/mainCharacter/wolf_sprites/wolf.json');
        //cargamos el spritesheet de los enemigos
        this.load.atlas('swub', './assets/enemies/swub_sprites/swub.png', './assets/enemies/swub_sprites/swub.json');
        this.load.atlas('icedrake', './assets/enemies/icedrake_sprites/icedrake.png', './assets/enemies/icedrake_sprites/icedrake.json');

    }

    create() {
        //Añadimos las Imagenes y el sonido
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.width * 0.19, "logo").setDepth(1);
        let clickButton = this.add.image(this.game.renderer.width / 2 - this.widthAdded, this.game.renderer.height / 2 + this.heightAdded, "playButton").setDepth(1).setInteractive();
        let helpButton = this.add.image(this.game.renderer.width / 2 + this.widthAdded, this.game.renderer.height / 2 + this.heightAdded, "helpButton").setDepth(1).setInteractive();

        this.sound.pauseOnBlur = false;
        let sounds = this.sound.add("menuSound");
        sounds.play();

        //Si se pulsa el botón de play
        clickButton.on("pointerup", () => {
            this.scale.startFullscreen();
            this.scene.start("Level1");
            sounds.destroy();
        })
        //Si se pulsa el botón de help
        helpButton.on("pointerup", () => {
            this.scene.start("Help");
            sounds.destroy();
        })
    }

    //FUNCIONES GENERALES DEL JUEGO QUE COMPARTEN TODOS LOS NIVELES//

    //MAPA//
    addMap(scene, nivel) {
        //añadimos el mapa dependiendo del nivel
        let map;
        if (nivel === 1) {
            map = scene.make.tilemap({
                key: 'map1',
                tileWidth: 64,
                tileHeight: 64
            });
        }

        return map;
    }
    //BACKGROUND//
    addBackground(scene) {
        //añadimos el background que tiene fullscreen de funcionalidad
        this.bg = scene.add.sprite(0, 0, "bg").setOrigin(0).setDepth(-1).setInteractive();
        this.bg.on('pointerup', function () {
            if (scene.scale.isFullscreen)
                scene.scale.stopFullscreen();
            else
                scene.scale.startFullscreen();
        }, scene);
    }


    addGround(scene, map) {
        //añadimos los tileset al map
        let tileset = map.addTilesetImage('tilemap', 'tiles', this.tileSize, this.tileSize);
        //añadimos la capa ground del mapa. Asegurarse de que el primer arg coincide con el nombre en tiled
        let groundLayer = map.createDynamicLayer('ground', tileset);
        //añadimos colision por grupo de tiled collision editor
        groundLayer.setCollisionFromCollisionGroup();
        //boundaries del mundo
        scene.physics.world.bounds.width = groundLayer.width;
        scene.physics.world.bounds.height = groundLayer.height;
        return groundLayer;
    }
    addEnemyCollision(map) {
        let collisionset = map.addTilesetImage('collisions', 'collision_tile', this.tileSize, this.tileSize);
        //añadimos capa enemyCollisions para las colisiones de enemigos en plataformas
        let enemy_collisionLayer = map.createStaticLayer('enemyCollisions', collisionset).setVisible(false);
        enemy_collisionLayer.setCollisionFromCollisionGroup();
        return enemy_collisionLayer;
    }

    //CAMARA//
    addCamera(scene, player, groundLayer) {
        //para que la camara siga al jugador
        scene.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height); //para que no se salga del mapa
        scene.cameras.main.startFollow(player);
    }

    //AUDIOS//
    audio_playerJump() {
        let s = this.sound.add("player_jump_sound", {
            volume: 0.47,
        });
        s.play();
    }
    audio_playerAttack() {
        let s = this.sound.add("player_attack_sound", {
            volume: 0.55,
        });
        s.play();
    }
    audio_playerHurt() {
        let s = this.sound.add("player_hurt_sound", {
            volume: 0.15,
        });
        s.play();
    }
    audio_gameOver() {
        let s = this.sound.add("gameover_sound", {
            volume: 0.55,
        });
        s.play();
    }
    audio_gameWin() {
        let s = this.sound.add("gamewin_sound", {
            volume: 0.25,
        });
        s.play();
    }
    audio_iceBeamHit() {
        let s = this.sound.add("ice_splash_sound", {
            volume: 0.55,
        });
        s.play();
    }

    //DESCONGELAR TERRENO//
    defrost(x, y, groundLayer) {
        let count = 0;
        if (groundLayer.hasTileAtWorldXY(x, y)) {
            let tile = groundLayer.getTileAtWorldXY(x, y);
            if (tile.properties.frozen) //properties contiene la propiedad frozen. Si es true, se descongela el tile
            {
                tile.index -= this.tileIndex; //-6 ya que en el tileset, los frozen estan a 6 posiciones de los no frozen
                let tile0 = groundLayer.putTileAtWorldXY(tile.index, x, y);
                tile0.setCollision(true);
                tile0.properties.frozen = false;
                count += 1;
            }
        }
        return count;
    }

    //COGELAR TERRENO//
    frost(x, y, groundLayer) {
        let count = 0;
        if (groundLayer.hasTileAtWorldXY(x, y)) {
            let tile = groundLayer.getTileAtWorldXY(x, y);
            if (!tile.properties.frozen) //congela el tile
            {
                tile.index += this.tileIndex;
                let tile0 = groundLayer.putTileAtWorldXY(tile.index, x, y);
                tile0.setCollision(true);
                tile0.properties.frozen = true;
                count += 1;
            }
        }
        return count;
    }

    //Cuenta el numero de tiles que hay en el mapa
    countTotalTiles(map, groundLayer) {
        let i, j, counter = 0;
        for (j = 0; j < map.width; ++j) {
            for (i = 0; i < map.height; ++i) {
                if (groundLayer.hasTileAtWorldXY(j * this.tileSize, i * this.tileSize)) {
                    counter++;
                }
            }
        }
        return counter;
    }

    //HUD//
    addHud(scene) {
        this.hud = scene.add.sprite(this.posHud, this.posHud, "hud_full").setOrigin(0);
        this.hud.setTexture("hud_full");
        this.hud.setScrollFactor(0);
    }
    updateHealthHud(player, scene) {
        switch (player.health) {
            case 3:
                this.hud.setTexture("hud_full");
                break;
            case 2:
                this.hud.setTexture("hud_2left");
                break;
            case 1:
                this.hud.setTexture("hud_1left");
                break;
            default:
                this.hud.setTexture("hud_empty");
                break;
        }
    }

    //DAÑAR AL JUGADOR//
    knockBack(player, damage) {
        //knock-back al jugador
        if (!player.invincible) {
            player.hurtflag = true;
            if (player.body.touching.down) {
                player.body.setVelocityY(-player.knockBackUP);
            }
            else if (player.body.touching.right) {
                player.body.setVelocityY(-player.knockBackSIDE);
                player.body.setVelocityX(-player.knockBackSIDE);
            }
            else if (player.body.touching.left) {
                player.body.setVelocityY(-player.knockBackSIDE);
                player.body.setVelocityX(player.knockBackSIDE);
            }
            player.play('hurtwolf', false);
            player.invincible = true;
        }

    }
    hurtPlayer(scene, player) {
        //jugador invencible por tiempo
        scene.time.addEvent({
            delay: 1000,
            callback: () => {
                player.invincible = false;
            },
        });
        player.health -= 1;
        player.hurtflag = false;
    }

    //DAÑAR AL ENEMIGO
    stunEnemy(enemy, slash) {
        enemy.hurtflag = true;
    }
    delayStun(scene, enemy) {
        scene.time.addEvent({
            delay: 3000, //tiempo que el enemigo esta stuneado
            callback: () => {
                enemy.hurtflag = false;
            },
        });
    }

    //SPAWN//
    spawnPlayer(scene, x, y, groundLayer) {
        let wolf = new Wolf(scene, 0, 919);
        wolf.createAnims(); //crear las animaciones del wolf
        return wolf;
    }
    spawnSwub(scene, x, y, enemies) {
        let temp = new Swub(scene, x, y);
        temp.createAnims();
        temp.play('walkswub', true);
        enemies.add(temp);
    }
    spawnIcedrake(scene, x, y, enemies) {
        let temp = new Icedrake(scene, x, y);
        temp.createAnims();
        temp.play('walkicedrake', true);
        enemies.add(temp);
    }
    spawnBeam(scene, x, y, enemy) {
        let beam = new Beam(scene, x, y, enemy);
        beam.createAnims();
        return beam;
    }
    spawnSlash(scene, x, y, player) {
        let slash = new Slash(scene, x, y, player);
        return slash;
    }

    //WIN GAME//
    winGame(player, scene, enemies) {
        player.body.setVelocityX(0);
        enemies.getChildren().forEach(function (item) {
            item.body.setVelocityX(0);
            item.anims.stop();
        }, this);
        let winLetters = scene.add.image(scene.game.renderer.width / 2, scene.game.renderer.height / 2 - 220, "gameWin").setDepth(1);
        winLetters.setScrollFactor(0);

        scene.music.stop();
    }
    bgFadeIn(scene) {
        //tween para el fade in del nuevo background
        let bg2 = scene.add.image(0, 0, "bg2").setOrigin(0).setAlpha(0).setDepth(-1);
        scene.tweens.add({
            targets: bg2,
            alphaTopLeft: { value: 1, duration: 5000, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: 10000, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 5000, ease: 'Power1', delay: 2100 },
        })
    }
    nextLevel(nivel) {
        switch (nivel) {
            case 1: this.scene.launch('Level2');
            case 2: this.scene.launch('Level3');
            case 3: this.scene.launch('Level4');
            default: this.scene.launch('Game');
        }
    }

    //GAME OVER// 
    gameOver(player, scene) {
        //animacion de muerto
        player.body.setVelocityX(0);
        player.play("deadwolf");
        player.body.setSize(0, 52); //ajustar el collider

        scene.music.stop();
    }
    sceneGameOver(nivel) {
        this.scene.launch('GameOver', { level: nivel });
    }
    overlapcallback(player, enemy) {
        if (player.isAlive() > 0)
            return true;
        else
            return false;
    }

    //PROGESS OF GAME//
    textProgress(scene) {
        this.texts = scene.add.text(this.textProgressX, this.textProgressY, 'text', {
            fontSize: '24px',
            fontFamily: 'font1',
        });
        this.texts.setScrollFactor(0);
    }
    showProgress(score, total) {
        this.texts.setText("PROGRESS: " + score + "/" + total);
        this.texts.setFill("red");
    }

}