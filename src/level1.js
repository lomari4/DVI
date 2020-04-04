export default class Level1 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level1' });
	}
	preload() { }

	//RECORDAR INDENTAR CON ALT+SHIFT+F
	create() {
		//GENERAL//
		//añadimos el JUEGO (clase Game con todas las funciones que van a compartir todos los niveles)
		let game = this.scene.get('Game');

		//añadimos el sonido
		this.music = this.sound.add("level1_sound");
		this.music.setLoop(true);
		this.music.play();

		//MAPA//
		this.level = 1;
		this.map = game.addMap(this, this.level); //hay que pasarle el nivel como segundo arg
		this.groundLayer = game.addGround(this, this.map);
		let enemy_collisionLayer = game.addEnemyCollision(this.map)

		//HUD de vidas
		this.hud = game.addHud(this);

		//JUGADOR//
		this.wolf = game.spawnPlayer(this, 0, 919, this.groundLayer);
		//colisiones del jugador
		this.collider = this.physics.add.collider(this.wolf, this.groundLayer);
		
		//CAMARA//
		game.addCamera(this, this.wolf, this.groundLayer);

		//ENEMIGOS//
		//crear grupo con todos los enemigos para las fisicas
		this.enemies = this.physics.add.group();
		//funciones de spawn de enemigos
		game.spawnSwub(this, 1300, 919, this.enemies);
		game.spawnIcedrake(this, 900, 965, this.enemies);
		game.spawnIcedrake(this, 900, 580, this.enemies);
		this.enemies.getChildren().forEach(function (item) { //necesario para crear cada enemigo con sus propiedades. Hacerlo antes de añadirlo al grupo no funciona
			item.create();
		}, this);
		//colisiones de los enemigos
		this.physics.add.collider(this.enemies, this.groundLayer);
		this.physics.add.collider(this.enemies, enemy_collisionLayer);
		this.physics.add.collider(this.enemies, this.enemies);

	}

	update(time, delta) {
		//cogemos el juego (nos lo podemos ahorrar si hacemos var global game, pero preferimos no tenerla)
		let game = this.scene.get('Game');

		//update del jugador
		this.wolf.update(game);

		//update de los enemigos
		this.enemies.getChildren().forEach(function (item) {
			item.update();
		}, this);

		//Para cambiar el terreno
		if(this.wolf.body.onFloor() && this.wolf.health > 0){
			if(this.groundLayer.hasTileAtWorldXY(this.wolf.x - 64, this.wolf.y + 64)){
				let tile = this.groundLayer.getTileAtWorldXY(this.wolf.x - 64, this.wolf.y + 64); 
				switch (tile.index){
					case 7: tile.index -= 6; break;
					case 8: tile.index -= 6; break;
					case 9: tile.index -= 6; break;
					case 10: tile.index -= 6; break;
					case 11: tile.index -= 6; break;
					case 12: tile.index -= 6; break;
					default: break;
				}
				let tile0 = this.groundLayer.putTileAtWorldXY(tile.index, this.wolf.x - 64, this.wolf.y + 64);
				tile0.setCollision(true);
			}
			if(this.groundLayer.hasTileAtWorldXY(this.wolf.x, this.wolf.y + 64)){
				let tile = this.groundLayer.getTileAtWorldXY(this.wolf.x, this.wolf.y + 64); 
				switch (tile.index){
					case 7: tile.index -= 6; break;
					case 8: tile.index -= 6; break;
					case 9: tile.index -= 6; break;
					case 10: tile.index -= 6; break;
					case 11: tile.index -= 6; break;
					case 12: tile.index -= 6; break;
					default: break;
				}
				let tile1 = this.groundLayer.putTileAtWorldXY(tile.index, this.wolf.x, this.wolf.y + 64);
				tile1.setCollision(true);
			}
			if(this.groundLayer.hasTileAtWorldXY(this.wolf.x + 64, this.wolf.y + 64)){
				let tile = this.groundLayer.getTileAtWorldXY(this.wolf.x + 64, this.wolf.y + 64); 
				switch (tile.index){
					case 7: tile.index -= 6; break;
					case 8: tile.index -= 6; break;
					case 9: tile.index -= 6; break;
					case 10: tile.index -= 6; break;
					case 11: tile.index -= 6; break;
					case 12: tile.index -= 6; break;
					default: break;
				}
				let tile2 = this.groundLayer.putTileAtWorldXY(tile.index, this.wolf.x + 64, this.wolf.y + 64);
				tile2.setCollision(true);
			}
		}
		//ATAQUES Y COLISIONES CON ENEMIGOS
		//funcion overlap para colisiones con el jugador
		if(this.wolf.health > 0)
			this.physics.add.overlap(this.wolf, this.enemies, game.hurtPlayer, game.overlapcallback, this);

		//jugador dañado
		if (this.wolf.hurtflag === true) {
			//jugador invencible por tiempo
			this.time.addEvent({
				delay: 1000,
				callback: ()=>{
					this.wolf.invincible=false;
				},
			});
			this.wolf.health -= 1;
			this.wolf.hurtflag = false;
			game.updateHealthHud(this.wolf, this);

			if (this.wolf.health <= 0)
				game.audio_gameOver(); //audio game over cuando matan al lobo
			else
				game.audio_playerHurt();
			
		}

		if (this.wolf.health <= 0) { //ha perdido
			game.gameOver(this.wolf,this);
			//delay para la escena Game over
			this.time.delayedCall(3000, game.sceneGameOver, [this.level], this);
		}
		
	}

}

