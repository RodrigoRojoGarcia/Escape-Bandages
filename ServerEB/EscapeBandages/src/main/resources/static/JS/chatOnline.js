function ChatOnline(scene){
	this.scene = scene;
	this.chats = 0;
	that = this;
	
	this.create = function(){ //Crea el input del chat
		//////////////////////////////////TEXTO CHAT///////////////////////////////////////
		scene.add.text(10, 10, 'Enter your name:', { font: '32px Courier', fill: '#ffffff' });

	    textEntry = scene.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });

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
	    
	    textArr = []
	    textArr[0] = scene.add.text(10, 1030, "HOLA PRIMER CHAT", { font: '32px Courier', fill: '#ffffff' });
		textArr[1] = scene.add.text(10, 980, "HOLA SEGUNDO CHAT", { font: '32px Courier', fill: '#ffffff' });
		textArr[2] = scene.add.text(10, 930, "HOLA TERCER CHAT", { font: '32px Courier', fill: '#ffffff' });
		textArr[3] = scene.add.text(10, 880, '', { font: '32px Courier', fill: '#ffffff' });
		textArr[4] = scene.add.text(10, 830, '', { font: '32px Courier', fill: '#ffffff' });
		textArr[5] = scene.add.text(10, 780, '', { font: '32px Courier', fill: '#ffffff' });
	
	}
	
	this.update = function(){
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
		
		
		
		
		
		//scene.add.text(10, 980, phrases[1], { font: '32px', fill: '#ffffff' });
		//scene.add.text(10, 930, phrases[2], { font: '32px', fill: '#ffffff' });
		//scene.add.text(10, 880, phrases[3], { font: '32px', fill: '#ffffff' });
		//scene.add.text(10, 830, phrases[4], { font: '32px', fill: '#ffffff' });
		//scene.add.text(10, 780, phrases[5], { font: '32px', fill: '#ffffff' });
	}
	this.write = function(){
		console.log(phrases[0]);
		for(var i = 0; i < phrases.length; i++){
			if(phrases[i] != undefined){
				textArr[i].setText(phrases[i].sentence);
			}
		}
		
		
	}
}