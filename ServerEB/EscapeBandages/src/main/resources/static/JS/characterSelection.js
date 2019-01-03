var characterSelection = new Phaser.Scene('characterSelection');

characterSelection.preload = function(){
	//cargar imagenes
	//letras seleccionar personaje
	this.load.image('select','Sprites/letras_seleccionar.png');
	//volver
	this.load.image('backO','Sprites/back.png');
	this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');
    
	//letras ready
    this.load.image('ready', 'Sprites/listo.png');
    //checks
    this.load.image('nocheck', 'Sprites/nocheck.png');
    this.load.image('check', 'Sprites/check.png');
	//ANTORCHAS
    this.load.spritesheet("torchO","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
    //boton eleccion momia
    this.load.spritesheet("boton_mummy","Sprites/boton_mummy_spritesheet.png",{frameWidth: 380, frameHeight: 380});
    this.load.image('img_mummy', 'Sprites/boton_mummy.png');
    this.load.image('img_mummy2', 'Sprites/boton_mummy2.png');
    //boton eleccion faraon
    this.load.spritesheet("boton_pharaoh","Sprites/boton_pharaoh_spritesheet.png",{frameWidth: 380, frameHeight: 380});
    this.load.image('img_pharaoh', 'Sprites/boton_pharaoh.png');
    this.load.image('img_pharaoh2', 'Sprites/boton_pharaoh2.png');
///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tileO", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundO", "background.json");
}


characterSelection.create = function(){
	this.once = 0;
	this.mummySelected = false;
	this.pharaohSelected = false;
	this.goOn = setInterval(characterSelection.usersReady, 1000);
	
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	
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
    
    //Animación boton mummy
    this.anims.create({
        key: 'bmummyAnim',
        frames: this.anims.generateFrameNumbers('boton_mummy',{start: 0, end: 0}),
        frameRate: 10
    });
    this.anims.create({
        key: 'bmummyAnim2',
        frames: this.anims.generateFrameNumbers('boton_mummy',{start: 1, end: 1}),
        frameRate: 10
    });
    //Animación boton pharaoh
    this.anims.create({
        key: 'bpharaohAnim',
        frames: this.anims.generateFrameNumbers('boton_pharaoh',{start: 0, end: 0}),
        frameRate: 10
    });
    this.anims.create({
        key: 'bpharaohAnim2',
        frames: this.anims.generateFrameNumbers('boton_pharaoh',{start: 1, end: 1}),
        frameRate: 10
    });

    this.selecc = this.add.image(950,200,'select');
    
    this.ready = this.add.image(950,500,'ready').setInteractive();
    this.ready.setAlpha(0);
    
    
    this.usuarios = this.add.dynamicBitmapText(830, 50, 'font2', 'Usuarios conectados:', 32);
    this.user1 = this.add.dynamicBitmapText(1110, 50, 'font2', myUser.getUserName(), 32);
    this.user2 = this.add.dynamicBitmapText(1110, 100, 'font2', '', 32);
    
//////////////////////////BOTONES///////////////////////////////////
	//////////////////////BOTON VOLVER///////////////////////////////
	//cargar boton Salir
    
    this.bback = new UIButton(this, 300, 950, 'backO', function(){
    	characterSelection.bcheck.hide();
		characterSelection.incheck.hide();
		characterSelection.bPharaoh.show();
		
		characterSelection.bMummy.show();
		
		characterSelection.ready.setAlpha(0);
		
		characterSelection.mummySelected = false
		characterSelection.pharaohSelected = false
		
		disconectUser(myUser.getUserName());
		
		myUser.character = 0;
		
		characterSelection.scene.switch(online);
		characterSelection.scene.stop(chatOnline);
		
    }, function(){
    	characterSelection.bback.amplifyScale(0.15, 0.15);
    }, function(){
    	characterSelection.bback.reduceScale(0.15, 0.15);
    })
    this.bback.reduceScale(0.4, 0.4)
    this.bback.show();
    
	
	

	//////////////////////BOTON ELLECCION MOMIA///////////////////////////////
	//cargar boton eleccion Mummy
    
    this.bMummy = new UIButton(this, 600, 550, 'boton_mummy', function(){
    	characterSelection.bcheck.show();
		characterSelection.ready.setAlpha(1);
		characterSelection.mummySelected = true
		characterSelection.pharaohSelected = false
		myUser.character = 1
		setCharacter(myLobby.getId(),myUser.getUserName(),"mummy")
    }, function(){
    	characterSelection.bMummy.amplifyScale(0.05, 0.05)
    	characterSelection.bMummy.butt.anims.play('bmummyAnim2');
    }, function(){
    	characterSelection.bMummy.reduceScale(0.05, 0.05);
		characterSelection.bMummy.butt.anims.play('bmummyAnim');
    })
    this.bMummy.show();
    
  
	/////////////////////BOTON ELLECCION PHARAOH///////////////////////////////
    
    this.bPharaoh = new UIButton(this, 1300, 550, 'boton_pharaoh', function(){
    	characterSelection.bcheck.show();
		characterSelection.ready.setAlpha(1);
		characterSelection.mummySelected = false
		characterSelection.pharaohSelected = true
		myUser.character = 2
		setCharacter(myLobby.getId(),myUser.getUserName(),"pharaoh")
    }, function(){
    	characterSelection.bPharaoh.amplifyScale(0.05, 0.05)
		characterSelection.bPharaoh.butt.anims.play('bpharaohAnim2');
    }, function(){
		characterSelection.bPharaoh.reduceScale(0.05, 0.05)
		characterSelection.bPharaoh.butt.anims.play('bpharaohAnim');
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
			if(both){
					characterSelection.scene.start(onlineG)
					clearInterval(characterSelection.goOn)
			}
		})
	}
characterSelection.update = function(){
	//chatOnline.updateC();
	otherUser(myLobby.getId(), myUser.getUserName(), function(userName){
		characterSelection.user2.text = userName;
	})
	
	if(this.mummySelected){
		this.bMummy.setTint(0xddffdd)
	}else{
		this.bMummy.setTint(0xffffff)
	}
	if(this.pharaohSelected){
		this.bPharaoh.setTint(0xddffdd)
	}else{
		this.bPharaoh.setTint(0xffffff)
	}
	
	
}