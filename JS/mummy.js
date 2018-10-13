function Mummy(scene, x, y){
	
	this.scene = scene;

	//boolean that says if the sprite is looking to the right
	var facingRightM = false;


	this.create = function(){
		//We create the sprite from Phaser
		var mummy = scene.physics.add.sprite(x,y,'Mummy');
		//ANIMATIONS
		const anims = scene.anims;
		//Animation to the left
		anims.create({
			key: 'leftM',
			frames: anims.generateFrameNumbers('Mummy', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		});
		//Animation to the right
		anims.create({
			key: 'rightM',
			frames: anims.generateFrameNumbers('Mummy', {start: 4, end: 7}),
			frameRate: 10,
			repeat: -1
		});
		//Staying still looking to the left
		anims.create({
			key: 'stayLeftM',
			frames: [{key: 'Mummy', frame: 0}],
			frameRate: 20
		});
		//Staying still looking to the right
		anims.create({
			key: 'stayRightM',
			frames: [{key: 'Mummy', frame: 7}],
			frameRate: 20
		});
		//We return the sprite of the pharaoh so it can be used in the general create function
		return mummy;
	}
	


	this.update = function (m,k){
		//We enter as parameters the sprite from Phaser and the keys to control it
		var mummy = m;
		var keys = k;

		if (keys.a.isDown){//Pressing LEFT (Walking left)
	        mummy.setVelocityX(-160);

	        mummy.anims.play('leftM', true);
	        facingRightM = false;
	    }
	    else if (keys.d.isDown){//Pressing RIGHT (Walking right)
	        mummy.setVelocityX(160);

	        mummy.anims.play('rightM', true);
	        facingRightM = true;

	    }else if(facingRightM){//Not pressing anything but looking to the right (Staying still looking to the right)
	    	mummy.setVelocityX(0);

	        mummy.anims.play('stayRightM');	
	    }else{//Not pressing anything and looking to the left (Staying still looking to the left)
	    	mummy.setVelocityX(0);

	        mummy.anims.play('stayLeftM');
	    }
	    if (keys.w.isDown && mummy.body.onFloor()){//Pressing up and touching the ground (JUMP)
	        mummy.setVelocityY(-330);
	    }
	}

}