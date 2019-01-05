//crear escena lobby
var lobby = new Phaser.Scene('Lobby');

lobby.preload = function(){
	//carga de imagenes
	//titulo
	this.load.image('lobbytxt', 'Sprites/lobby.png');
	//botones
	this.load.image('backlob', 'Sprites/back.png');
	this.load.image('privado', 'Sprites/privado.png');
	this.load.image('aleatorio', 'Sprites/aleatorio.png');
	this.load.image('buscar', 'Sprites/buscar.png');
	//font
	this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
	this.load.spritesheet("input", "Sprites/manualInput380.png", {frameWidth: 380, frameHeight: 50});
	///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tilelob", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundlob", "background.json");
    //ANTORCHAS
    this.load.spritesheet("torchl","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
}

lobby.create = function(){
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"backgroundlob", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tilelob");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);

///////////////////////////////////CALCETINES///////////////////////////////////
	if(myUser.character == 2){
		onOut = false;
		sendRestart(onRestart, onOut);
	}

///////////////////////////////////ANTORCHAS///////////////////////////////////
	var torchesM = [];
	var torchesM2 = [];
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    for(var i = 0; i < 2; i++){
        torchesM.push(this.add.sprite(225 + 1400*i,250,'torchl'));
        torchesM2.push(this.add.sprite(225 + 1400*i,800,'torchl'));
    };
    //Animación de las antorchas
    this.anims.create({
        key: 'torchlAnim',
        frames: this.anims.generateFrameNumbers('torchl',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    //Ponemos las animaciones en bucle, de las cuatro creadas
    for(var i = 0; i<2;i++){
        torchesM[i].anims.play('torchlAnim');
        torchesM2[i].anims.play('torchlAnim');
    };


	///////////////////////titulo pantalla
	this.lobtxt = this.add.sprite(960, 200, 'lobbytxt');

	//////////////////////////////////ANIMACIONES///////////////////////////////////////
	this.anims.create({
	    key: 'manualInput',
	    frames: this.anims.generateFrameNumbers('input',{start: 0, end: 1}),
	    frameRate: 5,
	    repeat: -1
	})

//////////////////////////////////TEXTO CHAT///////////////////////////////////////
	//boolean que indica cuando esta escribiendo
    this.typing = false;
    //Input manual
    var w = 420;
    var h = 100;
    this.inputK = this.add.sprite(1100 + w/2, 450 + h/2, 'input').setInteractive({ cursor: 'url(Sprites/cursor4.png), pointer' });
    this.inputK.anims.play('manualInput');
    //inK.anims.play('manualInput');
    this.inputK.on('pointerdown', function(){
    	lobby.typing = true;
    	lobby.inputK.anims.stop();
    	lobby.inputK.setTexture('input', 0);
	})
	//accion al quitar el cursor del boton Salir
	this.inputK.on('pointerout', function(){
		lobby.typing = false;
		if(lobby.textEntry.text.length == 0){
			lobby.inputK.anims.play('manualInput');
		}
	})
	
    this.textEntry = this.add.dynamicBitmapText(1115, 485, 'font2', '', 32);
    //habilitar teclado para introducir texto
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.backSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBACK);

    this.input.keyboard.on('keydown', function (event) {
        if (event.keyCode === 8 && textEntry.text.length > 0 && lobby.typing)
        {
            lobby.textEntry.text = lobby.textEntry.text.substr(0, lobby.textEntry.text.length - 1);
        }
        else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90) && lobby.typing)
        {
        	lobby.textEntry.text += event.key;
        }
        else if(event.keyCode >= 186 && event.keyCode < 222 && lobby.typing)
        {
        	lobby.textEntry.text += event.key;
        }
    });


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
		lobby.scene.start(submenu);
	})
/////////////////////////////////BOTON LOBBY ALEATORIO//////////////////////
	//cargar boton Back
	this.bale = this.add.sprite(600, 600, 'aleatorio').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bale.scaleX -= 0.4;
	this.bale.scaleY -= 0.4;
	//hacer boton invisible
	this.bale.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.bale.on('pointerover', function(){
		lobby.bale.scaleX += 0.15;
		lobby.bale.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.bale.on('pointerout', function(){
		lobby.bale.scaleX -= 0.15;
		lobby.bale.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.bale.on('pointerdown', function(){
		//cambio de escena a menu
		
		
		getUserFromClient(myClient.id,function(user){
			createRLobby(user, function(id){
				if(id==0){
					console.log('Lobby error')
				}else{
					myLobby.setId(id)
					console.log(myLobby.getId())
					lobby.scene.start(characterSelection);
					lobby.scene.launch(chatOnline, characterSelection);
				}
				
			})
		})
		
	})
	
	
	//cargar boton Back
	this.bpriv = this.add.sprite(960, 800, 'privado').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bpriv.scaleX -= 0.4;
	this.bpriv.scaleY -= 0.4;
	//hacer boton invisible
	this.bpriv.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.bpriv.on('pointerover', function(){
		lobby.bpriv.scaleX += 0.15;
		lobby.bpriv.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.bpriv.on('pointerout', function(){
		lobby.bpriv.scaleX -= 0.15;
		lobby.bpriv.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.bpriv.on('pointerdown', function(){
		//cambio de escena a menu
		
		
		getUserFromClient(myClient.id,function(user){
			createPLobby(user, function(id){
				myLobby.setId(id)
				console.log(myLobby.getId())
			})
		})
		lobby.scene.start(characterSelection);
		lobby.scene.launch(chatOnline, characterSelection);
	})
	
	
	
/////////////////////////////////BOTON LOBBY BUSCAR USUARIO//////////////////////
	//cargar boton Back
	this.buser = this.add.sprite(1300, 600, 'buscar').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.buser.scaleX -= 0.4;
	this.buser.scaleY -= 0.4;
	//hacer boton invisible
	this.buser.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.buser.on('pointerover', function(){
		lobby.buser.scaleX += 0.15;
		lobby.buser.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.buser.on('pointerout', function(){
		lobby.buser.scaleX -= 0.15;
		lobby.buser.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.buser.on('pointerdown', function(){
		//cambio de escena a menu

		//implementar busqueda de usuario con API REST
		if(lobby.textEntry.text.length>0){
			
			getUserFromClient(myClient.id,function(user){
				findPrivLobby(lobby.textEntry.text,user, function(id){
					if(id===0){
						var textError = lobby.add.dynamicBitmapText(1115, 485, 'font2', 'Lobby privado no encontrado', 32);
						while(lobby.textEntry.text.length>0){
							lobby.textEntry.text = lobby.textEntry.text.substr(0,lobby.textEntry.text.length-1)
							
						}
						lobby.time.addEvent({
				            delay: 1000,
				            callback: function(){ textError.text = "";},
				            callbackScope: lobby
				        });
						console.log('Lobby NOT_FOUND')
					}else{
						myLobby.setId(id)
						while(lobby.textEntry.text.length>0){
							lobby.textEntry.text = lobby.textEntry.text.substr(0,lobby.textEntry.text.length-1)
							
						}
						console.log(myLobby.getId())
						lobby.scene.start(characterSelection);
						lobby.scene.launch(chatOnline, characterSelection);
					}
					
				})
			})
			
			
		}
	})
}

lobby.update = function(){

}