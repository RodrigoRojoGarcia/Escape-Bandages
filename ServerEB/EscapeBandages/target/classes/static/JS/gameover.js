//creacion escena Gameover
var gameover = new Phaser.Scene('Gameover');

gameover.preload = function(){
	//carga imagenes

	//reiniciar


	///////////////////////////////////MAPA///////////////////////////////////
    
}

gameover.create = function(){
	myClient.setScene(this);
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
	this.brei = this.add.sprite(960, 800, 'reinicio').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.brei.scaleX -= 0.2;
	this.brei.scaleY -= 0.2;
	//hacer boton visible
	this.brei.setAlpha(1);
	//accion al poner el cursor sobre el boton Reiniciar
	this.brei.on('pointerover', function(){
		gameover.brei.scaleX += 0.15;
		gameover.brei.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Reiniciar
	this.brei.on('pointerout', function(){
		gameover.brei.scaleX -= 0.15;
		gameover.brei.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Reiniciar
	this.brei.on('pointerdown', function(){
		if(gameState == 1){
			gameover.scene.start(offline);
			gameover.scene.launch(heart, offline);
			gameover.scene.stop(gameover)
		}else if(gameState == 2){
			
			onRestart = true;
		}
	})


//////////////////////BOTON SALIR///////////////////////////////
	//cargar boton Salir
	this.bout = this.add.sprite(960, 950, 'out').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bout.scaleX -= 0.3;
	this.bout.scaleY -= 0.3;
	//hacer boton visible
	this.bout.setAlpha(1);
	//accion al poner el cursor sobre el boton Salir
	this.bout.on('pointerover', function(){
		gameover.bout.scaleX += 0.15;
		gameover.bout.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.bout.on('pointerout', function(){
		gameover.bout.scaleX -= 0.15;
		gameover.bout.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.bout.on('pointerdown', function(){
		if(gameState == 1){
			gameState = 0;
			gameover.scene.start(menu);
			gameover.scene.stop(gameover)
		}else if(gameState == 2){
			gameState = 0;
			
			onOut = true;
			
		}
		
	})
}

gameover.update = function(){
	
	if(onRestart){
		if(myUser.character == 1){
			sendRestart(onRestart, onOut);
		}else if(myUser.character == 2){
			sendRestart2(onRestart, onOut);
		}
		gameover.scene.stop(gameover)
		gameover.scene.start(onlineG);
		gameover.scene.launch(heart, onlineG);
		
	}
	if(onOut){
		if(myUser.character == 1){
			sendRestart(onRestart, onOut);
		}else if(myUser.character == 2){
			sendRestart2(onRestart, onOut);
		}
		returnToLobby(myLobby.getId(), function(id){
			gameover.scene.stop(gameover)
			gameover.scene.start(characterSelection);
			
		
		})
		
	}
}