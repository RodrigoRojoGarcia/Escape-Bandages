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


    //letras select level
    var selectlv = this.add.sprite(960, 240, 'levels');

////////////////////////BOTONES//////////////////////////////////
/////////////////////BOTONES LEVELS//////////////////////////////
	//level 1
	this.blv1 =  new UIButton(this, 750, 550, 'lv1', function(){
		//cambio de escena al juego offline
		submenu.scene.start(offline);
		submenu.scene.launch(heart, offline);
	}, function(){
		submenu.blv1.amplifyScale(0.15, 0.15)
	}, function(){
		submenu.blv1.reduceScale(0.15, 0.15)
	})
	this.blv1.show();
	//level 2
	this.blv2 =  new UIButton(this, 1150, 550, 'lv2', function(){
		//cambio de escena al juego offline2
		submenu.scene.start(level2);
		submenu.scene.launch(heart, level2);
	}, function(){
		submenu.blv2.amplifyScale(0.15, 0.15)
	}, function(){
		submenu.blv2.reduceScale(0.15, 0.15)
	})
	this.blv2.show();

//////////////////////BOTON CONTROLES////////////////////////////////
	this.bcon = new UIButton(this, 1500, 950, 'controls', function(){
		submenu.scene.start(controls)
	}, function(){
		submenu.bcon.amplifyScale(0.15, 0.15)
	}, function(){
		submenu.bcon.reduceScale(0.15, 0.15)
	})
	this.bcon.show();
	this.bcon.reduceScale(0.4, 0.4);
	
//////////////////////BOTON BACK////////////////////////////////
	this.bback = new UIButton(this, 300, 950, 'back1', function(){
		submenu.scene.start(menu)
	}, function(){
		submenu.bback.amplifyScale(0.15, 0.15)
	}, function(){
		submenu.bback.reduceScale(0.15, 0.15)
	})
	this.bback.show();
	this.bback.reduceScale(0.4, 0.4);
}