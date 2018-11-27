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
	myUser.setScene(this);
	
	///Creamos usuario
	myUser.create();
	myUser.update();
	
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
    this.add.dynamicBitmapText(800, 350, 'font1', 'Elija nombre de usuario:', 32);
    //introducir por teclado el nombre
    //var textEntry = this.add.text(800,450,'',{font: '32px Power Clear',fill: '#ffffff'})
    
    //boolean que indica cuando esta escribiendo
    this.typing = false;
    //Input manual
    var w = 420;
    var h = 100;
    this.inputK = this.add.sprite(735 + w/2, 415 + h/2, 'input').setInteractive({ cursor: 'url(Sprites/cursor4.png), pointer' });
    this.inputK.anims.play('manualInput');
    //inK.anims.play('manualInput');
    
    this.inputK.on('pointerdown', function(){
    	online.typing = true;
    	online.inputK.anims.stop();
    	online.inputK.setTexture('input', 0);
	})
	//accion al quitar el cursor del boton Salir
	this.inputK.on('pointerout', function(){
		online.typing = false;
		if(textEntry.text.length == 0){
			online.inputK.anims.play('manualInput');
		}
	})
	
    var textEntry = this.add.dynamicBitmapText(750, 450, 'font1', '', 32);
    //habilitar teclado para introducir texto
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.backSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBACK);
    this.input.keyboard.on('keydown', function(event){
    	if(event.keyCode === 8 && textEntry.text.length>0 && online.typing){
    		textEntry.text = textEntry.text.substr(0,textEntry.text.length-1)
    		
    	}else if(event.keyCode == 32 || (event.keyCode >=48 && event.keyCode <90) && online.typing){
    		textEntry.text += event.key
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
		myUser.setScene(submenu)
		online.scene.switch(submenu);
	})

	////////////////////BOTON LOGIN////////////////////////////////////
	this.introUser = this.add.sprite(950, 750, 'login').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
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
		if(textEntry.text.length>0){
			userNameValid = true;
			var user = {
				id: myUser.Id,
				userName: textEntry.text
			}
			myUser.setUserName(textEntry.text)
			updateUserName(user, function(){
				userNameValid = false;
			})
			while(textEntry.text.length>0){
				textEntry.text = textEntry.text.substr(0,textEntry.text.length-1)
			}
			
			online.time.addEvent({
	            delay: 40,
	            callback: online.isUserNameValid,
	            callbackScope: online
	        });
		}
	})
	
	this.isUserNameValid = function(){
		if(userNameValid){
			myUser.setScene(lobby);
			online.scene.switch(lobby);
		}else{
			var textEntry2 = this.add.dynamicBitmapText(750, 450, 'font2', 'Nombre de usuario ya registrado', 30);
			online.time.addEvent({
	            delay: 1000,
	            callback: function(){ textEntry2.text = "";},
	            callbackScope: online
	        });
		}
	}
	
}

