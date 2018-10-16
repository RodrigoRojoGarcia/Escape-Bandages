function Mummy(scene, x, y){
	
	this.scene = scene;
	//We create the sprite from Phaser
	this.mummy = scene.physics.add.sprite(x,y,'Mummy');
	//boolean that says if the sprite is on the air
	this.onAirM = false;

	this.getSprite = function(){
		return this.mummy;
	}

	this.create = function(){
		
		//ANIMATIONS
		const anims = scene.anims;
		//Animation to the right
		anims.create({
			key: 'rightM',
			frames: anims.generateFrameNumbers('Mummy', {start: 4, end: 7}),
			frameRate: 10,
			repeat: -1
		});
		//Staying still looking to the right
		anims.create({
			key: 'stayRightM',
			frames: anims.generateFrameNumbers('Mummy', {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
    	//Jumping to the right
    	anims.create({
        	key: 'jumpRightM',
        	frames: anims.generateFrameNumbers('Mummy', {start: 8, end: 10}),
        	frameRate: 30,
        	repeat: 0
    	});
		//We return the sprite of the pharaoh so it can be used in the general create function
		
	}
	


	this.update = function (k){
		//We enter as parameters the sprite from Phaser and the keys to control it
		var keys = k;

	    if (keys.a.isDown && this.mummy.body.onFloor() && !this.onAirM)
	    {
	        this.mummy.setVelocityX(-160);
	        this.mummy.anims.play('rightM', true);
	        this.mummy.flipX = true;
	    }
	    else if (keys.d.isDown && this.mummy.body.onFloor() && !this.onAirM)
	    {
	        this.mummy.setVelocityX(160);
	        this.mummy.anims.play('rightM', true);
	        this.mummy.flipX = false;

	    }else if(this.mummy.body.onFloor() && !this.onAirM){

	    	this.mummy.setVelocityX(0);
	        this.mummy.anims.play('stayRightM', true);     
	    }

	    if (keys.a.isDown && !(this.mummy.body.onFloor()))
	    {
	        this.mummy.setVelocityX(-160);
	        this.mummy.flipX = true;
	    }
	    else if (keys.d.isDown && !(this.mummy.body.onFloor()))
	    {
	        this.mummy.setVelocityX(160);
	        this.mummy.flipX = false;

	    }

	    if (keys.w.isDown && this.mummy.body.onFloor())
	    {   
	        this.onAirM = true;
	        this.mummy.anims.play('jumpRightM', true);
	        scene.time.addEvent({
	            delay: 60,
	            callback: this.jump(),
	            callbackScope: scene
	        });
	    } 
	} 

	this.jump = function(){
		this.mummy.setVelocityY(-330);
    	this.onAirM = false;
	}    
	    
	        
} 
