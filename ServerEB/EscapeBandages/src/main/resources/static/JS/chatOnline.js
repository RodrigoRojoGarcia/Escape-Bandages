var chatOnline = new Phaser.Scene('ChatOnline');

this.chats = 0;

chatOnline.preload = function(){
	this.load.image('chatBack','Sprites/chatBack.png');
	this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');
    this.load.spritesheet("input", "Sprites/manualInput380.png", {frameWidth: 380, frameHeight: 50});
}

chatOnline.create = function(){
	
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//BACKGROUND
	this.add.image(1540 + 380/2, 0 + 1080/2, 'chatBack');
//////////////////////////////////ANIMACIONES///////////////////////////////////////
	this.anims.create({
	    key: 'manualInput',
	    frames: this.anims.generateFrameNumbers('input',{start: 0, end: 1}),
	    frameRate: 5,
	    repeat: -1
	})
	
//////////////////////////////////TEXTO CHAT///////////////////////////////////////
	
	this.active = true;
	//boolean que indica cuando esta escribiendo
    this.typing = false;
    //Input manual
    var w = 420;
    var h = 100;
    this.inputK = this.add.sprite(1540 + w/2, 1005 + h/2, 'input').setInteractive({ cursor: 'url(Sprites/cursor4.png), pointer' });
    this.inputK.anims.play('manualInput');
    //inK.anims.play('manualInput');
    
    this.inputK.on('pointerdown', function(){
    	chatOnline.typing = !chatOnline.typing;
    	chatOnline.inputK.anims.stop();
    	chatOnline.inputK.setTexture('input', 0);
	})
	//accion al quitar el cursor del boton Salir
	this.inputK.on('pointerout', function(){
		
		if(textEntry.text.length == 0){
			chatOnline.inputK.anims.play('manualInput');
		}
	})
	
    var textEntry = this.add.dynamicBitmapText(1555, 1040, 'font2', '', 32);
    //habilitar teclado para introducir texto
    //this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.backSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBACK);
    

    // keys = this.input.keyboard.addKeys('A,B,C');

    
    

    this.input.keyboard.on('keydown', function (event) {

        if (event.keyCode === 8 && textEntry.text.length > 0 && chatOnline.typing)
        {
            textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        }
        else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90) && chatOnline.typing)
        {
            textEntry.text += event.key;
        }
        else if(event.keyCode === 13 && textEntry.text.length > 0 && chatOnline.typing)
        {
        	//IMPLEMENTAR CREAR CHAT
        	
        	console.log(myUser.getUserName());	
        	console.log(myLobby.getId());
        	
        	createChat(myLobby.getId(), myUser.getUserName(), textEntry.text, function(){
        		//algo aqui
        	});
        	
        	chatOnline.chats++;
        	textEntry.text = "";
        	
        	
        }
        else if(event.keyCode >= 186 && event.keyCode < 222 && chatOnline.typing)
        {
        	textEntry.text += event.key;
        }
    });
    
    textArr = [];
    for(var i = 0; i < 19; i++){
    	textArr[i] = this.add.dynamicBitmapText(1560, 950 - 50*i, 'font1', '', 24);
    }
    
	this.intervalChat = setInterval(chatOnline.getsChat, 500)
}
chatOnline.getsChat = function(){
	phrases = [];

	if(!disconnected){
		loadChats(myLobby.getId(), function(chats){
		
			for(var i = 0; i < chats.length; i++){
				phrases[i] = chats[i];
			}
			
			
		});

		chatOnline.time.addEvent({
			delay: 50,
			callback: chatOnline.write,
			callbackScope: chatOnline
		});
	}
}
chatOnline.update = function(){
	
}

chatOnline.write = function(){
	
	for(var i = 0; i < 19; i++){
		if(phrases[i] != undefined){
			textArr[i].setText(phrases[i].user + '(' + phrases[i].character + '): '+ phrases[i].sentence);
		}
	}
}

