function Mummy(scene, x, y){
	
	this.scene = scene;
	//We create the sprite from Phaser
	this.mummy = scene.matter.add.sprite(x,y,'Mummy');
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	const {width: w, height: h} = this.mummy;
	const mainBody = Bodies.rectangle(0,0,w*0.6,h,{chamfer: {radius:10}});
	this.sensors = {
		bottom: Bodies.rectangle(0,h*0.5,w*0.25,2, {isSensor: true}),
		left: Bodies.rectangle(-w*0.35,0,2,h*0.5, {isSensor: true}),
		right: Bodies.rectangle(w*0.35,0,2,h*0.5, {isSensor: true})
	};

	const compoundBody = Body.create({
		parts: [mainBody, this.sensors.bottom, this.sensors.right, this.sensors.left],
		frictionStatic: 0,
		frictionAir: 0.02,
		friction: 0.1
	});
	this.mummy.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y);

	
	this.isColliding = {left: false, right: false, bottom: false};
	this.onAirM = false;


	this.onSensorCollide = function({bodyA, bodyB, pair}){
		if(bodyB.isSensor){
			return;
		}
		if(bodyA===this.sensors.left){
			this.isColliding.left = true;
			if(pair.separation > 0.5){
				this.mummy.x += pair.separation - 0.5;
			}
		}else if(bodyA===this.sensors.right){
			this.isColliding.right = true;
			if(pair.separation > 0.5){
				this.mummy.x -= pair.separation -0.5;
			}
		}else if(bodyA===this.sensors.bottom){
			this.isColliding.bottom = true;
		}
	}


	scene.matterCollision.addOnCollideStart({
		objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
		callback: this.onSensorCollide,
		context: this

	});

	scene.matterCollision.addOnCollideActive({
		objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
		callback: this.onSensorCollide,
		context: this
	});

	

	this.resetColliding = function(){
		this.isColliding.left = false;
		this.isColliding.bottom = false;
		this.isColliding.right = false;
	}



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
	}

	this.update = function(k){
		//We enter as parameters the sprite from Phaser and the keys to control it
		//var mummy = p;
		var keys = k;
		var movingForce = 0.1;
	    if (keys.a.isDown && this.isColliding.bottom && !this.onAirM)
	    {
	        this.mummy.applyForce({x:-movingForce, y:0});
	        this.mummy.flipX = true;
	    }
	    else if (keys.d.isDown && this.isColliding.bottom && !this.onAirM)
	    {
	        this.mummy.applyForce({x:movingForce, y:0});
	        this.mummy.flipX = false;

	    }else if(this.isColliding.bottom && !this.onAirM){
	    	this.mummy.setVelocityX(0);    
	    }

	    if (keys.a.isDown && !(this.isColliding.bottom))
	    {
	        this.mummy.applyForce({x:-movingForce, y:0});
	        this.mummy.flipX = true;
	    }
	    else if (keys.d.isDown && !(this.isColliding.bottom))
	    {
	        this.mummy.applyForce({x:movingForce, y:0});
	        this.mummy.flipX = false;

	    }

	    if(this.mummy.body.velocity.x > 2){
	    	this.mummy.setVelocityX(2);
	    }else if(this.mummy.body.velocity.x < -2){
	    	this.mummy.setVelocityX(-2);
	    }


	    if (keys.w.isDown && this.isColliding.bottom)
	    {   
	        this.onAirM = true;
	        this.mummy.setVelocityY(-12);
	        
	        scene.time.addEvent({
	            delay: 60,
	            callback: ()=>(this.onAirM=false),
	            callbackScope: scene
	        });
	    } 


	    if(this.isColliding.bottom){
	    	if(this.mummy.body.force.x !== 0){
	    		this.mummy.anims.play("rightM", true);
	    	}else{
	    		this.mummy.anims.play("stayRightM", true);
	    	}
	    }else {
	    	this.mummy.anims.stop();
	    	this.mummy.setTexture("Mummy", 10);
	    	
	    
	    }

	}  
}