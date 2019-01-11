var victoria = new Phaser.Scene('Victoria');

victoria.preload = function(){
	//carga sprites mummy
	this.load.image('bgV','Sprites/bgmenu.png');
    this.load.spritesheet('Mummyv','Sprites/mummySprites2.png', {frameWidth: 100, frameHeight: 150});
    this.load.spritesheet("Pharaohv","Sprites/pharaohsprites.png", {frameWidth: 100, frameHeight: 150});
    this.load.image('victoria','Sprites/victoria.png');
	this.load.image('backI','Sprites/back.png');
	this.load.image('reinicio','Sprites/reiniciar.png');
}

victoria.create = function(){


	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//background
	var bgV = this.add.image(0, 0, 'bgV').setOrigin(0);
	//letras victoria
	var vic = this.add.sprite(960, 540, 'victoria');

////////////////////Victoria Mummy//////////////////////////////////
	var mumV = this.add.sprite(1300, 400,'Mummyv');
	//Animación salto victoria
    this.anims.create({
        key: 'mvAnim',
        frames: this.anims.generateFrameNumbers('Mummyv',{start: 13, end: 15}),
        frameRate: 5,
        repeat: -1
    });
    mumV.anims.play('mvAnim');

////////////////////Victoria Pharaoh//////////////////////////////////
	var pV = this.add.sprite(640, 400,'Pharaohv');
	//Animación salto victoria
    this.anims.create({
        key: 'pvAnim',
        frames: this.anims.generateFrameNumbers('Pharaohv',{start: 8, end: 10}),
        frameRate: 3,
        repeat: -1
    });
    pV.anims.play('pvAnim');

//////////////////////BOTON REINICIAR///////////////////////////
	//cargar boton Reiniciar
	this.brei = this.add.sprite(960, 800, 'reinicio').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.brei.scaleX -= 0.2;
	this.brei.scaleY -= 0.2;
	//hacer boton visible
	this.brei.setAlpha(1);
	//accion al poner el cursor sobre el boton Reiniciar
	this.brei.on('pointerover', function(){
		victoria.brei.scaleX += 0.15;
		victoria.brei.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Reiniciar
	this.brei.on('pointerout', function(){
		victoria.brei.scaleX -= 0.15;
		victoria.brei.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Reiniciar
	this.brei.on('pointerdown', function(){
		victoria.scene.start(offline);
		victoria.scene.launch(heart, offline);
		
	})
/////////////////BOTON VOLVER//////////////////
	//cargar boton Volver
	this.binit = this.add.sprite(960, 950, 'backI').setInteractive();
	this.binit.scaleX -= 0.4;
	this.binit.scaleY -= 0.4;
	//hacer boton invisible
	this.binit.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.binit.on('pointerover', function(){
		victoria.binit.scaleX += 0.15;
		victoria.binit.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.binit.on('pointerout', function(){
		victoria.binit.scaleX -= 0.15;
		victoria.binit.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.binit.on('pointerdown', function(){
		//cambio de escena a menu
		
		victoria.scene.start(submenu);
		
	})
}

victoria.update = function(){
	
}