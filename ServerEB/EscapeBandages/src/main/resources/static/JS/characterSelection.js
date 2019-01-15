var characterSelection = new Phaser.Scene('characterSelection');

characterSelection.preload = function(){
	//cargar imagenes
	//letras seleccionar personaje

    
    

}


characterSelection.create = function(){
	myClient.setScene(this);

	this.onStart = false;
	this.overMummy = false;
	this.overPharaoh = false;
	this.once = 0;
	this.mummySelected = false;
	this.pharaohSelected = false;
	this.goOn = setInterval(characterSelection.usersReady, 1000);
	
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
///////////////////////////////////SPRITES////////////////////////////////////////
	this.spritesPharaoh = 'boton_pharaoh';
	this.spritesMummy = 'boton_mummy';


//////////////////////////////////CALCETINES//////////////////////////////////////
	onOut = false;
	if(myUser.character == 1){
		sendRestart(onRestart, onOut);
	}	
	else if(myUser.character == 2){
		sendRestart2(onRestart, onOut);
	}
	
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
    
	//botones unable
	this.uMummy = this.add.image(600, 550, 'unableMummy');
	this.uPharaoh = this.add.image(1300, 550, 'unablePharaoh');

    this.selecc = this.add.image(950,200,'select');
    
    this.ready = this.add.image(950,500,'ready').setInteractive();
    this.ready.setAlpha(0);
    
    
    this.usuarios = this.add.dynamicBitmapText(830, 50, 'font2', 'Usuarios conectados:', 32);
    this.user1 = this.add.dynamicBitmapText(1110, 50, 'font2', myUser.getUserName(), 32);
    this.user2 = this.add.dynamicBitmapText(1110, 100, 'font2', '', 32);
    
    
    this.chosenMummy = this.add.dynamicBitmapText(410, 760, 'font2', '', 32);
    this.chosenPharaoh = this.add.dynamicBitmapText(1110, 760, 'font2', '', 32);
    
//////////////////////////BOTONES///////////////////////////////////
	//////////////////////BOTON VOLVER///////////////////////////////
	//cargar boton Salir
    
    this.bback = new UIButton(this, 300, 950, 'back', function(){
    	removeUserFromLobby(myLobby.getId(), myUser.getUserName());
		myLobby.setId(0);
		myUser.character = 0;
		characterSelection.scene.stop(characterSelection)
		characterSelection.scene.start(lobby);
		characterSelection.scene.stop(chatOnline);
		clearInterval(characterSelection.goOn);
		
    }, function(){
    	characterSelection.bback.amplifyScale(0.15, 0.15);
    }, function(){
    	characterSelection.bback.reduceScale(0.15, 0.15);
    })
    this.bback.reduceScale(0.4, 0.4)
    this.bback.show();
    
	
	

	//////////////////////BOTON ELLECCION MOMIA///////////////////////////////
	//cargar boton eleccion Mummy
    
    this.bMummy = new UIButton(this, 600, 550, this.spritesMummy, function(){
		if(characterSelection.mummySelected){
			setCharacter(myLobby.getId(), myUser.getUserName(), "uwu", function(userName){
				if(userName == ""){
					characterSelection.bcheck.hide();
					characterSelection.ready.setAlpha(0);
					characterSelection.mummySelected = false;
					myUser.character = 0;
				}
			})
		}else{
			setCharacter(myLobby.getId(),myUser.getUserName(),"mummy", function(userName){
				if(userName != ""){
					characterSelection.bcheck.show();
					characterSelection.ready.setAlpha(1);
					characterSelection.mummySelected = true
					characterSelection.pharaohSelected = false
					myUser.character = 1;
				}
				
			})
		}
		
    }, function(){
    	characterSelection.bMummy.amplifyScale(0.05, 0.05)
    	characterSelection.overMummy = true;
    }, function(){
    	characterSelection.bMummy.reduceScale(0.05, 0.05);
		characterSelection.overMummy = false;
    })
    this.bMummy.show();
    
  
	/////////////////////BOTON ELLECCION PHARAOH///////////////////////////////
    
    this.bPharaoh = new UIButton(this, 1300, 550, this.spritesPharaoh, function(){
		if(characterSelection.pharaohSelected){
			setCharacter(myLobby.getId(), myUser.getUserName(), "uwu", function(userName){
				if(userName == ""){
					characterSelection.bcheck.hide();
					characterSelection.ready.setAlpha(0);
					characterSelection.pharaohSelected = false;
					myUser.character = 0;
				}
			})
		}else{
			setCharacter(myLobby.getId(),myUser.getUserName(),"pharaoh",function(userName){
				if(userName != ""){
					characterSelection.bcheck.show();
					characterSelection.ready.setAlpha(1);
					characterSelection.mummySelected = false
					characterSelection.pharaohSelected = true
					myUser.character = 2;
				}
				
			})
		}
		
    }, function(){
    	characterSelection.bPharaoh.amplifyScale(0.05, 0.05)
		characterSelection.overPharaoh = true;
    }, function(){
		characterSelection.bPharaoh.reduceScale(0.05, 0.05)
		characterSelection.overPharaoh = false;
    })
    
    this.bPharaoh.show()

//////////////////////////////////BOTON CHECK////////////////////////////
	this.bcheck = new UIButton(this, 950, 600, 'nocheck', function(){
		myUser.setReady(true)
		setReady(myLobby.getId(), myUser.getUserName(), true)
		characterSelection.incheck.show();
	}, function(){
		characterSelection.bcheck.amplifyScale(0.03, 0.03);
	}, function(){
		characterSelection.bcheck.reduceScale(0.03, 0.03);
	})
    this.bcheck.hide()
    
    
    this.incheck = new UIButton(this, 950, 600, 'check',function(){
    	setReady(myLobby.getId(), myUser.getUserName(), false)
		myUser.setReady(false)
		characterSelection.incheck.hide();
    }, function(){
    	characterSelection.incheck.amplifyScale(0.03, 0.03);
    }, function(){
    	characterSelection.incheck.reduceScale(0.03, 0.03);
    })
    this.incheck.hide()
	
    
}
characterSelection.usersReady = function(){
		bothReady(myLobby.getId(),function(both){
			if(!characterSelection.onStart){
				if(both){
					gameState = 2;
					characterSelection.scene.stop(characterSelection)
                    characterSelection.scene.start(onlineG);
                    onlineG.scene.launch(heart, onlineG);
                    characterSelection.onStart = true;
					clearInterval(characterSelection.goOn);
				}
			}
			
			
		})
		getUserNameMummy(myLobby.getId(), function(userName){
			if(userName != myUser.getUserName() && userName != ""){
				characterSelection.bMummy.butt.setAlpha(0);
				characterSelection.uMummy.setAlpha(1);
			}
			else{
				characterSelection.bMummy.butt.setAlpha(1);
				characterSelection.uMummy.setAlpha(0);
			}
			characterSelection.chosenMummy.text = userName;
		})
		otherUser(myLobby.getId(), myUser.getUserName(), function(userName){
			characterSelection.user2.text = userName;
		})
		getUserNamePharaoh(myLobby.getId(), function(userName){
			if(userName != myUser.getUserName() && userName != ""){
				characterSelection.bPharaoh.butt.setAlpha(0);
				characterSelection.uPharaoh.setAlpha(1);
			}
			else{
				characterSelection.bPharaoh.butt.setAlpha(1);
				characterSelection.uPharaoh.setAlpha(0);
			}
			characterSelection.chosenPharaoh.text = userName;
		})
	}
