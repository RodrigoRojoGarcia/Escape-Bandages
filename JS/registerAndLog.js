//crear escena online
var online = new Phaser.Scene('Online');

online.preload = function(){
	//cargar imagenes
	//volver
	this.load.image('backO','Sprites/back.png');
	//ANTORCHAS
    this.load.spritesheet("torchO","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
    //boton login
    this.load.image('login', 'Sprites/login.png');
  //boton registrar
    this.load.image('register', 'Sprites/register.png');
    //insertamos font externa
    this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');
///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tileO", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundO", "background.json");
    //Input
    this.load.spritesheet("input", "Sprites/manualInput.png", {frameWidth: 420, frameHeight: 50});
}

online.create = function(){
	myClient.setScene(this);
	
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');

	///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"backgroundO", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tileO");
    //Extraemos las capas del TILEMAP
    const bg = backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);

	///////////////////////////////////ANTORCHAS///////////////////////////////////
	var torchesM = [];
	var torchesM2 = [];
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    for(var i = 0; i < 2; i++){
        torchesM.push(this.add.sprite(225 + 1400*i,250,'torchO'));
        torchesM2.push(this.add.sprite(225 + 1400*i,800,'torchO'));
    };
    //Animación de las antorchas
    this.anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torchO',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    //Animación del input
    this.anims.create({
    	key: 'manualInput',
    	frames: this.anims.generateFrameNumbers('input',{start: 0, end: 1}),
    	frameRate: 5,
    	repeat: -1
    })
    //Ponemos las animaciones en bucle, de las cuatro creadas
    for(var i = 0; i<2;i++){
        torchesM[i].anims.play('torchAnim');
        torchesM2[i].anims.play('torchAnim');
    };
    
    //texto para indicar que elija nombre
    //this.add.text(800,350,'Elija nombre de usuario:',{font: '32px Power Clear', fill:'#ffffff'})
    this.add.dynamicBitmapText(1300, 400, 'font1', 'Nombre de Usuario:', 32);
    this.add.dynamicBitmapText(1300, 550, 'font1', 'Contrasena:', 32);
    
    this.add.dynamicBitmapText(295, 400, 'font1', 'Nombre de Usuario:', 32);
    this.add.dynamicBitmapText(295, 550, 'font1', 'Contrasena:', 32);
    //introducir por teclado el nombre
    //var textEntry = this.add.text(800,450,'',{font: '32px Power Clear',fill: '#ffffff'})
    
    //boolean que indica cuando esta escribiendo
    this.typing1 = false;
    this.typing2 = false;
    
    this.typing3 = false;
    this.typing4 = false;
    //Input manual
    var w = 420;
    var h = 100;
    
    this.inputK = this.add.sprite(1235 + w/2, 415 + h/2, 'input').setInteractive({ cursor: 'url(Sprites/cursor4.png), pointer' });
    this.inputK2 = this.add.sprite(1235 + w/2, 565 + h/2, 'input').setInteractive({ cursor: 'url(Sprites/cursor4.png), pointer' });
    
    this.inputK3 = this.add.sprite(230 + w/2, 415 + h/2, 'input').setInteractive({ cursor: 'url(Sprites/cursor4.png), pointer' });
    this.inputK4 = this.add.sprite(230 + w/2, 565 + h/2, 'input').setInteractive({ cursor: 'url(Sprites/cursor4.png), pointer' });
    
    this.inputK.anims.play('manualInput');
    this.inputK2.anims.play('manualInput');
    
    this.inputK3.anims.play('manualInput');
    this.inputK4.anims.play('manualInput');
    //inK.anims.play('manualInput');
    
    this.inputK.on('pointerdown', function(){
    	online.typing1 = true;
    	online.inputK.anims.stop();
    	online.inputK.setTexture('input', 0);
	})
	//accion al quitar el cursor del boton Salir
	this.inputK.on('pointerout', function(){
		online.typing1 = false;
		if(textEntry.text.length == 0){
			online.inputK.anims.play('manualInput');
		}
	})
	//input2
	this.inputK2.on('pointerdown', function(){
    	online.typing2 = true;
    	online.inputK2.anims.stop();
    	online.inputK2.setTexture('input', 0);
	})
	//accion al quitar el cursor del boton Salir
	this.inputK2.on('pointerout', function(){
		online.typing2 = false;
		if(textEntry2nd.text.length == 0){
			online.inputK.anims.play('manualInput');
		}
	})
	//input3
	this.inputK3.on('pointerdown', function(){
    	online.typing3 = true;
    	online.inputK3.anims.stop();
    	online.inputK3.setTexture('input', 0);
	})
	//accion al quitar el cursor del boton Salir
	this.inputK3.on('pointerout', function(){
		online.typing3 = false;
		if(textEntry3rd.text.length == 0){
			online.inputK3.anims.play('manualInput');
		}
	})
	//input4
	this.inputK4.on('pointerdown', function(){
    	online.typing4 = true;
    	online.inputK4.anims.stop();
    	online.inputK4.setTexture('input', 0);
	})
	//accion al quitar el cursor del boton Salir
	this.inputK4.on('pointerout', function(){
		online.typing4 = false;
		if(textEntry4th.text.length == 0){
			online.inputK4.anims.play('manualInput');
		}
	})
	
    var textEntry = this.add.dynamicBitmapText(1250, 450, 'font1', '', 32);
    var textEntry2nd = this.add.dynamicBitmapText(1250, 600, 'font1', '', 32);
    var passLogin = "";
    
    var textEntry3rd = this.add.dynamicBitmapText(245, 450, 'font1', '', 32);
    var textEntry4th = this.add.dynamicBitmapText(245, 600, 'font1', '', 32);
    var passRegister = "";
    
    //habilitar teclado para introducir texto
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.backSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBACK);
    this.input.keyboard.on('keydown', function(event){
    	if(event.keyCode === 8 && textEntry.text.length>0 && online.typing1){
    		textEntry.text = textEntry.text.substr(0,textEntry.text.length-1)
    		
    	}else if(event.keyCode === 8 && textEntry2nd.text.length>0 && online.typing2){
    		textEntry2nd.text = textEntry2nd.text.substr(0,textEntry2nd.text.length-1)
    		passLogin = passLogin.slice(0, -1);
    	
    	}else if(event.keyCode === 8 && textEntry3rd.text.length>0 && online.typing3){
    		textEntry3rd.text = textEntry3rd.text.substr(0,textEntry3rd.text.length-1)
    	
    	}else if(event.keyCode === 8 && textEntry4th.text.length>0 && online.typing4){
    		textEntry4th.text = textEntry4th.text.substr(0,textEntry4th.text.length-1)
    		passRegister = passRegister.slice(0, -1);
    	}
    	else if(event.keyCode == 32 || (event.keyCode >=48 && event.keyCode <90) && online.typing1){
    		textEntry.text += event.key
    	}
    	else if(event.keyCode == 32 || (event.keyCode >=48 && event.keyCode <90) && online.typing2){
    		passLogin += event.key
    		textEntry2nd.text += '*'
    		
    	}
    	else if(event.keyCode == 32 || (event.keyCode >=48 && event.keyCode <90) && online.typing3){
    		textEntry3rd.text += event.key
    	}
    	else if(event.keyCode == 32 || (event.keyCode >=48 && event.keyCode <90) && online.typing4){
    		passRegister += event.key
    		textEntry4th.text += '*'
    		
    	}
    })


