var heart = new Phaser.Scene('Heart')


heart.preload = function(){
	 //CORAZÓN
	this.load.image("heart","Sprites/heart.png");
	this.load.image("hudMummy", "Sprites/hudMummy.png");
	this.load.image("hudPharaoh", "Sprites/hudPharaoh.png");
	this.load.image("hudOffline", "Sprites/hudOffline.png");
}
heart.create = function(){
	
		this.livesMummy = [];
		this.livesPharaoh = [];
		
		this.spriteWidth = 65;
		this.spriteHeight = 65;
		
		this.hud = this.add.image(1920/2, 1080/2, 'hudOffline');
		
		this.time.addEvent({
			delay: 200,
			callback: heart.theFunctionOffline,
			callbackScope: heart
		});
}

heart.update = function(){
	
		for(var i = 2; i + 1 > currentScene.m.health; i--){
			this.livesMummy[i].destroy();
		}
		for(var i = 2; i + 1 > currentScene.p.health; i--){
			this.livesPharaoh[i].destroy();
		}
	
}


heart.theFunctionOffline = function(){
	for(var i = 0; i < currentScene.m.health; i++){
		this.livesMummy[i] = this.add.image(140 + (heart.spriteWidth/2)+(heart.spriteWidth*i + (i*15)),1080-(heart.spriteHeight/2),'heart');
	}
	
	for(var i = 0; i < currentScene.p.health; i++){
		this.livesPharaoh[i] = this.add.image(1920 - 140 - (heart.spriteWidth/2)-(heart.spriteWidth*i + (i*15)),1080-(heart.spriteHeight/2),'heart');
	}
}