characterSelection.update = function(){
	//borrar intervalos en desconexion
	if(disconnected){
		clearInterval(characterSelection.goOn);
	}

	if(this.mummySelected){
		this.spritesMummy = 'boton_mummySelected';
		if(this.overMummy){
			this.bMummy.butt.setTexture(this.spritesMummy, 1);
		}else{
			this.bMummy.butt.setTexture(this.spritesMummy, 0);
		}
		
	}else{
		this.spritesMummy = 'boton_mummy';
		if(this.overMummy){
			this.bMummy.butt.setTexture(this.spritesMummy, 1);
		}else{
			this.bMummy.butt.setTexture(this.spritesMummy, 0);
		}
		
	}
	if(this.pharaohSelected){
		this.spritesPharaoh = 'boton_pharaohSelected';
		if(this.overPharaoh){
			this.bPharaoh.butt.setTexture(this.spritesPharaoh, 1);
		}else{
			this.bPharaoh.butt.setTexture(this.spritesPharaoh, 0);
		}
		
	}else{
		this.spritesPharaoh = 'boton_pharaoh';
		if(this.overPharaoh){
			this.bPharaoh.butt.setTexture(this.spritesPharaoh, 1);
		}else{
			this.bPharaoh.butt.setTexture(this.spritesPharaoh, 0);
		}
		
	}
	
	
}