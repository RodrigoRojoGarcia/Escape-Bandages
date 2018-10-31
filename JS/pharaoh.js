function Pharaoh(scene, x, y){
	
	this.scene = scene;
	//We create the sprite from Phaser
	this.pharaoh = scene.matter.add.sprite(x,y,'Pharaoh');
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	const {width: w, height: h} = this.pharaoh;
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
	this.pharaoh.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y);

	
	this.isColliding = {left: false, right: false, bottom: false};
	this.onAirP = false;
	this.steady = false;


	this.onSensorCollide = function({bodyA, bodyB, pair}){
		if(bodyB.isSensor){
			return;
		}
		if(bodyA===this.sensors.left){
			this.isColliding.left = true;
			if(pair.separation > 0.5){
				this.pharaoh.x += pair.separation - 0.5;
			}
		}else if(bodyA===this.sensors.right){
			this.isColliding.right = true;
			if(pair.separation > 0.5){
				this.pharaoh.x -= pair.separation -0.5;
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
		return this.pharaoh;
	}

	this.getX = function(){
		return this.pharaoh.x;
	}

	this.getY = function(){
		return this.pharaoh.y;
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
	}

	this.update = function(k){
		//We enter as parameters the sprite from Phaser and the keys to control it
		var keys = k;
		var movingForce = 0.1;
	    if (keys.left.isDown && this.isColliding.bottom && !this.onAirP && !this.steady)
	    {
	        this.pharaoh.applyForce({x:-movingForce, y:0});
	        this.pharaoh.flipX = true;
	    }
	    else if (keys.right.isDown && this.isColliding.bottom && !this.onAirP && !this.steady)
	    {
	        this.pharaoh.applyForce({x:movingForce, y:0});
	        this.pharaoh.flipX = false;

	    }else if(this.isColliding.bottom && !this.onAirP){
	    	this.pharaoh.setVelocityX(0);    
	    }

	    if (keys.left.isDown && !(this.isColliding.bottom) && !this.steady)
	    {
	        this.pharaoh.applyForce({x:-movingForce, y:0});
	        this.pharaoh.flipX = true;
	    }
	    else if (keys.right.isDown && !(this.isColliding.bottom) && !this.steady)
	    {
	        this.pharaoh.applyForce({x:movingForce, y:0});
	        this.pharaoh.flipX = false;

	    }

	    if(this.pharaoh.body.velocity.x > 2){
	    	this.pharaoh.setVelocityX(2);
	    }else if(this.pharaoh.body.velocity.x < -2){
	    	this.pharaoh.setVelocityX(-2);
	    }


	    if (keys.up.isDown && this.isColliding.bottom && !this.steady)
	    {   
	        this.onAirP = true;
	        this.pharaoh.setVelocityY(-12);
	        scene.time.addEvent({
	            delay: 60,
	            callback: ()=>(this.onAirP=false),
	            callbackScope: scene
	        });

	    } 

	
	    if(this.isColliding.bottom && !this.onAirP){
	    	if(this.pharaoh.body.force.x !== 0 && !this.steady){
	    		this.pharaoh.anims.play("rightP", true);
	    	}else{
	    		this.pharaoh.anims.play("stayRightP", true);
	    	}
	    }else 
	   	{
	    	this.pharaoh.anims.stop();
	    	this.pharaoh.setTexture("Pharaoh", 10);
	    }

	}   
	
	
}