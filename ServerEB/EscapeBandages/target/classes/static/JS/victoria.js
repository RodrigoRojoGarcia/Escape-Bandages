var victoria = new Phaser.Scene('Victoria');

victoria.preload = function(){


   
}

victoria.create = function(){
	myClient.setScene(this);

	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//background
	var bgV = this.add.image(0, 0, 'bgmenu').setOrigin(0);
	//letras victoria
	var vic = this.add.sprite(960, 540, 'victoria');

////////////////////Victoria Mummy//////////////////////////////////
	var mumV = this.add.sprite(1300, 400,'Mummy');
	//Animación salto victoria
    
    mumV.anims.play('mvAnim');

////////////////////Victoria Pharaoh//////////////////////////////////
	var pV = this.add.sprite(640, 400,'Pharaoh');
	//Animación salto victoria
    
    pV.anims.play('pvAnim');

//////////////////////BOTON REINICIAR///////////////////////////
	//cargar boton Reiniciar
	this.brei = this.add.sprite(960, 800, 'reinicio').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.brei.scaleX -= 0.2;
	this.brei.scaleY -= 0.2;
	//hacer boton visible
	this.brei.setAlpha(1);
	//accion al poner el cursor sobre el boton Reiniciar
	this.brei.on('pointerover', function(){
		victoria.brei.scaleX += 0.15;
		victoria.brei.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Reiniciar
	this.brei.on('pointerout', function(){
		victoria.brei.scaleX -= 0.15;
		victoria.brei.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Reiniciar
	this.brei.on('pointerdown', function(){
		if(gameState == 1){
			victoria.scene.stop(victoria)
			victoria.scene.start(offline);
			victoria.scene.launch(heart, offline);
		}else if(gameState == 2){
			
			onRestart = true;
		}
	})
/////////////////BOTON VOLVER//////////////////
	//cargar boton Volver
	this.binit = this.add.sprite(960, 950, 'back').setInteractive();
	this.binit.scaleX -= 0.4;
	this.binit.scaleY -= 0.4;
	//hacer boton invisible
	this.binit.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.binit.on('pointerover', function(){
		victoria.binit.scaleX += 0.15;
		victoria.binit.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.binit.on('pointerout', function(){
		victoria.binit.scaleX -= 0.15;
		victoria.binit.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.binit.on('pointerdown', function(){
		//cambio de escena a menu
		if(gameState == 1){
			victoria.scene.stop(victoria)
			victoria.scene.start(submenu);
		}
		else if(gameState == 2){
			onOut = true;
		}
		gameState = 0;
		
		
	})
}

victoria.update = function(){
	if(onRestart){
		if(myUser.character == 1){
			sendRestart(onRestart, onOut);
		}else if(myUser.character == 2){
			sendRestart2(onRestart, onOut)
		}
		victoria.scene.stop(victoria)
		victoria.scene.start(onlineG);
		victoria.scene.launch(heart, onlineG);
		
	}
	if(onOut){
		if(myUser.character == 1){
			sendRestart(onRestart, onOut);
		}else if(myUser.character == 2){
			sendRestart2(onRestart, onOut)
		}
		returnToLobby(myLobby.getId(), function(id){
			victoria.scene.stop(victoria)
			victoria.scene.start(characterSelection);
			
		})
		
		
	}
}