var heart = new Phaser.Scene('Heart')


heart.preload = function(){
	 //CORAZÓN
	this.load.image("heart","Sprites/heart.png");
	this.load.image("hudMummy", "Sprites/hudMummy.png");
	this.load.image("hudPharaoh", "Sprites/hudPharaoh.png");
	this.load.image("hudOffline", "Sprites/hudOffline.png");
}
heart.create = function(){
	if(gameState == 1){
		this.livesMummy = [];
		this.livesPharaoh = [];
		
		this.spriteWidth = 65;
		this.spriteHeight = 65;
		
		this.hud = this.add.image(1920/2, 1080/2, 'hudOffline');
		
		this.time.addEvent({
			delay: 500,
			callback: heart.theFunctionOffline,
			callbackScope: heart
		});
		
		
		
		
	}else if(gameState == 2){
		
		this.lives = []
		
		this.spriteWidth = 65;
		this.spriteHeight = 65;
		
		this.time.addEvent({
			delay: 500,
			callback: heart.theFunction,
			callbackScope: heart
		});

	}else{
		console.log("UwU, este no es tu barrio, tu barrio es aquel")
	}
}

heart.update = function(){
	if(gameState == 1){
		for(var i = 2; i + 1 > m.health; i--){
			this.livesMummy[i].destroy();
		}
		for(var i = 2; i + 1 > p.health; i--){
			this.livesPharaoh[i].destroy();
		}
	}else if(gameState == 2){
		if(myUser.character == 1){
			
			for(var i = 2; i + 1 > m.health; i--){
				this.lives[i].destroy();
			}
						
		}else if(myUser.character == 2){
			
			for(var i = 2; i + 1 > p.health; i--){
				this.lives[i].destroy();
			}
			
		}else{
			console.log("UwU, este no es tu barrio, tu barrio es aquel")
		}
	}else{
		console.log("UwU, este no es tu barrio, tu barrio es aquel")
	}
}

heart.theFunction = function(){
	if(myUser.character == 1){
		heart.hud = heart.add.image(1920/2,1080/2,'hudMummy');
		for(var i = 0; i < m.health; i++){
			heart.lives[i] = heart.add.image(140 + (heart.spriteWidth/2)+(heart.spriteWidth*i + (i*15)),1080-(heart.spriteHeight/2),'heart');
		}
	}else if(myUser.character == 2){
		heart.hud = heart.add.image(1920/2,1080/2,'hudPharaoh');
		for(var i = 0; i < p.health; i++){
			heart.lives[i] = heart.add.image(140 + (heart.spriteWidth/2)+(heart.spriteWidth*i + (i*15)),1080-(heart.spriteHeight/2),'heart');
		}
	}else{
		console.log("UwU, este no es tu barrio, tu barrio es aquel")
	}
}	

heart.theFunctionOffline = function(){
	for(var i = 0; i < m.health; i++){
		this.livesMummy[i] = this.add.image(140 + (heart.spriteWidth/2)+(heart.spriteWidth*i + (i*15)),1080-(heart.spriteHeight/2),'heart');
	}
	
	for(var i = 0; i < p.health; i++){
		this.livesPharaoh[i] = this.add.image(1920 - 140 - (heart.spriteWidth/2)-(heart.spriteWidth*i + (i*15)),1080-(heart.spriteHeight/2),'heart');
	}
}






