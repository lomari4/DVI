import Wolf from './wolf.js';
import Swub from './swub.js';
import Icedrake from './icedrake.js';


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

        //LEVELS//
        //AUDIO
        //cargamos el audio
        this.load.audio("level1_sound", "./assets/music/soundtrack/Snow.mp3");
        this.load.image("bg", "./assets/backgrounds/backgroundForest_extended.png");
        //cargamos los efectos de sonido del jugador
        this.load.audio("player_jump_sound", "./assets/music/effects/jump.wav");
        this.load.audio("player_attack_sound", "./assets/music/effects/wolf_attack.wav");

        //GENERAL
        //cargamos el icono de fullscreen
        this.load.image('fullscreen', './assets/hud/fullscreen.png');
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
    addMap(scene,nivel) {
        //añadimos el background que tiene fullscreen de funcionalidad
        let bg = scene.add.image(0, 0, "bg").setOrigin(0).setDepth(-1).setInteractive();
        bg.on('pointerup', function () {
            if (scene.scale.isFullscreen)
                scene.scale.stopFullscreen();
            else
                scene.scale.startFullscreen();
        }, scene);
        //añadimos el mapa dependiendo del nivel
        let map;
        if(nivel===1)
        {
            map = scene.make.tilemap({
                key: 'map1',
                tileWidth: 64,
                tileHeight: 64
            });
        }
        
        return map;
    }
    addGround(scene, map) {
        //añadimos los tileset al map
        let tileset = map.addTilesetImage('tilemap', 'tiles', 64, 64);
        //añadimos la capa ground del mapa. Asegurarse de que el primer arg coincide con el nombre en tiled
        let groundLayer = map.createStaticLayer('ground', tileset); //sera layer dinamica en un futuro
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
    audio_playerJump(scene) {
        let s = this.sound.add("player_jump_sound", {
            volume: 0.55,   
        });
        s.play();
    }
    audio_playerAttack(scene) {
        /*
        scene.input.keyboard.on('keydown-SPACE', () => {
            this.sound.add("player_attack_sound").play();
        });
        */
       let s = this.sound.add("player_attack_sound", {
            volume: 0.55,   
       });
       s.play();
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

    //HURT//
    hurtPlayer(player, enemy) {
        //knock-back al jugador
        player.hurtflag = true;
        if(player.body.touching.down){
            player.body.setVelocityY(-300);
        }
        else if(player.body.touching.right){
            player.body.setVelocityY(-200);
            player.body.setVelocityX(-200);
        }
        else{
            player.body.setVelocityY(-200);
            player.body.setVelocityX(200);
        }
        player.play('hurtwolf', false);
        //si health is 0, muere

    }

    //SPAWN//
    spawnPlayer(scene, x, y, groundLayer) {
        let wolf = new Wolf(scene, 0, 919);
        wolf.createAnims(); //crear las animaciones del wolf
        scene.physics.add.collider(wolf, groundLayer);
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
}