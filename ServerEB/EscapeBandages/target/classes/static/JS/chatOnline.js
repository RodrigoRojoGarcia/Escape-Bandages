var chatOnline = new Phaser.Scene('ChatOnline');

this.chats = 0;

chatOnline.preload = function(){
	this.load.image('chatBack','Sprites/chatBack.png');
	this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');
    this.load.spritesheet("input", "Sprites/manualInput380.png", {frameWidth: 380, frameHeight: 50});
}

chatOnline.create = function(){
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
	
	
	//boolean que indica cuando esta escribiendo
    this.typing = false;
    //Input manual
    var w = 420;
    var h = 100;
    this.inputK = this.add.sprite(1540 + w/2, 1005 + h/2, 'input').setInteractive({ cursor: 'url(Sprites/cursor4.png), pointer' });
    this.inputK.anims.play('manualInput');
    //inK.anims.play('manualInput');
    
    this.inputK.on('pointerdown', function(){
    	chatOnline.typing = true;
    	chatOnline.inputK.anims.stop();
    	chatOnline.inputK.setTexture('input', 0);
	})
	//accion al quitar el cursor del boton Salir
	this.inputK.on('pointerout', function(){
		chatOnline.typing = false;
		if(textEntry.text.length == 0){
			chatOnline.inputK.anims.play('manualInput');
		}
	})
	
    var textEntry = this.add.dynamicBitmapText(1555, 1040, 'font2', '', 32);
    //habilitar teclado para introducir texto
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.backSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBACK);
    

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
        	var chat = {
        		sentence: textEntry.text,
        		sent: true
        	}
        	createChat(chat, function(){
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
    textArr[0] = this.add.dynamicBitmapText(1560, 950, 'font1', '', 32);
	textArr[1] = this.add.dynamicBitmapText(1560, 900, 'font1', '', 32);
	textArr[2] = this.add.dynamicBitmapText(1560, 850, 'font1', '', 32);
	textArr[3] = this.add.dynamicBitmapText(1560, 800, 'font1', '', 32);
	textArr[4] = this.add.dynamicBitmapText(1560, 750, 'font1', '', 32);
	textArr[5] = this.add.dynamicBitmapText(1560, 700, 'font1', '', 32);
	textArr[6] = this.add.dynamicBitmapText(1560, 650, 'font1', '', 32);
	textArr[7] = this.add.dynamicBitmapText(1560, 600, 'font1', '', 32);
	textArr[8] = this.add.dynamicBitmapText(1560, 550, 'font1', '', 32);
	textArr[9] = this.add.dynamicBitmapText(1560, 500, 'font1', '', 32);
}

chatOnline.update = function(){
	phrases = [];
	
	loadChats(function(chats){
		
		for(var i = 0; i < chats.length; i++){
			phrases[i] = chats[i];
		}
		
		
	});
	this.time.addEvent({
        delay: 50,
        callback: chatOnline.write,
        callbackScope: chatOnline
    });
}

chatOnline.write = function(){
	
	for(var i = 0; i < 10; i++){
		if(phrases[i] != undefined){
			textArr[i].setText(phrases[i].sentence);
		}
	}
}
/*function ChatOnline(scene){
	this.scene = scene;
	this.chats = 0;
	var that = this;
	
	this.createC = function(){ //Crea el input del chat
		//////////////////////////////////TEXTO CHAT///////////////////////////////////////
		scene.add.text(1200, 1030, 'Escribe aqui:', { font: '32px Arial', fill: '#ffffff' });
		
	    textEntry = scene.add.text(1450, 1030, '', { font: '32px Arial', fill: '#ffff00' });

	    // keys = this.input.keyboard.addKeys('A,B,C');

	    keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	    keyBackspace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
	    

	    scene.input.keyboard.on('keydown', function (event) {

	        if (event.keyCode === 8 && textEntry.text.length > 0)
	        {
	            textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
	        }
	        else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
	        {
	            textEntry.text += event.key;
	        }
	        else if(event.keyCode === 13 && textEntry.text.length > 0)
	        {
	        	//IMPLEMENTAR CREAR CHAT
	        	var chat = {
	        		sentence: textEntry.text,
	        		sent: true
	        	}
	        	createChat(chat, function(){
	        		//algo aqui
	        	});
	        	
	        	that.chats++;
	        	textEntry.text = "";
	        	
	        	
	        }
	        else if(event.keyCode >= 186 && event.keyCode < 222 )
	        {
	        	textEntry.text += event.key;
	        }
	    });
	    
	    textArr = [];
	    textArr[0] = scene.add.text(1200, 950, '', { font: '32px Arial', fill: '#ff0000' });
		textArr[1] = scene.add.text(1200, 900, '', { font: '32px Arial', fill: '#ff8000' });
		textArr[2] = scene.add.text(1200, 850, '', { font: '32px Arial', fill: '#ffff00' });
		textArr[3] = scene.add.text(1200, 800, '', { font: '32px Arial', fill: '#80ff00' });
		textArr[4] = scene.add.text(1200, 750, '', { font: '32px Arial', fill: '#00ffff' });
		textArr[5] = scene.add.text(1200, 700, '', { font: '32px Arial', fill: '#0080ff' });
		textArr[6] = scene.add.text(1200, 650, '', { font: '32px Arial', fill: '#0000ff' });
		textArr[7] = scene.add.text(1200, 600, '', { font: '32px Arial', fill: '#8000ff' });
		textArr[8] = scene.add.text(1200, 550, '', { font: '32px Arial', fill: '#ff00ff' });
		textArr[9] = scene.add.text(1200, 500, '', { font: '32px Arial', fill: '#ff0080' });
	
	}
	
	this.updateC = function(){
		phrases = [];
		
		loadChats(function(chats){
			
			for(var i = 0; i < chats.length; i++){
				phrases[i] = chats[i];
			}
			
			
		});
		this.scene.time.addEvent({
            delay: 50,
            callback: that.write,
            callbackScope: that
        });
	}
	this.write = function(){
		
		for(var i = 0; i < 10; i++){
			if(phrases[i] != undefined){
				textArr[i].setText(phrases[i].sentence);
			}
		}
		
		
	}
}*/