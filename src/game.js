import Wolf from './wolf.js';
import Swub from './swub.js';
import Icedrake from './icedrake.js';
import Boar from './boar.js';
import Yeti from './yeti.js';
import Beam from './beam.js';
import Slash from './slash.js';
import Ice from './iceYeti.js';
import Boss from './boss.js';

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
        this.tileSize = 64;
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
        this.load.image("playButton_hover", "./assets/play_button_hover.png");
        this.load.image("helpButton_hover", "./assets/help_button_hover.png");
        //seccion ayuda
        this.load.image("helpBoard", "./assets/helpBoard.png");
        //sonido al pulsar boton
        this.load.audio("menu_select_sound", "./assets/music/effects/menu_select.wav");
        //sonido hover de boton
        this.load.audio("menu_hover_sound", "./assets/music/effects/menu_hover.mp3");

        //GAME OVER SCREEN
        this.load.image("menu_Button", "./assets/menu_button.png");
        this.load.image("retry_Button", "./assets/retry_button.png");
        this.load.image("menu_Button_hover", "./assets/menu_button_hover.png");
        this.load.image("retry_Button_hover", "./assets/retry_button_hover.png");
        this.load.image("gameOver", "./assets/gameOverBoard.png");
        //WIN SCREEN
        this.load.image("win", "./assets/backgrounds/backgroundColorForest_extended.png");
        this.load.image("gameWin", "./assets/gameWin.png");

        //LEVELS//
        //AUDIO
        //cargamos el audio
        this.load.audio("level1_sound", "./assets/music/soundtrack/Snow.mp3")
        this.load.audio("level2_sound", "./assets/music/soundtrack/Serenity.mp3")
        this.load.audio("level3_sound", "./assets/music/soundtrack/TreacherousSlopes.mp3")
        //cargamos los efectos de sonido del jugador
        this.load.audio("player_jump_sound", "./assets/music/effects/jump.wav");
        this.load.audio("player_attack_sound", "./assets/music/effects/wolf_attack.wav");
        this.load.audio("player_hurt_sound", "./assets/music/effects/wolf_hurt.wav");
        //efectos de sonido generales
        this.load.audio("gameover_sound", "./assets/music/effects/game_over.wav");
        this.load.audio("gamewin_sound", "./assets/music/effects/game_win.wav");
        this.load.audio("icehit_sound", "./assets/music/effects/ice_splash.wav");
        this.load.audio("yeti_smash", "./assets/music/effects/yeti_smash.wav");
        this.load.audio("dragon_breath", "./assets/music/effects/dragon_breath.mp3");
        this.load.audio("boar_sound", "./assets/music/effects/boar.wav");

        //GENERAL
        //añadimos imagen de las vidas
        this.load.image('hud_full', './assets/hud/hud1.png');
        this.load.image('hud_2left', './assets/hud/hud2.png');
        this.load.image('hud_1left', './assets/hud/hud3.png');
        this.load.image('hud_empty', './assets/hud/hud4.png');
        //slash player
        this.load.image("slash", "./assets/mainCharacter/attackWolf.png");

        //ice Yeti
        this.load.image("ice", "./assets/enemies/yeti_sprites/ice.png");

        //MAPAS
        //cargamos el tilemap
        this.load.image('tiles', './assets/tiles/tilemap.png');
        //cargamos imagen bloque collision
        this.load.image('collision_tile', './assets/tiles/collision.png');
        //cargamos los MAPAS de tiled en json
        this.load.tilemapTiledJSON('map1', './assets/levels/nivel1.json'); //nivel 1
        this.load.tilemapTiledJSON('map2', './assets/levels/nivel2.json'); //nivel 2
        this.load.tilemapTiledJSON('map3', './assets/levels/nivel3.json'); //nivel 3
        this.load.tilemapTiledJSON('map4', './assets/levels/nivel4.json'); //nivel 4
        //BG
        this.load.image("bg", "./assets/backgrounds/backgroundForest_extended.png");

        //SPRITESHEETS
        //cargamos el spritesheet del jugador
        //this.load.atlas('wolf', 'assets/mainCharacter/wolf_sprites/wolf.png', 'assets/mainCharacter/wolf_sprites/wolf.json');
        this.load.atlas('wolf', './assets/mainCharacter/wolf_sprites/wolf.png', './assets/mainCharacter/wolf_sprites/wolf.json');
        //cargamos el spritesheet de los enemigos
        this.load.atlas('swub', './assets/enemies/swub_sprites/swub.png', './assets/enemies/swub_sprites/swub.json');
        this.load.atlas('boar', './assets/enemies/boar_sprites/boar.png', './assets/enemies/boar_sprites/boar.json');
        this.load.atlas('yeti', './assets/enemies/yeti_sprites/yeti.png', './assets/enemies/yeti_sprites/yeti.json');
        this.load.atlas('icedrake', './assets/enemies/icedrake_sprites/icedrake.png', './assets/enemies/icedrake_sprites/icedrake.json');
        this.load.atlas('boss', './assets/enemies/boss_sprites/boss.png', './assets/enemies/boss_sprites/boss.json');

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

        let menuSelect = this.sound.add("menu_select_sound", {
            volume: 0.40,
        });
        let menuHover = this.sound.add("menu_hover_sound", {
            volume: 2,
        });

        clickButton.on("pointerover", () => {
            menuHover.play();
            clickButton.setTexture('playButton_hover');
        });

        clickButton.on("pointerout", () => {
            clickButton.setTexture('playButton');
        });

        //Si se pulsa el botón de play
        clickButton.on("pointerup", () => {
            menuSelect.play();
            this.scale.startFullscreen();
            this.scene.start("Level4"); //PARA TESTEAR, CAMBIAR EL NIVEL AQUI//
            sounds.destroy();
        });
        //Si se pulsa el botón de help
        helpButton.on("pointerup", () => {
            menuSelect.play();
            this.scene.start("Help");
            sounds.destroy();
        });

        helpButton.on("pointerover", () => {
            menuHover.play();
            helpButton.setTexture('helpButton_hover');
        });

        helpButton.on("pointerout", () => {
            helpButton.setTexture('helpButton');
        });
    }

    //FUNCIONES GENERALES DEL JUEGO QUE COMPARTEN TODOS LOS NIVELES//

    //MAPA//
    addMap(scene, level) {
        //añadimos el mapa dependiendo del nivel
        let map;
        switch (level) {
            case 1: map = scene.make.tilemap({
                key: 'map1',
                tileWidth: 64,
                tileHeight: 64
            }); break;
            case 2: map = scene.make.tilemap({
                key: 'map2',
                tileWidth: 64,
                tileHeight: 64
            }); break;
            case 3: map = scene.make.tilemap({
                key: 'map3',
                tileWidth: 64,
                tileHeight: 64
            }); break;
            case 4: map = scene.make.tilemap({
                key: 'map4',
                tileWidth: 64,
                tileHeight: 64
            }); break;
        }
        return map;
    }

    //BACKGROUND//
    addBackground(scene, level) {
        //añadimos el background que tiene fullscreen de funcionalidad
        let bg;
        switch (level) { //ver en que nivel estamos para elegir bg
            case 1: bg = scene.add.image(0, -950, "bg").setOrigin(0).setDepth(-1).setInteractive(); break;
            case 2: bg = scene.add.image(0, -400, "bg").setOrigin(0).setDepth(-1).setInteractive(); break;
            case 3: bg = scene.add.image(0, 0, "bg").setOrigin(0).setDepth(-1).setInteractive(); break;
            case 4: bg = scene.add.image(0, -950, "bg").setOrigin(0).setDepth(-1).setInteractive(); break;
        }
        bg.on('pointerup', function () {
            if (scene.scale.isFullscreen)
                scene.scale.stopFullscreen();
            else
                scene.scale.startFullscreen();
        }, scene);
    }

    //SUELO//
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

    //AÑADIR CAPA DE ENEMYCOLLISIONS//
    addEnemyCollision(map) {
        let collisionset = map.addTilesetImage('collisions', 'collision_tile', this.tileSize, this.tileSize);
        //añadimos capa enemyCollisions para las colisiones de enemigos en plataformas
        let enemy_collisionLayer = map.createStaticLayer('enemyCollisions', collisionset).setVisible(false);
        enemy_collisionLayer.setCollisionFromCollisionGroup();
        return enemy_collisionLayer;
    }

    //COLISIONES DE LOS ENEMIGOS//
    addEnemyPhysics(scene, enemies, groundLayer, enemy_collisionLayer) {
        scene.physics.add.collider(enemies, groundLayer);
        scene.physics.add.collider(enemies, enemy_collisionLayer);
        scene.physics.add.collider(enemies, enemies);
        enemies.getChildren().forEach(function (item) {
            item.addPhysics();
        }, scene);
    }

    //CAMARA//
    addCamera(scene, player, groundLayer) {
        //para que la camara siga al jugador
        scene.cameras.main.setBounds(0, 0, groundLayer.width, groundLayer.height); //para que no se salga del mapa
        scene.cameras.main.startFollow(player);
    }

    //AUDIOS//
    addSoundtrack(level, scene) {
        let s;
        let name;
        switch (level) {
            case 1: name = "level1_sound"; break;
            case 2: name = "level2_sound"; break;
            case 3: name = "level3_sound"; break;
            case 4: name = "level4_sound"; break;
        }
        this.sound.pauseOnBlur = false;
        s = scene.sound.add(name);
        s.loop = true;
        return s;
    }
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
            volume: 0.20,
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
    audio_hitbeam() {
        let s = this.sound.add("icehit_sound", {
            volume: 0.55,
        });
        s.play();
    }
    audio_hityeti() {
        let s = this.sound.add("yeti_smash", {
            volume: 0.35,
        });
        s.play();
    }
    audio_dragonbreath() {
        let s = this.sound.add("dragon_breath", {
            volume: 0.70,
        });
        s.play();
    }
    audio_oink() {
        let s = this.sound.add("boar_sound", {
            volume: 0.60,
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
        this.hud = scene.add.sprite(this.posHud, this.posHud, "hud_full").setOrigin(0).setDepth(2);
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
    knockBack(player, enemy) {
        //knock-back al jugador
        if (!player.invincible && !enemy.hurtflag) {
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
            else {
                player.body.setVelocityY(-player.knockBackUP);
            }
            player.play('hurtwolf', false);
            player.invincible = true;
        }

    }
    hitBeam(player, beam) {
        if (!player.invincible) {
            beam.destroy();
            player.beamHit = true;
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
            delay: enemy.stunDelay, //tiempo que el enemigo esta stuneado
            callback: () => {
                enemy.hurtflag = false;
            },
        });
    }

    //SPAWN//
    spawnPlayer(scene, x, y, groundLayer) {
        let wolf = new Wolf(scene, x, y);
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
    spawnBoar(scene, x, y, enemies) {
        let temp = new Boar(scene, x, y);
        temp.createAnims();
        temp.play('walkboar', true);
        enemies.add(temp);
    }
    spawnYeti(scene, x, y, enemies) {
        let temp = new Yeti(scene, x, y);
        temp.createAnims();
        temp.play('walkyeti', true);
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
    spawnIce(scene, x, y, enemy) {
        let ice = new Ice(scene, x, y, enemy);
        return ice;
    }
    spawnBoss(scene, x, y, enemies) {
        let temp = new Boss(scene, x, y);
        temp.createAnims();
        temp.play('walkboss', true);
        enemies.add(temp);
    }

    //WIN GAME//
    winGame(player, scene, enemies) {
        player.body.setVelocityX(0);
        player.anims.stop();
        enemies.getChildren().forEach(function (item) {
            item.winGame = true;
            item.body.setVelocityX(0);
            item.anims.stop();
        }, this);
        let winLetters = scene.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 - 220, "gameWin").setDepth(1);
        winLetters.setScrollFactor(0);
        scene.music.stop();
    }
    bgFadeIn(scene, level) {
        //tween para el fade in del nuevo background
        let win;
        switch (level) { //ver en que nivel estamos para elegir bg
            case 1: win = scene.add.image(0, -950, "win").setOrigin(0).setAlpha(0).setDepth(-1); break;
            case 2: win = scene.add.image(0, -400, "win").setOrigin(0).setAlpha(0).setDepth(-1); break;
            case 3: win = scene.add.image(0, 0, "win").setOrigin(0).setAlpha(0).setDepth(-1); break;
            case 4: win = scene.add.image(0, -950, "win").setOrigin(0).setAlpha(0).setDepth(-1); break;
        }
        scene.tweens.add({
            targets: win,
            alphaTopLeft: { value: 1, duration: 5000, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: 10000, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 5000, ease: 'Power1', delay: 2100 },
        })
    }
    nextLevel(nivel) {
        let s;
        switch (nivel) {
            case 1: s = 'Level1'; break;
            case 2: s = 'Level2'; break;
            case 3: s = 'Level3'; break;
            case 4: s = 'Level4'; break;
        }
        this.scene.stop(s);
        switch (nivel) {
            case 1: this.scene.start('Level2'); break;
            case 2: this.scene.start('Level3'); break;
            case 3: this.scene.start('Level4'); break;
            default: this.scene.start('Game'); break;
        }
    }

    //GAME OVER// 
    gameOver(player, scene) {
        //animacion de muerto
        player.body.setVelocityX(0);
        player.play("deadwolf");
        player.body.setSize(0, player.heightsizedead); //ajustar el collider

        scene.music.stop();
    }
    sceneGameOver(nivel) {
        this.scene.launch('GameOver', { level: nivel });
    }

    overlapcallback(player, enemy) {
        if (player.isAlive() && !player.winGame)
            return true;
        else
            return false;
    }

    //PROGESS OF GAME//
    textProgress(scene) {
        this.texts = scene.add.text(this.textProgressX, this.textProgressY, 'text', {
            fontSize: '24px',
            fontFamily: 'font1',
        }).setDepth(2);
        this.texts.setScrollFactor(0);
    }
    showProgress(score, total) {
        this.texts.setText("PROGRESS: " + score + "/" + total);
        this.texts.setFill("red");
    }

    //CHECKS//
    //CHECK ATAQUES DE LOS ENEMIGOS//
    enemyUpdate(scene, enemies, player) {
        enemies.getChildren().forEach(function (item) {
            //Funcion atacar
            if (!item.hurtflag)
                item.checkAttack(player, this, scene);
        }, this);
    }
    //ATAQUE DEL JUGADOR A LOS ENEMIGOS
    checkPlayerAttack(scene, slash, enemies, game) {
        for (let i = 0; i < slash.getChildren().length; i++) {
            enemies.getChildren().forEach(function (item) {
                if (!item.hurtflag && scene.physics.overlap(slash, item))
                    game.stunEnemy(item, slash)
                if (item.hurtflag)
                    scene.game.delayStun(scene, item);
            }, scene);
        }
    }
    //VER SI EL JUGADOR HA SIDO ATACADO
    checkPlayerisAttacked(scene, player, game) {
        if (player.hurtflag) {
            game.hurtPlayer(scene, player);
            game.updateHealthHud(player, scene);

            //audios
            if(player.beamHit)
            {
                game.audio_hitbeam();
                player.beamHit = false;
            }
            if (!player.isAlive())
                game.audio_gameOver(); //audio this.game over cuando matan al lobo
            else
                game.audio_playerHurt();

        }
    }
    //FUNCION SWUB VER SI CONGELA
    checkIfFreeze(scene, enemies, player, game, groundLayer) {
        let counter = 0;
        enemies.getChildren().forEach(function (item) {
            if (item.texture.key === 'swub') {
                //solo congela el tile DETRAS de el
                if (item.body.velocity.x > 0 && !player.winGame) //derecha
                    counter += game.frost(item.x - this.tileSize, item.y + this.tileSize, groundLayer);
                else if (item.body.velocity.x < 0 && !player.winGame) //izquierda
                    counter += game.frost(item.x + this.tileSize, item.y + this.tileSize, groundLayer);
            }
        }, scene);
        return counter;
    }
    //FUNCION DE JUGADOR VER SI DESCONGELA
    checkIfMelt(player, game, groundLayer) {
        let counter = 0;
        if (player.body.onFloor() && player.isAlive()) {
            //rango de descongelacion del lobo: delante,medio,atras
            counter += game.defrost(player.x - this.tileSize, player.y + this.tileSize, groundLayer);
            counter += game.defrost(player.x, player.y + this.tileSize, groundLayer);
            counter += game.defrost(player.x + this.tileSize, player.y + this.tileSize, groundLayer);
        }
        return counter;
    }
    //VER SI HA GANADO
    checkIfWin(scene, counter, checkWin, player, enemies, game, level) {
        if (counter === checkWin) {
            game.winGame(player, scene, enemies);
            player.winGame = true;
            //delay para pasar al siguiente nivel para que de tiempo escuchar la musica y fade in
            scene.time.delayedCall(7600, game.nextLevel, [level], scene);
        }
    }
    //VER SI HA PERDIDO
    checkIfLose(scene, player, game, level) {
        if (!player.isAlive()) { //ha perdido
            player.loseGame = true;
            //delay para la escena Game over
            scene.time.delayedCall(3000, game.sceneGameOver, [level], scene);
        }
    }

}