class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {  
  	this.load.image("title_bg", "./assets/backgrounds/backgroundForest.png");
  	this.load.spritesheet("boar", "./assets/enemies/boar.png", {
  		frameHeigth: 32,
  		frameWidth: 32
  	});

  }

  create() {
  	console.log("gaifj");
  	/*this.aGrid=new AlignGrid({scene:this, rows:11, cols:11});
  	this.aGrid.showNumbers();*/
  	this.add.image(0,0, "title_bg").setOrigin(0);
  }

  update(time, delta) {    
  }
}