//////////////////////////BOTONES///////////////////////////////////
	//////////////////////BOTON VOLVER///////////////////////////////
	//cargar boton Salir
	this.bback = this.add.sprite(300, 950, 'backO').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bback.scaleX -= 0.4;
	this.bback.scaleY -= 0.4;
	//hacer boton visible
	this.bback.setAlpha(1);
	//accion al poner el cursor sobre el boton Salir
	this.bback.on('pointerover', function(){
		online.bback.scaleX += 0.15;
		online.bback.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.bback.on('pointerout', function(){
		online.bback.scaleX -= 0.15;
		online.bback.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.bback.on('pointerdown', function(){
		//cambio escena a submenu
		
		online.scene.start(submenu);
	})

	////////////////////BOTON LOGIN////////////////////////////////////
	this.introUser = this.add.sprite(1450, 750, 'login').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.introUser.scaleX -= 0.4;
	this.introUser.scaleY -= 0.4;
	//hacer boton visible
	this.introUser.setAlpha(1);
	//accion al poner el cursor sobre el boton
	this.introUser.on('pointerover', function(){
		online.introUser.scaleX += 0.15;
		online.introUser.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton
	this.introUser.on('pointerout', function(){
		online.introUser.scaleX -= 0.15;
		online.introUser.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton
	this.introUser.on('pointerdown', function(){
		if(textEntry.text.length>0 && textEntry2nd.text.length>0){
			myUser.setUserName(textEntry.text)
			logUser(myClient,textEntry.text,passLogin, function(errorCode){
				online.isUserNameValidLog(errorCode)
			})
			while(textEntry.text.length>0){
				textEntry.text = textEntry.text.substr(0,textEntry.text.length-1)
				
			}
			while(textEntry2nd.text.length>0){
				textEntry2nd.text = textEntry2nd.text.substr(0,textEntry2nd.text.length-1)
				passLogin = "";
			}
			
			
		}
	})
	
	////////////////////BOTON REGISTRAR////////////////////////////////////
	this.registerUser = this.add.sprite(425, 750, 'register').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.registerUser.scaleX -= 0.4;
	this.registerUser.scaleY -= 0.4;
	//hacer boton visible
	this.registerUser.setAlpha(1);
	//accion al poner el cursor sobre el boton
	this.registerUser.on('pointerover', function(){
		online.registerUser.scaleX += 0.15;
		online.registerUser.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton
	this.registerUser.on('pointerout', function(){
		online.registerUser.scaleX -= 0.15;
		online.registerUser.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton
	this.registerUser.on('pointerdown', function(){
		if(textEntry3rd.text.length>0 && textEntry4th.text.length>0){
			
			myUser.setUserName(textEntry3rd.text)
			postNewUser(myClient,textEntry3rd.text,passRegister, function(errorCode){
				online.isUserNameValidReg(errorCode)
			})
			while(textEntry3rd.text.length>0){
				textEntry3rd.text = textEntry3rd.text.substr(0,textEntry3rd.text.length-1)
				
			}
			while(textEntry4th.text.length>0){
				textEntry4th.text = textEntry4th.text.substr(0,textEntry4th.text.length-1)
				passRegister = "";
			}
			
			
		}
	})
	
	//Mensaje que sale cuando metes un usuario registrado
	this.isUserNameValidReg = function(errorCode){
		
		if(errorCode==0){
			var textError = this.add.dynamicBitmapText(245, 450, 'font2', 'Usuario registrado', 30);
		}else if(errorCode == -3){
			var textError = this.add.dynamicBitmapText(245, 450, 'font2', 'Nombre de usuario ya registrado', 30);
		}else{
			var textError = this.add.dynamicBitmapText(245, 450, 'font2', 'Error al registrar', 30);
		}
		online.time.addEvent({
            delay: 1000,
            callback: function(){ textError.text = "";},
            callbackScope: online
        });
			
			
		
	}
	this.isUserNameValidLog = function(errorCode){
		if(errorCode==1){
			var textError = this.add.dynamicBitmapText(1250, 450, 'font2', 'Loggeado con exito', 30);
			
			online.time.addEvent({
	            delay: 1000,
	            callback: function(){ online.scene.start(lobby);},
	            callbackScope: online
	        });
			
		}else if(errorCode == 0){
			var textError = this.add.dynamicBitmapText(1250, 450, 'font2', 'Usuario no registrado', 30);
		}else if(errorCode == -5){
			var textError = this.add.dynamicBitmapText(1250, 450, 'font2', 'Contraseña erronea', 30);
		}else if(errorCode == -6){
			var textError = this.add.dynamicBitmapText(1250, 450, 'font2', 'Este cliente ya tiene un usuario ONLINE', 30);
		}else{
			var textError = this.add.dynamicBitmapText(1250, 450, 'font2', 'Error al loggear', 30);
		}
		online.time.addEvent({
            delay: 1000,
            callback: function(){ textError.text = "";},
            callbackScope: online
        });
	}
	
}

