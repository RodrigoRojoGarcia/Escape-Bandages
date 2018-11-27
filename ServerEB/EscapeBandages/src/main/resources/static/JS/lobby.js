//crear escena lobby
var lobby = new Phaser.Scene('Lobby');

lobby.preload = function(){
	//carga de imagenes
	//titulo
	this.load.image('lobbytxt', 'Sprites/lobby.png');
	//botones
	this.load.image('backlob', 'Sprites/back.png');
	this.load.image('aleatorio', 'Sprites/aleatorio.png');
	this.load.image('buscar', 'Sprites/buscar.png');
	///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tilelob", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundlob", "background.json");
    //ANTORCHAS
    this.load.spritesheet("torchl","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
}

lobby.create = function(){
	myUser.setScene(this)
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"backgroundlob", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tilelob");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);

///////////////////////////////////ANTORCHAS///////////////////////////////////
	var torchesM = [];
	var torchesM2 = [];
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    for(var i = 0; i < 2; i++){
        torchesM.push(this.add.sprite(225 + 1400*i,250,'torchl'));
        torchesM2.push(this.add.sprite(225 + 1400*i,800,'torchl'));
    };
    //Animación de las antorchas
    this.anims.create({
        key: 'torchlAnim',
        frames: this.anims.generateFrameNumbers('torchl',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    //Ponemos las animaciones en bucle, de las cuatro creadas
    for(var i = 0; i<2;i++){
        torchesM[i].anims.play('torchlAnim');
        torchesM2[i].anims.play('torchlAnim');
    };


	//titulo pantalla
	this.lobtxt = this.add.sprite(960, 200, 'lobbytxt');


/////////////////////////////////BOTONES///////////////////////////////////////
////////////////////////////////BOTON VOLVER//////////////////////////////////
	//cargar boton Back
	this.bback = this.add.sprite(300, 950, 'back').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bback.scaleX -= 0.4;
	this.bback.scaleY -= 0.4;
	//hacer boton invisible
	this.bback.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.bback.on('pointerover', function(){
		lobby.bback.scaleX += 0.15;
		lobby.bback.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.bback.on('pointerout', function(){
		lobby.bback.scaleX -= 0.15;
		lobby.bback.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.bback.on('pointerdown', function(){
		//cambio de escena a menu
		myUser.setScene(submenu)
		lobby.scene.switch(submenu);
	})
/////////////////////////////////BOTON LOBBY ALEATORIO//////////////////////
	//cargar boton Back
	this.bale = this.add.sprite(600, 550, 'aleatorio').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bale.scaleX -= 0.4;
	this.bale.scaleY -= 0.4;
	//hacer boton invisible
	this.bale.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.bale.on('pointerover', function(){
		lobby.bale.scaleX += 0.15;
		lobby.bale.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.bale.on('pointerout', function(){
		lobby.bale.scaleX -= 0.15;
		lobby.bale.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.bale.on('pointerdown', function(){
		//cambio de escena a menu
		myUser.setScene(characterSelection)
		lobby.scene.switch(characterSelection);
		lobby.scene.launch(chatOnline, characterSelection);
	})
/////////////////////////////////BOTON LOBBY BUSCAR USUARIO//////////////////////
	//cargar boton Back
	this.buser = this.add.sprite(1300, 550, 'buscar').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.buser.scaleX -= 0.4;
	this.buser.scaleY -= 0.4;
	//hacer boton invisible
	this.buser.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.buser.on('pointerover', function(){
		lobby.buser.scaleX += 0.15;
		lobby.buser.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.buser.on('pointerout', function(){
		lobby.buser.scaleX -= 0.15;
		lobby.buser.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.buser.on('pointerdown', function(){
		//cambio de escena a menu
		myUser.setScene(characterSelection)
		lobby.scene.switch(characterSelection);
		lobby.scene.launch(chatOnline, characterSelection);
	})
}

lobby.update = function(){

}