var controls = new Phaser.Scene('Controls');

controls.preload = function(){
}

controls.create = function(){
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



////////////////////Victoria Mummy//////////////////////////////////
	var mumV = this.add.sprite(640, 300,'Mummy');

	//letras wasd
	var lwasd = this.add.sprite(1040, 300, 'wasd');
	//letras space
	var lspace = this.add.sprite(1340, 300, 'space');

////////////////////Victoria Pharaoh//////////////////////////////////
	var pV = this.add.sprite(640, 600,'Pharaoh');

	//flechas
	var lflechas = this.add.sprite(1040, 600, 'flechas');
	//flecha
	var lflecha = this.add.sprite(1340, 600, 'flecha');


//////////////////////BOTON BACK////////////////////////////////
	this.bback = new UIButton(this, 300, 950, 'back1', function(){
		controls.scene.start(menu)
	}, function(){
		controls.bback.amplifyScale(0.15, 0.15)
	}, function(){
		controls.bback.reduceScale(0.15, 0.15)
	})
	this.bback.show();
	this.bback.reduceScale(0.4, 0.4);
}

controls.update = function(){
}