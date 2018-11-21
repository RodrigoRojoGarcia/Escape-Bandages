function ChatOnline(scene){
	this.scene = scene;
	this.chats = 0;
	that = this;
	
	this.create = function(){ //Crea el input del chat
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
		
		
		
		
		
		
	}
	this.write = function(){
		
		for(var i = 0; i < 10; i++){
			if(phrases[i] != undefined){
				textArr[i].setText(phrases[i].sentence);
			}
		}
		
		
	}
}