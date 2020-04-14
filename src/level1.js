export default class Level1 extends Phaser.Scene {

	constructor() {
		super({ key: 'Level1' });
		this.level = 1;
		this.tileSize = 64;
	}

	preload() { }

	create() {
		//GENERAL//
		this.game = this.scene.get('Game'); //(clase Game con todas las funciones que van a compartir todos los niveles)
		this.counter = 0; //contador del numero de tiles que has cambiado
		this.checkWin = 0; //contador del numero de tiles totales en el mapa
		this.winFlag = false;

		//añadimos el sonido
		this.music = this.sound.add("level1_sound");
		this.music.setLoop(true);
		this.music.play();

		//MAPA//
		this.map = this.game.addMap(this, this.level); //hay que pasarle el nivel como segundo arg
		this.background = this.game.addBackground(this);
		this.groundLayer = this.game.addGround(this, this.map);
		let enemy_collisionLayer = this.game.addEnemyCollision(this.map);

		//Cuenta el numero de tiles que hay en el mapa
		this.checkWin = this.game.countTotalTiles(this.map, this.groundLayer);

		//HUD de vidas
		this.hud = this.game.addHud(this);

		//Progreso en el juego
		this.game.textProgress(this);

		//JUGADOR//
		this.wolf = this.game.spawnPlayer(this, 0, 919, this.groundLayer);
		//colisiones del jugador
		this.collider = this.physics.add.collider(this.wolf, this.groundLayer);

		//CAMARA//
		this.game.addCamera(this, this.wolf, this.groundLayer);

		//ENEMIGOS//
		//crear grupo con todos los enemigos para las fisicas
		this.enemies = this.physics.add.group();
		//funciones de spawn de enemigos
		this.game.spawnSwub(this, 1300, 933, this.enemies);
		this.game.spawnIcedrake(this, 1400, 550, this.enemies);
		this.game.spawnIcedrake(this, 2900, 550, this.enemies);
		this.enemies.getChildren().forEach(function (item) { //necesario para crear cada enemigo con sus propiedades. Hacerlo antes de añadirlo al grupo no funciona
			item.create();
		}, this);
		//colisiones de los enemigos
		this.physics.add.collider(this.enemies, this.groundLayer);
		this.physics.add.collider(this.enemies, enemy_collisionLayer);
		this.physics.add.collider(this.enemies, this.enemies);

		//beam
		this.projectiles = this.add.group();

		//slash
		this.slash = this.add.group();

	}

	update(time, delta) {
		if (!this.wolf.winGame) {
			//update del jugador
			this.wolf.update(this.game);

			//update de los enemigos
			this.enemies.getChildren().forEach(function (item) {
				item.update();
				//Funcion atacar
				if (!item.hurtflag)
					item.checkAttack(this.wolf, this.game, this);
			}, this);

			//FUNCION DE DESCONGELAR EL SUELO DE LOS SWUB
			this.enemies.getChildren().forEach(function (item) {
				if (item.texture.key === 'swub') {
					//solo congela el tile DETRAS de el
					if (item.body.velocity.x > 0 && !this.wolf.winGame) //derecha
						this.counter -= this.game.frost(item.x - this.tileSize, item.y + this.tileSize, this.groundLayer);
					else if (item.body.velocity.x < 0 && !this.wolf.winGame) //izquierda
						this.counter -= this.game.frost(item.x + this.tileSize, item.y + this.tileSize, this.groundLayer);
				}
			}, this);

			//FUNCION DE DESCONGELAR EL SUELO DEL JUGADOR
			if (this.wolf.body.onFloor() && this.wolf.isAlive()) {
				//rango de descongelacion del lobo: delante,medio,atras
				this.counter += this.game.defrost(this.wolf.x - this.tileSize, this.wolf.y + this.tileSize, this.groundLayer);
				this.counter += this.game.defrost(this.wolf.x, this.wolf.y + this.tileSize, this.groundLayer);
				this.counter += this.game.defrost(this.wolf.x + this.tileSize, this.wolf.y + this.tileSize, this.groundLayer);
			}

			//ATAQUES Y OVERLAPS
			//update y overlap de los proyectiles del dragon
			for (let i = 0; i < this.projectiles.getChildren().length; i++) {
				let beam = this.projectiles.getChildren()[i];
				this.physics.add.overlap(this.wolf, beam, this.game.knockBack, this.game.hitBeam, this.game.overlapcallback, this);
				beam.update(this.wolf, this.game);
			}

			//overlap del ataque del jugador
			for (let i = 0; i < this.slash.getChildren().length; i++) {
				let slash = this.slash.getChildren()[i];
				this.enemies.getChildren().forEach(function (item) {
					if (!item.hurtflag) {
						this.physics.add.overlap(item, slash, this.game.stunEnemy, null, this);
						this.game.delayStun(this, item);
					}
				}, this);
				slash.update();
			}

			//funcion overlap para colisiones con el jugador
			if (this.wolf.isAlive()){
				this.physics.add.overlap(this.wolf, this.enemies, this.game.knockBack, this.game.overlapcallback, this);
			}

			//jugador dañado por el knockBack
			if (this.wolf.hurtflag === true) {
				this.game.hurtPlayer(this, this.wolf);
				this.game.updateHealthHud(this.wolf, this);

				if (!this.wolf.isAlive())
					this.game.audio_gameOver(); //audio this.game over cuando matan al lobo
				else
					this.game.audio_playerHurt();

			}
		}

		//MUESTRA EL PROGRESO AL JUGADOR
		this.game.showProgress(this.counter, this.checkWin);

		//COMPRUEBA SI HA GANADO
		if (this.counter === this.checkWin) {
			//Esto hay que poner un cartel de victoria
			this.game.winGame(this.wolf, this, this.enemies);
			this.wolf.winGame = true;
			//delay para pasar al siguiente nivel para que de tiempo escuchar la musica y fade in
			//this.time.delayedCall(10000, this.game.nextLevel, [this.level], this);
		}
		//audio de game win y fade in del nuevo bg
		if (this.wolf.winGame && !this.winFlag) {
			this.game.audio_gameWin();
			this.game.bgFadeIn(this);
			this.winFlag = true;
		}

		//GAME OVER
		if (!this.wolf.isAlive()) { //ha perdido
			this.game.gameOver(this.wolf, this);
			//delay para la escena Game over
			this.time.delayedCall(3000, this.game.sceneGameOver, [this.level], this);
		}

	}

}

