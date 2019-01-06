function Box(scene, x, y, sprite, frictionStaticArg, frictionAirArg, frictionArg, massArg){
	this.scene = scene;
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	
///////////////////////////////////CREACIÓN///////////////////////////////////
	//Sprite
	this.box = scene.matter.add.sprite(x,y,sprite).setInteractive({ cursor: 'url(Sprites/cetro2.png), pointer' });
	const {width: w, height: h} = this.box;
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
	this.box.setExistingBody(compoundBody).setPosition(x,y);

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Se puede mover?
	this.move = false;
	
	this.x = x;
	this.y = y;
///////////////////////////////////MÉTODOS///////////////////////////////////
	//Devuelve el sprite	
	this.getSprite = function(){
		return this.box;
	}

	//Devuelve la X del sprite
	this.getX = function(){
		return this.box.x;
	}
	//Devuelve la Y del sprite
	this.getY = function(){
		return this.box.y;
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
	var image = this.box;
	
///////////////////////////////////CREATE///////////////////////////////////
	this.create = function(){
		if(myUser.character == 1){
			this.box.setStatic(true);
		}

		//seleccion de nombre de animación
		if(sprite === "PurpleBox1"){
			k = 'box1';
		}
		if(sprite === "PurpleBox2"){
			k = 'box2';
		}

		

///////////////////////////////////ANIMATIONS///////////////////////////////////
		//Animación de la caja cuando se vuelve morada
		//const anims = scene.anims;
		//Animation to the right
		/*anims.create({
			key: k,
			frames: anims.generateFrameNumbers(sprite, {start: 1, end: 2}),
			frameRate: 5,
			repeat: -1
		});*/
	}//FIN CREATE
///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(){
		
		
	} //FIN UPDATE
}