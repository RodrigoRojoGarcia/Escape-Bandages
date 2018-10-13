function Mummy(scene, x, y){
	
	this.scene = scene;

	//boolean that says if the sprite is on the air
	var onAirM = false;


	this.create = function(){
		//We create the sprite from Phaser
		var mummy = scene.physics.add.sprite(x,y,'Mummy');
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
			frames: [{key: 'Mummy', frame: 7}],
			frameRate: 20
		});
    	//Jumping to the right
    	anims.create({
        	key: 'jumpRightM',
        	frames: anims.generateFrameNumbers('Mummy', {start: 8, end: 10}),
        	frameRate: 30,
        	repeat: 0
    	});
		//We return the sprite of the pharaoh so it can be used in the general create function
		return mummy;
	}
	


	this.update = function (m,k){
		//We enter as parameters the sprite from Phaser and the keys to control it
		var mummy = m;
		var keys = k;

	    if (keys.a.isDown && mummy.body.onFloor() && !onAirM)
	    {
	        mummy.setVelocityX(-160);
	        mummy.anims.play('rightM', true);
	        mummy.flipX = true;
	    }
	    else if (keys.d.isDown && mummy.body.onFloor() && !onAirM)
	    {
	        mummy.setVelocityX(160);
	        mummy.anims.play('rightM', true);
	        mummy.flipX = false;

	    }else if(mummy.body.onFloor() && !onAirM){

	    	mummy.setVelocityX(0);
	        mummy.anims.play('stayRightM');     
	    }

	    if (keys.a.isDown && !(mummy.body.onFloor()))
	    {
	        mummy.setVelocityX(-160);
	        mummy.flipX = true;
	    }
	    else if (keys.d.isDown && !(mummy.body.onFloor()))
	    {
	        mummy.setVelocityX(160);
	        mummy.flipX = false;

	    }

	    if (keys.w.isDown && mummy.body.onFloor())
	    {   
	        onAirM = true;
	        mummy.anims.play('jumpRightM', true);
	        scene.time.addEvent({
	            delay: 60,
	            callback: jump(mummy),
	            callbackScope: scene
	        });
	    } 
	} 

	function jump(m){
		console.log(m);
		var mummy = m;
    	mummy.setVelocityY(-330);
    	onAirM = false;
	}    
	    
	        
} 
