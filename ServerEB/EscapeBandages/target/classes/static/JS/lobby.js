//crear escena lobby
var lobby = new Phaser.Scene('Lobby');

lobby.preload = function(){
	//carga de imagenes
	//titulo
	this.load.image('lobbytxt', 'Sprites/lobby.png');
	//boton
	this.load.image('backlob', 'Sprites/back.png');
	///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tilelob", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundlob", "background.json");
}

lobby.create = function(){
	myUser.setScene(this)
	//titulo pantalla
	this.lobtxt = this.add.sprite(560, 500, 'lobbytxt');
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"backgroundlob", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tilelob");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);


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
}

lobby.update = function(){

}