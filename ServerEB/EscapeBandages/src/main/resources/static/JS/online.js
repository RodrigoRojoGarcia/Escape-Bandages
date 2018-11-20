//crear escena online
var online = new Phaser.Scene('Online');

online.preload = function(){
	//cargar imagenes
	//volver
	this.load.image('backO','Sprites/back.png');
	//ANTORCHAS
    this.load.spritesheet("torchO","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
    //boton eleccion momia
    this.load.spritesheet("boton_mummy","Sprites/boton_mummy_spritesheet.png",{frameWidth: 380, frameHeight: 380});
    //boton eleccion faraon
    this.load.spritesheet("boton_pharaoh","Sprites/boton_pharaoh_spritesheet.png",{frameWidth: 380, frameHeight: 380});
///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tileO", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundO", "background.json");
}

online.create = function(){
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//cargar letras Seleccion de Personaje


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


    //Animación boton mummy
    this.anims.create({
        key: 'bmummyAnim',
        frames: this.anims.generateFrameNumbers('boton_mummy',{start: 0, end: 0}),
        frameRate: 10
    });
    this.anims.create({
        key: 'bmummyAnim2',
        frames: this.anims.generateFrameNumbers('boton_mummy',{start: 1, end: 1}),
        frameRate: 10
    });
    //Animación boton pharaoh
    this.anims.create({
        key: 'bpharaohAnim',
        frames: this.anims.generateFrameNumbers('boton_pharaoh',{start: 0, end: 0}),
        frameRate: 10
    });
    this.anims.create({
        key: 'bpharaohAnim2',
        frames: this.anims.generateFrameNumbers('boton_pharaoh',{start: 1, end: 1}),
        frameRate: 10
    });


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
		online.bback.scaleX += 0.15;
		online.bback.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.bback.on('pointerout', function(){
		online.bback.scaleX -= 0.15;
		online.bback.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.bback.on('pointerdown', function(){
		//cambio escena a submenu
		online.scene.switch(submenu);
	})
	//////////////////////BOTON ELLECCION MOMIA///////////////////////////////
	//cargar boton eleccion Mummy
	this.bMummy = this.add.sprite(600, 550, 'boton_mummy').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	//hacer boton visible
	this.bMummy.setAlpha(1);
	//accion al poner el cursor sobre el boton de eleccion de Mummy
	this.bMummy.on('pointerover', function(){
		online.bMummy.anims.play('bmummyAnim2');
	})
	//accion al quitar el cursor del boton de eleccion de Mummy
	this.bMummy.on('pointerout', function(){
		online.bMummy.anims.play('bmummyAnim');
	})
	//accion al hacer click sobre el boton de eleccion de Mummy
	this.bMummy.on('pointerdown', function(){
		
	})
	/////////////////////BOTON ELLECCION PHARAOH///////////////////////////////
	//cargar boton eleccion Pharaoh
	this.bPharaoh = this.add.sprite(1300, 550, 'boton_pharaoh').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	//hacer boton visible
	this.bPharaoh.setAlpha(1);
	//accion al poner el cursor sobre el boton de eleccion de Pharaoh
	this.bPharaoh.on('pointerover', function(){
		online.bPharaoh.anims.play('bpharaohAnim2');
	})
	//accion al quitar el cursor del boton de eleccion de Pharaoh
	this.bPharaoh.on('pointerout', function(){
		online.bPharaoh.anims.play('bpharaohAnim');
	})
	//accion al hacer click sobre el boton de eleccion de Pharaoh
	this.bPharaoh.on('pointerdown', function(){
		
	})
}