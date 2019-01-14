var submenu = new Phaser.Scene('Submenu');

submenu.preload = function(){
	
}

submenu.create = function(){
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"background", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tile");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);


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
/////////////////////BOTON OFFLINE//////////////////////////////
	this.boff =  new UIButton(this, 950, 550, 'off', function(){
		//cambio de escena al juego offline
		submenu.scene.start(vlevel);
		//submenu.scene.launch(heart, offline);
	}, function(){
		submenu.boff.amplifyScale(0.15, 0.15)
	}, function(){
		submenu.boff.reduceScale(0.15, 0.15)
	})
	this.boff.show()

	
//////////////////////BOTON BACK////////////////////////////////

	this.bback = new UIButton(this, 300, 950, 'back1', function(){
		submenu.scene.start(menu)
	}, function(){
		submenu.bback.amplifyScale(0.15, 0.15)
	}, function(){
		submenu.bback.reduceScale(0.15, 0.15)
	})
	this.bback.show()
	this.bback.reduceScale(0.4, 0.4)
}