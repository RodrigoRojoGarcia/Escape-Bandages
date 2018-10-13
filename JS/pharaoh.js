function Pharaoh(scene, x, y){
	
	this.scene = scene;


	var facingRightP = false;


	this.create = function(){
		var pharaoh = scene.physics.add.sprite(x,y,'Pharaoh');
		//ANIMATIONS
		const anims = scene.anims;
		anims.create({
			key: 'leftP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: 'rightP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 4, end: 7}),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: 'stayLeftP',
			frames: [{key: 'Pharaoh', frame: 0}],
			frameRate: 20
		});

		anims.create({
			key: 'stayRightP',
			frames: [{key: 'Pharaoh', frame: 7}],
			frameRate: 20
		});


		

		return pharaoh;
	}
	
	this.update = function(p, k){
		var pharaoh = p;
		var keys = k;
		if (keys.left.isDown){
	        pharaoh.setVelocityX(-160);

	        pharaoh.anims.play('leftP', true);
	        facingRightP = false;
	    }
	    else if (keys.right.isDown){
	        pharaoh.setVelocityX(160);

	        pharaoh.anims.play('rightP', true);
	        facingRightP = true;

	    }else if(facingRightP){
	    	pharaoh.setVelocityX(0);

	        pharaoh.anims.play('stayRightP');	
	    }else{
	    	pharaoh.setVelocityX(0);

	        pharaoh.anims.play('stayLeftP');
	    }
	    if (keys.up.isDown && pharaoh.body.onFloor()){
	        pharaoh.setVelocityY(-330);
	    }
	}
	
}