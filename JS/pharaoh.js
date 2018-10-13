function Pharaoh(scene, x, y){
	
	this.scene = scene;

	//boolean that says if the sprite is looking to the right
	var onAirP = false;


	this.create = function(){
		//We create the sprite from Phaser
		var pharaoh = scene.physics.add.sprite(x,y,'Pharaoh');
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
			frames: [{key: 'Pharaoh', frame: 7}],
			frameRate: 20
		});
		//Jumping to the right
    	anims.create({
	        key: 'jumpRightP',
	        frames: anims.generateFrameNumbers('Pharaoh', {start: 8, end: 10}),
	        frameRate: 30,
	        repeat: 0
    	});
		//We return the sprite of the pharaoh so it can be used in the general create function
		return pharaoh;
	}
	


	this.update = function(p, k){
		//We enter as parameters the sprite from Phaser and the keys to control it
		var pharaoh = p;
		var keys = k;
		
	    if (keys.left.isDown && pharaoh.body.onFloor() && !onAirP)
	    {
	        pharaoh.setVelocityX(-160);
	        pharaoh.anims.play('rightP', true);
	        pharaoh.flipX = true;
	    }
	    else if (keys.right.isDown && pharaoh.body.onFloor() && !onAirP)
	    {
	        pharaoh.setVelocityX(160);
	        pharaoh.anims.play('rightM', true);
	        pharaoh.flipX = false;

	    }else if(pharaoh.body.onFloor() && !onAirP){
	    	pharaoh.setVelocityX(0);
	        pharaoh.anims.play('stayRightM');     
	    }

	    if (keys.left.isDown && !(pharaoh.body.onFloor()))
	    {
	        pharaoh.setVelocityX(-160);
	        pharaoh.flipX = true;
	    }
	    else if (keys.right.isDown && !(pharaoh.body.onFloor()))
	    {
	        pharaoh.setVelocityX(160);
	        pharaoh.flipX = false;

	    }

	    if (keys.up.isDown && pharaoh.body.onFloor())
	    {   
	        onAirP = true;
	        pharaoh.anims.play('jumpRightP', true);
	        scene.time.addEvent({
	            delay: 60,
	            callback: jump(pharaoh),
	            callbackScope: scene
	        });
	    } 
	}

	function jump(p){
		var pharaoh = p;
    	pharaoh.setVelocityY(-330);
    	onAirP = false;
	}    
	  

	
}