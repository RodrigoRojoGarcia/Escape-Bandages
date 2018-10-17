function Pharaoh(scene, x, y){
	
	this.scene = scene;
	//We create the sprite from Phaser
	this.pharaoh = scene.matter.add.sprite(x,y,'Pharaoh');
	//boolean that says if the sprite is looking to the right
	this.onAirP = false;

	this.getSprite = function(){
		return this.pharaoh;
	}
	
	this.create = function(){
		
		
		//ANIMATIONS
		const anims = scene.anims;
		//Animation to the right
		anims.create({
			key: 'rightP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 4, end: 7}),
			frameRate: 10,
			repeat: -1
		});
		//Staying still looking to the right
		anims.create({
			key: 'stayRightP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
		//Jumping to the right
    	anims.create({
	        key: 'jumpRightP',
	        frames: anims.generateFrameNumbers('Pharaoh', {start: 8, end: 10}),
	        frameRate: 30,
	        repeat: 0
    	});
		//We return the sprite of the pharaoh so it can be used in the general create function
		//return pharaoh;
	}

	this.update = function(k){
		//We enter as parameters the sprite from Phaser and the keys to control it
		//var pharaoh = p;
		var keys = k;
		
	    if (keys.left.isDown && this.pharaoh.body.onFloor() && !this.onAirP)
	    {
	        this.pharaoh.setVelocityX(-160);
	        this.pharaoh.anims.play('rightP', true);
	        this.pharaoh.flipX = true;
	    }
	    else if (keys.right.isDown && this.pharaoh.body.onFloor() && !this.onAirP)
	    {
	        this.pharaoh.setVelocityX(160);
	        this.pharaoh.anims.play('rightP', true);
	        this.pharaoh.flipX = false;

	    }else if(this.pharaoh.body.onFloor() && !this.onAirP){
	    	this.pharaoh.setVelocityX(0);
	        this.pharaoh.anims.play('stayRightP', true);     
	    }

	    if (keys.left.isDown && !(this.pharaoh.body.onFloor()))
	    {
	        this.pharaoh.setVelocityX(-160);
	        this.pharaoh.flipX = true;
	    }
	    else if (keys.right.isDown && !(this.pharaoh.body.onFloor()))
	    {
	        this.pharaoh.setVelocityX(160);
	        this.pharaoh.flipX = false;

	    }

	    if (keys.up.isDown && this.pharaoh.body.onFloor())
	    {   
	        this.onAirP = true;
	        this.pharaoh.anims.play('jumpRightP', true);
	        scene.time.addEvent({
	            delay: 60,
	            callback: this.jump(),
	            callbackScope: scene
	        });
	    } 
	}

	this.jump = function(){
		//var pharaoh = p;
    	this.pharaoh.setVelocityY(-330);
    	this.onAirP = false;
	}    
	  

	
}