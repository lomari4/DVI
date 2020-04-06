import Wolf from './wolf.js';
import Swub from './swub.js';
import Icedrake from './icedrake.js';

//RECORDAR INDENTAR CON ALT+SHIFT+F
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
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
        //Cargamos el boton
        this.load.image("playButton", "./assets/play_button.png");

        //GAME OVER SCREEN
        this.load.image("menu_Button", "./assets/menu_button.png");
        this.load.image("retry_Button", "./assets/retry_button.png");
        this.load.image("gameOver", "./assets/gameOverBoard.png");

        //LEVELS//
        //AUDIO
        //cargamos el audio
        this.load.audio("level1_sound", "./assets/music/soundtrack/Snow.mp3");
        this.load.image("bg", "./assets/backgrounds/backgroundForest_extended.png");
        this.load.image("bg2", "./assets/backgrounds/backgroundColorForest_extended.png");
        //cargamos los efectos de sonido del jugador
        this.load.audio("player_jump_sound", "./assets/music/effects/jump.wav");
        this.load.audio("player_attack_sound", "./assets/music/effects/wolf_attack.wav");
        this.load.audio("player_hurt_sound", "./assets/music/effects/wolf_hurt.wav");
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
        let clickButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 250, "playButton").setDepth(1).setInteractive();

        this.sound.pauseOnBlur = false;
        let sounds = this.sound.add("menuSound");
        sounds.play();

        //Si se pulsa el botón de play
        clickButton.on("pointerup", () => {
            this.scale.startFullscreen();
            this.scene.start("Level1");
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
    addBackground(scene){
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
        let tileset = map.addTilesetImage('tilemap', 'tiles', 64, 64);
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
        let collisionset = map.addTilesetImage('collisions', 'collision_tile', 64, 64);
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

    //CAMBIAR EL TERRENO QUE EL JUGADOR PISE//
    defrost(x, y, groundLayer) {
        let count = 0;
        if (groundLayer.hasTileAtWorldXY(x, y)) {
            let tile = groundLayer.getTileAtWorldXY(x, y);
            if (tile.properties.frozen) //properties contiene la propiedad frozen. Si es true, se descongela el tile
            {
                tile.index -= 6; //-6 ya que en el tileset, los frozen estan a 6 posiciones de los no frozen
                let tile0 = groundLayer.putTileAtWorldXY(tile.index, x, y);
                tile0.setCollision(true);
                tile0.properties.frozen = false;
                count += 1;
            }
        }
        return count;
    }
    //Cuenta el numero de tiles que hay en el mapa
    countTotalTiles(map, groundLayer){
        let i , j, counter = 0;
        for(j = 0; j < map.width; ++j){
            for(i = 0; i < map.height; ++i){
                if (groundLayer.hasTileAtWorldXY(j*64, i*64)) {
                    counter++;
                }
            }
        }
        return counter;
    }

    //HUD//
    addHud(scene) {
        this.hud = scene.add.sprite(10, 10, "hud_full").setOrigin(0);
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
        if (!player.invincible) {
            player.hurtflag = true;
            if (player.body.touching.down) {
                player.body.setVelocityY(-300);
            }
            else if (player.body.touching.right) {
                player.body.setVelocityY(-200);
                player.body.setVelocityX(-200);
            }
            else {
                player.body.setVelocityY(-200);
                player.body.setVelocityX(200);
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

    //SPAWN//
    spawnPlayer(scene, x, y, groundLayer) {
        let wolf = new Wolf(scene, 0, 919);
        wolf.createAnims(); //crear las animaciones del wolf
        return wolf;
    }
    spawnSwub(scene, x, y, enemies) {
        let temp = new Swub(scene, x, y);
        temp.createAnims();
        enemies.add(temp);
    }
    spawnIcedrake(scene, x, y, enemies) {
        let temp = new Icedrake(scene, x, y);
        temp.createAnims();
        enemies.add(temp);
    }
    
    //WIN GAME
    winGame(player, scene, enemies){
        player.body.setVelocityX(0);
        this.bg.setTexture('bg2');
        enemies.getChildren().forEach(function (item) {
			item.body.setVelocityX(0);
        }, this);
    
        scene.music.stop();
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
        this.texts = scene.add.text(10, 70, 'text', {
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