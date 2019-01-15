var submenu = new Phaser.Scene('Submenu');

submenu.preload = function(){
	
}

submenu.create = function(){
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');

	myClient.setScene(this);
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
	//accion al poner el cursor sobre el boton Online
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
		submenu.scene.stop(submenu)
		submenu.scene.start(online);
	})

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
		gameState = 1;
		submenu.scene.stop(submenu)
		submenu.scene.start(offline);
		submenu.scene.launch(heart, offline);
	})

//////////////////////BOTON BACK////////////////////////////////
	//cargar boton Back
	this.bback = this.add.sprite(300, 950, 'back').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
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
		submenu.scene.stop(submenu)
		submenu.scene.start(menu);
	})
}