function PurpleBox(scene, x, y, min, max, sprite, frictionStaticArg, frictionAirArg, frictionArg, massArg){
	this.scene = scene;
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;

///////////////////////////////////CREACIÓN///////////////////////////////////
	//Sprite
	this.purpleBox = scene.matter.add.sprite(x,y,sprite).setInteractive({ cursor: 'url(../Escape-Bandages/Sprites/cetro2.png), pointer' });
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
	this.max = max;
	this.min = min;
	this.x = x;
	this.y = y;
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
	//Variable que selecciona el nombre para la animación dependiendo del sprite introducido
	var k;
	//variable auxiliar para usar el sprite dentro del evento del ratón
	var image = this.purpleBox;

///////////////////////////////////CREATE///////////////////////////////////
	this.create = function(){
		//seleccion de nombre de animación
		if(sprite === "PurpleBox1"){
			k = 'box1';
		}
		if(sprite === "PurpleBox2"){
			k = 'box2';
		}
		//la caja es arrastable con el ratón. Al clicar se vuelve estática para que se quede donde se esta haciendo click con el puntero,
		//y al soltar deja de ser estática y cae por la gravedad
	    scene.input.setDraggable(image);
	   	scene.input.on('dragstart', function (pointer, gameObject) {

        	image.setStatic(true);

    	});
	    
	    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        	if(move){
        		if(dragY > scene.box1.min && dragY < scene.box1.max){
        			//Solo arrastable en el eje Y        		
        			gameObject.y = dragY;
        		}else if(dragY < scene.box1.min){
					gameObject.setPosition(scene.box1.x, scene.box1.min);
				}else if(dragY > gameObject.max){
					gameObject.setPosition(scene.box1.x, scene.box1.max);
				}
        	}
        });

	    scene.input.on('dragend', function (pointer, gameObject) {

        	image.setStatic(false);

    	});

///////////////////////////////////ANIMATIONS///////////////////////////////////
		//Animación de la caja cuando se vuelve morada
		const anims = scene.anims;
		//Animation to the right
		anims.create({
			key: k,
			frames: anims.generateFrameNumbers(sprite, {start: 1, end: 2}),
			frameRate: 5,
			repeat: -1
		});
	}//FIN CREATE
///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(){
		//Solo se mueve en su eje Y
		//Variable que coge la coordenada x del faraón
		var playerX = p.getX();
		//Se calcula la distancia entre la caja y el faraón
		var distance = this.purpleBox.x - playerX;
		
		//Colisiones con paredes. Si baja del minimo o sube del maximo se queda en dicha posición
		
		this.purpleBox.x = this.x;
		//Empieza la animación de la caja y se puede arrastrar cuando el faraón esta cerca de ella (izquierda o derecha). 
	    if (playerX < this.purpleBox.x && distance > 0 && distance < 300 || playerX > this.purpleBox.x  && distance < 0 && distance > -300)
	    {
	    	this.purpleBox.anims.play(k, true);
	    	this.move = true;
	    }else{
	    	this.purpleBox.setTexture(sprite, 0);
	    	this.move = false;
	    }
	} //FIN UPDATE
}