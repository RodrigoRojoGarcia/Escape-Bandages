function ChatOnline(scene){
	this.scene = scene;
	
	
	this.create = function(){ //Crea el input del chat
		//////////////////////////////////TEXTO CHAT///////////////////////////////////////
		this.add.text(10, 10, 'Enter your name:', { font: '32px Courier', fill: '#ffffff' });

	    textEntry = this.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });

	    // keys = this.input.keyboard.addKeys('A,B,C');

	    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	    keyBackspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
	    

	    this.input.keyboard.on('keydown', function (event) {

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
	        }
	        else if(event.keyCode >= 186 && event.keyCode < 222 )
	        {
	        	textEntry.text += event.key;
	        }
	    });
	    
	    this.input.keyboard.on
	}
}