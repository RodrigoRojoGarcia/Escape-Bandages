function Mummy(scene, x, y){
	m = this;


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
	this.mummy.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y).setMass(10);

	
	this.isColliding = {left: false, right: false, bottom: false};
	this.onAirM = false;
	this.steady = false;

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


	this.getX = function(){
		return this.mummy.x;
	}

	this.getY = function(){
		return this.mummy.y;
	}

	this.block = scene.matter.add.rectangle(this.mummy.x+15, this.mummy.y, this.mummy.width/2, this.mummy.height/2,{isStatic: true, isSensor:true});
	
	this.shackle = [
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true}),
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true}),
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true}),
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true}),
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true}),
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true}),
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true}),
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true}),
		scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true})
	];
	var prev = this.block;
	for(var i =0;i<9;i++){
		this.shackle[i].setVisible(false)
		scene.matter.add.joint(prev,this.shackle[i],10,1)
		prev = this.shackle[i]
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
		anims.create({
			key: 'jumpRightM',
			frames: anims.generateFrameNumbers('Mummy', {start: 8, end: 10}),
			frameRate: 20,
			repeat: 0
		})
	}

	this.update = function(k){

		var keys = k;
		var movingForce = 0.1;
	    if (keys.a.isDown && !this.steady)
	    {
	        this.mummy.applyForce({x:-movingForce, y:0});
	        this.mummy.flipX = true;
	    }
	    else if (keys.d.isDown && !this.steady)
	    {
	        this.mummy.applyForce({x:movingForce, y:0});
	        this.mummy.flipX = false;

	    }else if(this.isColliding.bottom && !this.steady){
	    	this.mummy.setVelocityX(0);    
	    }
	    
	   
	    
		

	    if(this.mummy.body.velocity.x > 2){
	    	this.mummy.setVelocityX(2);
	    }else if(this.mummy.body.velocity.x < -2){
	    	this.mummy.setVelocityX(-2);
	    }


	    if(this.isColliding.bottom && !this.onAirM){
	    	if(this.mummy.body.force.x !== 0){
	    		this.mummy.anims.play("rightM", true);
	    	}else if(!this.onAirM){
	    		this.mummy.anims.play("stayRightM", true);
	    	}
	    }
	    if(Phaser.Input.Keyboard.JustDown(keys.w) && this.isColliding.bottom && !this.steady){
	    	this.onAirM = true;
	 		this.mummy.play("jumpRightM", true);

	    	scene.time.addEvent({
	            delay: 40,
	            callback: this.jump,
	            callbackScope: scene
	        });
	    }
        if(Phaser.Input.Keyboard.JustDown(keys.space)){
	        if(scene.bastetText === 1){
	            scene.sayBastet1.setVisible(false);
	            scene.sayBastet2.setVisible(true);
	            scene.bastetText = 2;
	        }else if(scene.bastetText === 2){
	            scene.sayBastet2.setVisible(false);
	            this.steady = false;
	            scene.bastetText = 3;
	        }else{
	        	this.createRope();
	        }
        
        }
        
	}   
	

	this.createRope = function(){
		this.onAttack = true;
		this.block.position.x = this.mummy.x;
		this.block.position.y = this.mummy.y;
		
		for(var i=0;i<9;i++){
			this.shackle[i].x = this.block.position.x
			this.shackle[i].y = this.block.position.y
			this.shackle[i].setVisible(true)
		}


		if(!this.mummy.flipX){
			this.shackle[8].applyForce({x:0.01,y:0});
		}else{
			this.shackle[8].applyForce({x:-0.01,y:0});
		}

		scene.time.addEvent({
	        delay: 100,
	        callback: this.destroyRopes,
	        callbackScope: scene
	    });
	};






	this.jump = function(){
		m.mummy.setVelocityY(-12);
		m.onAirM=false;
	};

	this.destroyRopes = function(){
		for(var i=0;i<9;i++){
			m.shackle[i].setVisible(false)
		}

	};

}