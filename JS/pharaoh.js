function Pharaoh(scene, x, y){
	
	this.scene = scene;


	var facingRight = false;
	//ANIMATIONS
	const anims = scene.anims;
	anims.create({
		key: 'left',
		frames: anims.generateFrameNumbers('Pharaoh', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	anims.create({
		key: 'right',
		frames: anims.generateFrameNumbers('Pharaoh', {start: 4, end: 7}),
		framRate: 10,
		repeat: -1
	});

	anims.create({
		key: 'stayLeft',
		frames: [{key: 'Pharaoh', frame: 0}],
		frameRate: 20
	});

	anims.create({
		key: 'stayRight',
		frames: [{key: 'Pharaoh', frame: 7}],
		frameRate: 20
	});

	this.pharaoh = scene.physics.add.sprite(x,y,'Pharaoh');


	const {LEFT, RIGHT, UP} = Phaser.Input.Keyboard.KeyCodes;

	this.keys = scene.input.keyboard.addKeys({
		left: LEFT,
		right: RIGHT,
		up: UP
	});


	this.update = function(){
		const {keys, pharaoh} = this;
		if (keys.left.isDown){
	        pharaoh.setVelocityX(-160);

	        pharaoh.anims.play('left', true);
	        facingRight = false;
	    }
	    else if (keys.right.isDown){
	        pharaoh.setVelocityX(160);

	        pharaoh.anims.play('right', true);
	        facingRight = true;

	    }else if(facingRight){
	    	pharaoh.setVelocityX(0);

	        pharaoh.anims.play('stayRight');	
	    }else{
	    	pharaoh.setVelocityX(0);

	        pharaoh.anims.play('stayLeft');
	    }
	    if (keys.up.isDown && pharaoh.body.onFloor()){
	        pharaoh.setVelocityY(-330);
	    }
	}
	
}