function PurpleBox(scene, x, y, min, max, sprite, frictionStaticArg, frictionAirArg, frictionArg, massArg){
	this.scene = scene;
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;

///////////////////////////////////CREACIÓN///////////////////////////////////
	//Sprite
	this.purpleBox = scene.matter.add.sprite(x,y,sprite).setInteractive();
	const {width: w, height: h} = this.purpleBox;
	//Cuerpo de la caja
	const mainBody = Bodies.rectangle(0,0,w,h);
	//Composición de las partes del cuerpo
	const compoundBody = Body.create({
		parts: [mainBody],
		frictionStatic: frictionStaticArg,
		frictionAir: frictionAirArg,
		friction: frictionArg,
		mass: massArg
	});
	//Cambiamos el mainBody del sprite
	this.purpleBox.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y);

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Se puede mover?
	this.move = false;

///////////////////////////////////MÉTODOS///////////////////////////////////
	//Devuelve el sprite	
	this.getSprite = function(){
		return this.purpleBox;
	}

	//Devuelve la X del sprite
	this.getX = function(){
		return this.purpleBox.x;
	}
	//Devuelve la Y del sprite
	this.getY = function(){
		return this.purpleBox.y;
	}
	//Devuelve la anchura del sprite
	this.getWidth = function(){
		return w;
	}
	//Devuelve la altura del sprite
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
	   	scene.input.on('dragstart', function (pointer, gameObject) {

        	image.setStatic(true);

    	});
	    
	    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        	if(move){
        		
        		gameObject.y = dragY;
        	}
        });

	    scene.input.on('dragend', function (pointer, gameObject) {

        	image.setStatic(false);

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
		//Solo se mueve en su eje Y
		
		var playerX = p.getX();
		var distance = this.purpleBox.x - playerX;
		
		//Colisiones con paredes (ARRIBA)
		console.log(this.purpleBox.y);
		if(this.purpleBox.y < min){
			this.purpleBox.setPosition(x, min);
		}else if(this.purpleBox.y > max){
			this.purpleBox.setPosition(x, max);
		}else{
			this.purpleBox.setPosition(x, this.purpleBox.y);
		}


	    if (playerX < this.purpleBox.x && distance > 0 && distance < 300 || playerX > this.purpleBox.x  && distance < 0 && distance > -300)
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