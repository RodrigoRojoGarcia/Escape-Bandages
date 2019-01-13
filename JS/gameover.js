//creacion escena Gameover
var gameover = new Phaser.Scene('Gameover');

gameover.preload = function(){
	
}

gameover.create = function(){

///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
	//Puntero Default
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
    //TILEMAP
	const backg = this.make.tilemap({key:"background", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tile");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);

	//carga letras Gameover
	this.go = this.add.sprite(960, 400, 'gameoveri');
	this.go.scaleX += 0.3;
	this.go.scaleY += 0.3;

//////////////////////CALCETINES DE ESTA ESCENA//////////////////
	

//////////////////////BOTON REINICIAR///////////////////////////
	//cargar boton Reiniciar

	this.brei = new UIButton(this, 960, 800, 'restart', function(){
		gameover.scene.start(offline);
		gameover.scene.launch(heart, offline);
	}, function(){
		gameover.brei.amplifyScale(0.15, 0.15)
	}, function(){
		gameover.brei.reduceScale(0.15, 0.15)
	})
	this.brei.reduceScale(0.2, 0.2)
	this.brei.show()

//////////////////////BOTON SALIR///////////////////////////////
	//cargar boton Salir

	this.bout = new UIButton(960, 950, 'exit', function(){
		gameover.scene.start(menu);
	}, function(){
		gameover.bout.amplifyScale(0.15, 0.15)
	}, function(){
		gameover.bout.reduceScale(0.15, 0.15)
	})
	this.bout.reduceScale(0.3, 0.3)
	this.bout.show()
}

gameover.update = function(){
	
	
}