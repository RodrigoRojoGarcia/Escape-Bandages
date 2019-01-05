var heart = new Phaser.Scene('Heart')


heart.preload = function(){
	 //CORAZÓN
    this.load.image("heart","Sprites/heart.png");
}
heart.create = function(){
	if(gameState == 1){
		this.livesMummy = [];
		this.livesPharaoh = [];
		
		this.spriteWidth = 65;
		this.spriteHeight = 65;
		
		for(var i = 0; i < m.health; i++){
			this.livesMummy[i] = scene.add.image((this.spriteWidth/2)+(this.spriteWidth*i),1080-(this.spriteHeight/2),'heart');
		}
		
		for(var i = 0; i < p.health; i++){
			this.livesPharaoh[i] = scene.add.image(980 + (this.spriteWidth/2)+(this.spriteWidth*i),1080-(this.spriteHeight/2),'heart')
		}
		
		
		
	}else if(gameState == 2){
		
		this.lives = []
		
		this.spriteWidth = 65;
		this.spriteHeight = 65;
		
		if(myUser.character == 1){
			for(var i = 0; i < m.health; i++){
				this.lives[i] = scene.add.image((this.spriteWidth/2)+(this.spriteWidth*i),1080-(this.spriteHeight/2),'heart');
			}
		}else if(myUser.character == 2){
			for(var i = 0; i < p.health; i++){
				this.lives[i] = scene.add.image((this.spriteWidth/2)+(this.spriteWidth*i),1080-(this.spriteHeight/2),'heart');
			}
		}else{
			console.log("UwU, este no es tu barrio, tu barrio es aquel")
		}
		
		
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
		
		for(var i = 0; i < m.health; i++){
			this.livesMummy[i].x = (this.spriteWidth/2) + (this.spriteWidth*i)
			this.livesMummy[i].y = 1080 - (this.spriteHeight/2);
		}
		
		for(var i = 0; i < p.health; i++){
			this.livesPharaoh[i].x = 980 + (this.spriteWidth/2) + (this.spriteWidth*i);
			this.livesPharaoh[i].y = 1080 - (this.spriteHeight/2);
		}
	}else if(gameState == 2){
		if(myUser.character == 1){
			
			for(var i = 2; i + 1 > m.health; i--){
				this.lives[i].destroy();
			}
			
			for(var i = 0; i < m.health; i++){
				this.lives[i].x = (this.spriteWidth/2) + (this.spriteWidth*i)
				this.lives[i].y = 1080 - (this.spriteHeight/2);
			}
		}else if(myUser.character == 2){
			
			for(var i = 2; i + 1 > p.health; i--){
				this.lives[i].destroy();
			}
			
			
			for(var i = 0; i < p.health; i++){
				this.lives[i].x = (this.spriteWidth/2) + (this.spriteWidth*i)
				this.lives[i].y = 1080 - (this.spriteHeight/2);
			}
		}else{
			console.log("UwU, este no es tu barrio, tu barrio es aquel")
		}
	}else{
		console.log("UwU, este no es tu barrio, tu barrio es aquel")
	}
}






