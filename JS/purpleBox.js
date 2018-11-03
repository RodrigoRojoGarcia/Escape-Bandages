function PurpleBox(scene, x, y, sprite, frictionStaticArg, frictionAirArg, frictionArg, massArg){
	this.scene = scene;
	
	this.purpleBox = scene.matter.add.sprite(x,y,sprite).setInteractive();
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	const {width: w, height: h} = this.purpleBox;
	const mainBody = Bodies.rectangle(0,0,w,h);
	this.move = false;
	
	var moveable = this.move;
	const compoundBody = Body.create({
		parts: [mainBody],
		frictionStatic: frictionStaticArg,
		frictionAir: frictionAirArg,
		friction: frictionArg,
		mass: massArg
	});


	this.purpleBox.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y);

	this.getSprite = function(){
		return this.purpleBox;
	}

	this.getX = function(){
		return this.purpleBox.x;
	}

	this.getY = function(){
		return this.purpleBox.y;
	}

	this.getWidth = function(){
		return w;
	}

	this.getHeight = function(){
		return h;
	}

	var k;
	var image = this.purpleBox;
	
	this.create = function(){
		if(sprite === "PurpleBox1"){
			k = 'box1';
		}
		if(sprite === "PurpleBox2"){
			k = 'box2';
		}
		
	    scene.input.setDraggable(image);
	   
	    
	    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        	if(move){
        		gameObject.y = dragY;
        	}
        });
		

		//ANIMATIONS
		const anims = scene.anims;
		//Animation to the right
		anims.create({
			key: k,
			frames: anims.generateFrameNumbers(sprite, {start: 1, end: 2}),
			frameRate: 5,
			repeat: -1
		});
	}

	

	this.update = function(){
		var playerX = p.getX();
		var distance = this.purpleBox.x - playerX;
		
	    if (playerX < this.purpleBox.x && distance > 0 && distance < 500 || playerX > this.purpleBox.x  && distance < 0 && distance > -500)
	    {
	    	//izquierda o derecha
	    	this.purpleBox.anims.play(k, true);
	    	this.move = true;
	    }else{
	    	this.purpleBox.setTexture(sprite, 0);
	    	this.move = false;
	    }
	}  
}