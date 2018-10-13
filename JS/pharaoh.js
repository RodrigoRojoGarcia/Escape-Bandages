function Pharaoh(scene, x, y){
	
	this.scene = scene;

	//boolean that says if the sprite is looking to the right
	var facingRightP = false;


	this.create = function(){
		//We create the sprite from Phaser
		var pharaoh = scene.physics.add.sprite(x,y,'Pharaoh');
		//ANIMATIONS
		const anims = scene.anims;
		//Animation to the left
		anims.create({
			key: 'leftP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		});
		//Animation to the right
		anims.create({
			key: 'rightP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 4, end: 7}),
			frameRate: 10,
			repeat: -1
		});
		//Staying still looking to the left
		anims.create({
			key: 'stayLeftP',
			frames: [{key: 'Pharaoh', frame: 0}],
			frameRate: 20
		});
		//Staying still looking to the right
		anims.create({
			key: 'stayRightP',
			frames: [{key: 'Pharaoh', frame: 7}],
			frameRate: 20
		});
		//We return the sprite of the pharaoh so it can be used in the general create function
		return pharaoh;
	}
	

	
	this.update = function(p, k){
		//We enter as parameters the sprite from Phaser and the keys to control it
		var pharaoh = p;
		var keys = k;
		
		if (keys.left.isDown){//Pressing LEFT (Walking left)
	        pharaoh.setVelocityX(-160);

	        pharaoh.anims.play('leftP', true);
	        facingRightP = false;
	    }
	    else if (keys.right.isDown){//Pressing RIGHT (Walking right)
	        pharaoh.setVelocityX(160);

	        pharaoh.anims.play('rightP', true);
	        facingRightP = true;

	    }else if(facingRightP){//Not pressing anything but looking to the right (Staying still looking to the right)
	    	pharaoh.setVelocityX(0);

	        pharaoh.anims.play('stayRightP');	
	    }else{//Not pressing anything and looking to the left (Staying still looking to the left)
	    	pharaoh.setVelocityX(0);

	        pharaoh.anims.play('stayLeftP');
	    }
	    if (keys.up.isDown && pharaoh.body.onFloor()){//Pressing up and touching the ground (JUMP)
	        pharaoh.setVelocityY(-330);
	    }
	}
	
}