//crear escena online
var online = new Phaser.Scene('Online');

online.preload = function(){
	//cargar imagenes
	//volver
	this.load.image('backO','Sprites/back.png');
	//ANTORCHAS
    this.load.spritesheet("torchO","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tileO", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundO", "background.json");
    
    
}

online.create = function(){
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//cargar letras Seleccion de Personaje


	///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"backgroundO", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tileO");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);
	///////////////////////////////////ANTORCHAS///////////////////////////////////
	var torchesM = [];
	var torchesM2 = [];
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    for(var i = 0; i < 2; i++){
        torchesM.push(this.add.sprite(225 + 1400*i,250,'torchO'));
        torchesM2.push(this.add.sprite(225 + 1400*i,800,'torchO'));
    };
    
    
    this.add.text(10,10,'Choose your character:',{font: '32px Power Clear', fill:'#ffffff'})
    
    var textEntry = this.add.text(10,50,'',{font: '32px Power Clear',fill: '#ffffff'})
    
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.backSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBACK);
    
    
    this.input.keyboard.on('keydown', function(event){
    	if(event.keyCode === 8 && textEntry.text.length>0){
    		textEntry.text = textEntry.text.substr(0,textEntry.text.length-1)
    		
    	}else if(event.keyCode == 32 || (event.keyCode >=48 && event.keyCode <90)){
    		textEntry.text += event.key
    	}
    })
    
    
    
    
    
    
    
    
    
    //Animación de las antorchas
    this.anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torchO',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    //Ponemos las animaciones en bucle, de las cuatro creadas
    for(var i = 0; i<2;i++){
        torchesM[i].anims.play('torchAnim');
        torchesM2[i].anims.play('torchAnim');
    };


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
		online.scene.switch(submenu);
	})
	
	
	
	this.introUser = this.add.sprite(600, 950, 'backO').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.introUser.scaleX -= 0.4;
	this.introUser.scaleY -= 0.4;
	//hacer boton visible
	this.introUser.setAlpha(1);
	//accion al poner el cursor sobre el boton Salir
	this.introUser.on('pointerover', function(){
		online.introUser.scaleX += 0.15;
		online.introUser.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.introUser.on('pointerout', function(){
		online.introUser.scaleX -= 0.15;
		online.introUser.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.introUser.on('pointerdown', function(){
		if(textEntry.text.length>0){
			var user = {
				id: myUser.Id,
				userName: textEntry.text
			}
			myUser.setUserName(textEntry.text)
			updateUser(user, function(userWithId){
				showUser(userWithId);
			})
			while(textEntry.text.length>0){
				textEntry.text = textEntry.text.substr(0,textEntry.text.length-1)
			}
			online.scene.switch(characterSelection)
		}
		
	})
}