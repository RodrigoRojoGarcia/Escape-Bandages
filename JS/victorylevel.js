var victorylevel = new Phaser.Scene('Victory Level');

victorylevel.preload = function(){
}

victorylevel.create = function(){
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


	//letras victoria nivel
	var viclev = this.add.sprite(960, 540, 'victorylevel');

////////////////////Victoria Mummy//////////////////////////////////
	var mumV = this.add.sprite(1300, 400,'Mummy');
    mumV.anims.play('jumpRightMCicle');
////////////////////Victoria Pharaoh//////////////////////////////////
	var pV = this.add.sprite(640, 400,'Pharaoh');
    pV.anims.play('jumpRightPCicle');


//////////////////////BOTON NEXT///////////////////////////
	//cargar boton
	this.bnext = new UIButton(this, 960, 800, 'next', function(){
		victorylevel.scene.start(level2);
		victorylevel.scene.launch(heart, level2);
	}, function(){
		victorylevel.bnext.amplifyScale(0.15, 0.15)
	}, function(){
		victorylevel.bnext.reduceScale(0.15, 0.15)
	})
	this.bnext.reduceScale(0.2,0.2)
	this.bnext.show()

/////////////////BOTON SALIR//////////////////
	//cargar boton
	this.binit = new UIButton(this, 960, 950, 'exit', function(){
		victorylevel.scene.start(submenu);
	}, function(){
		victorylevel.binit.amplifyScale(0.15, 0.15)
	}, function(){
		victorylevel.binit.reduceScale(0.15, 0.15)
	})
	this.binit.reduceScale(0.4,0.4);
	this.binit.show();
}

victorylevel.update = function(){
}