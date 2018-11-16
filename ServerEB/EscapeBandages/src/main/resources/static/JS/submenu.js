var submenu = new Phaser.Scene('Submenu');

submenu.preload = function(){
	//carga imagenes
	this.load.image('off', 'Sprites/offline.png');
	this.load.image('on', 'Sprites/online.png');
	this.load.image('back', 'Sprites/back.png');
	///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tile", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("background", "background.json");
    //ANTORCHAS
    this.load.spritesheet("torch","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
}

submenu.create = function(){
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"background", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tile");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);

///////////////////////////////////ANTORCHAS///////////////////////////////////
	var torchesM = [];
	var torchesM2 = [];
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    for(var i = 0; i < 2; i++){
        torchesM.push(this.add.sprite(225 + 1400*i,250,'torch'));
        torchesM2.push(this.add.sprite(225 + 1400*i,800,'torch'));
    };
    //Animación de las antorchas
    this.anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torch',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    //Ponemos las animaciones en bucle, de las cuatro creadas
    for(var i = 0; i<2;i++){
        torchesM[i].anims.play('torchAnim');
        torchesM2[i].anims.play('torchAnim');
    };


////////////////////////BOTONES//////////////////////////////////
/////////////////////BOTON ONLINE//////////////////////////////
	//cargar boton Online
	this.bon = this.add.sprite(650, 550, 'on').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	//hacer boton invisible
	this.bon.setAlpha(1);
	/*//accion al poner el cursor sobre el boton Online
	this.bon.on('pointerover', function(){
		submenu.bon.scaleX += 0.15;
		submenu.bon.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Online
	this.bon.on('pointerout', function(){
		submenu.bon.scaleX -= 0.15;
		submenu.bon.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Online
	this.bon.on('pointerdown', function(){

	})*/

/////////////////////BOTON OFFLINE//////////////////////////////
	//cargar boton Offline
	this.boff = this.add.sprite(1200, 550, 'off').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	//hacer boton invisible
	this.boff.setAlpha(1);
	//accion al poner el cursor sobre el boton Offline
	this.boff.on('pointerover', function(){
		submenu.boff.scaleX += 0.15;
		submenu.boff.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Offline
	this.boff.on('pointerout', function(){
		submenu.boff.scaleX -= 0.15;
		submenu.boff.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Offline
	this.boff.on('pointerdown', function(){
		//cambio de escena al juego offline
		submenu.scene.switch(offline);
	})

//////////////////////BOTON BACK////////////////////////////////
	//cargar boton Back
	this.bback = this.add.sprite(1700, 955, 'back').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bback.scaleX -= 0.4;
	this.bback.scaleY -= 0.4;
	//hacer boton invisible
	this.bback.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.bback.on('pointerover', function(){
		submenu.bback.scaleX += 0.15;
		submenu.bback.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.bback.on('pointerout', function(){
		submenu.bback.scaleX -= 0.15;
		submenu.bback.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.bback.on('pointerdown', function(){
		//cambio de escena a menu
		submenu.scene.switch(menu);
	})
}