function Mummy(scene, x, y){
	
	this.scene = scene;


	var facingRightM = false;

	this.create = function(){
	var mummy = scene.physics.add.sprite(x,y,'Mummy');
		//ANIMATIONS
	const anims = scene.anims;
	anims.create({
		key: 'leftM',
		frames: anims.generateFrameNumbers('Mummy', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	anims.create({
		key: 'rightM',
		frames: anims.generateFrameNumbers('Mummy', {start: 4, end: 7}),
		framRate: 10,
		repeat: -1
	});

	anims.create({
		key: 'stayLeftM',
		frames: [{key: 'Mummy', frame: 0}],
		frameRate: 20
	});

	anims.create({
		key: 'stayRightM',
		frames: [{key: 'Mummy', frame: 7}],
		frameRate: 20
	});
	return mummy;
	}
	


	this.update = function (m,k){
		var mummy = m;
		var keys = k;
		if (keys.a.isDown){
	        mummy.setVelocityX(-160);

	        mummy.anims.play('leftM', true);
	        facingRightM = false;
	    }
	    else if (keys.d.isDown){
	        mummy.setVelocityX(160);

	        mummy.anims.play('rightM', true);
	        facingRightM = true;

	    }else if(facingRightM){
	    	mummy.setVelocityX(0);

	        mummy.anims.play('stayRightM');	
	    }else{
	    	mummy.setVelocityX(0);

	        mummy.anims.play('stayLeftM');
	    }
	    if (keys.w.isDown && mummy.body.onFloor()){
	        mummy.setVelocityY(-330);
	    }
	}

}