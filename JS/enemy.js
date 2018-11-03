function Enemy(scene, x, y){
	this.scene = scene;
	

	this.enemy = scene.matter.add.sprite(x,y,'snake');
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	const {width: w, height: h} = this.enemy;
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
	this.enemy.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y);

	
	this.isColliding = {left: false, right: false, bottom: false};
	this.onAirM = false;

	this.onSensorCollide = function({bodyA, bodyB, pair}){

		if(bodyB === m.shackle[0].body || bodyB === m.shackle[1].body || bodyB === m.shackle[2].body|| bodyB === m.shackle[3].body || bodyB === m.shackle[4].body||bodyB === m.shackle[5].body||bodyB === m.shackle[6].body||bodyB === m.shackle[7].body||bodyB === m.shackle[8].body){
			this.enemy.setTint(0xff00ff)
			return;
		}
		if(bodyA===this.sensors.left){
			this.isColliding.left = true;
			if(pair.separation > 0.5){
				this.enemy.x += pair.separation - 0.5;
			}
		}else if(bodyA===this.sensors.right){
			this.isColliding.right = true;
			if(pair.separation > 0.5){
				this.enemy.x -= pair.separation -0.5;
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
		return this.enemy;
	}

	this.create = function(){
		
		
		//ANIMATIONS
		const anims = scene.anims;
		//Animation to the right
		anims.create({
			key: 'rightS',
			frames: anims.generateFrameNumbers('snake', {start: 0, end: 7}),
			frameRate: 10,
			repeat: -1
		});
		//Staying still looking to the right
		anims.create({
			key: 'stayRightS',
			frames: anims.generateFrameNumbers('snake', {start: 0, end: 7}),
			frameRate: 5,
			repeat: -1
		});
		
		//We return the sprite of the mummy so it can be used in the general create function
		//return mummy;
	}

	this.update = function(){
		//We enter as parameters the sprite from Phaser and the keys to control it
		//var mummy = p;
		var mummy = m.getX();
		var pharaoh = p.getX();
		var distanceP = this.enemy.x - pharaoh;
		var distanceM = this.enemy.x - mummy;
		var movingForce = 0.1;
	    if ((pharaoh < this.enemy.x && distanceP > 0 && distanceP < 400)|| (mummy<this.enemy.x && distanceM > 0 && distanceM < 400))
	    {
	        this.enemy.applyForce({x:-movingForce, y:0});
	        this.enemy.flipX = true;
	    }
	    else if ((pharaoh > this.enemy.x  && distanceP < 0 && distanceP > -400) || (mummy>this.enemy.x && distanceM < 0 && distanceM > -400) )
	    {
	        this.enemy.applyForce({x:movingForce, y:0});
	        this.enemy.flipX = false;

	    }else if(this.isColliding.bottom && !this.onAirM){
	    	this.enemy.setVelocityX(0);    
	    }

	    if(this.enemy.body.velocity.x > 0.5){
	    	this.enemy.setVelocityX(0.5);
	    }else if(this.enemy.body.velocity.x < -0.5){
	    	this.enemy.setVelocityX(-0.5);
	    }



	    if(this.isColliding.bottom){
	    	if(this.enemy.body.velocity.x !== 0){
	    		this.enemy.anims.play("rightS", true);
	    	}else{
	    		this.enemy.anims.play("stayRightS", true);
	    	}
	    }else{
	    	this.enemy.anims.stop();
	    	this.enemy.setTexture("snake", 0);
	    }

	}  


}