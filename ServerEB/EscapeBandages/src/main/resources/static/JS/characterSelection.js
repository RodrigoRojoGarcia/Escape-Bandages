var characterSelection = new Phaser.Scene('characterSelection');

characterSelection.preload = function(){
	//cargar imagenes
	//volver
	this.load.image('backO','Sprites/back.png');
	//ANTORCHAS
    this.load.spritesheet("torchO","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tileO", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundO", "background.json");
}


characterSelection.create = function(){
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"backgroundO", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tileO");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);
	///////////////////////////////////ANTORCHAS///////////////////////////////////
	var torchesM = [];
	var torchesM2 = [];
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    for(var i = 0; i < 2; i++){
        torchesM.push(this.add.sprite(225 + 1400*i,250,'torchO'));
        torchesM2.push(this.add.sprite(225 + 1400*i,800,'torchO'));
    };
    
    //Animación de las antorchas
    this.anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torchO',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    //Ponemos las animaciones en bucle, de las cuatro creadas
    for(var i = 0; i<2;i++){
        torchesM[i].anims.play('torchAnim');
        torchesM2[i].anims.play('torchAnim');
    };
    
    
    
//////////////////////////BOTONES///////////////////////////////////
	//////////////////////BOTON VOLVER///////////////////////////////
	//cargar boton Salir
	this.bback = this.add.sprite(300, 950, 'backO').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bback.scaleX -= 0.4;
	this.bback.scaleY -= 0.4;
	//hacer boton visible
	this.bback.setAlpha(1);
	//accion al poner el cursor sobre el boton Salir
	this.bback.on('pointerover', function(){
		characterSelection.bback.scaleX += 0.15;
		characterSelection.bback.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.bback.on('pointerout', function(){
		characterSelection.bback.scaleX -= 0.15;
		characterSelection.bback.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.bback.on('pointerdown', function(){
		characterSelection.scene.switch(submenu);
	})
	
	
	//////////////////////BOTON MOMIA///////////////////////////////
	//cargar boton Salir
	this.bMummy = this.add.sprite(600, 950, 'backO').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bMummy.scaleX -= 0.4;
	this.bMummy.scaleY -= 0.4;
	//hacer boton visible
	this.bMummy.setAlpha(1);
	//accion al poner el cursor sobre el boton Salir
	this.bMummy.on('pointerover', function(){
		characterSelection.bMummy.scaleX += 0.15;
		characterSelection.bMummy.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.bMummy.on('pointerout', function(){
		characterSelection.bMummy.scaleX -= 0.15;
		characterSelection.bMummy.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.bMummy.on('pointerdown', function(){
		myUser.selectCharacter("Mummy")
	})
	
	//////////////////////BOTON PHARAOH///////////////////////////////
	//cargar boton Salir
	this.bPharaoh = this.add.sprite(900, 950, 'backO').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bPharaoh.scaleX -= 0.4;
	this.bPharaoh.scaleY -= 0.4;
	//hacer boton visible
	this.bPharaoh.setAlpha(1);
	//accion al poner el cursor sobre el boton Salir
	this.bPharaoh.on('pointerover', function(){
		characterSelection.bPharaoh.scaleX += 0.15;
		characterSelection.bPharaoh.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.bPharaoh.on('pointerout', function(){
		characterSelection.bPharaoh.scaleX -= 0.15;
		characterSelection.bPharaoh.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.bPharaoh.on('pointerdown', function(){
		myUser.selectCharacter("Pharaoh")
	})
    
}