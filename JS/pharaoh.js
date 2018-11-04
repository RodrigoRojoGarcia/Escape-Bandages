function Pharaoh(scene, x, y){
	p = this;
	this.scene = scene;
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
///////////////////////////////////CREACIÓN///////////////////////////////////
	//Sprite
	this.pharaoh = scene.matter.add.sprite(x,y,'Pharaoh');
	const {width: w, height: h} = this.pharaoh;
	//Cuerpo del faraón
	const mainBody = Bodies.rectangle(0,0,w*0.6,h,{chamfer: {radius:10}});
	//Sensores de abajo, izquierda y derecha
	this.sensors = {
		bottom: Bodies.rectangle(0,h*0.5,w*0.25,2, {isSensor: true}),
		left: Bodies.rectangle(-w*0.35,0,2,h*0.5, {isSensor: true}),
		right: Bodies.rectangle(w*0.35,0,2,h*0.5, {isSensor: true})
	};
	//Composición de las cuatro partes del cuerpo
	const compoundBody = Body.create({
		parts: [mainBody, this.sensors.bottom, this.sensors.right, this.sensors.left],
		frictionStatic: 0,
		frictionAir: 0.02,
		friction: 0.1
	});
	//Cambiamos el mainBody del sprite
	this.pharaoh.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y);

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Te dice si colisiona con la izquierda, derecha o abajo
	this.isColliding = {left: false, right: false, bottom: false};
	//Si está en aire
	this.onAirP = false;
	//Si no se puede mover
	this.steady = false;
	//Se está moviendo?
	this.moving = false;
	//Vida
	this.health = new heart("Pharaoh");
	//Me están dando?
	this.gettingHit = false;
	//Muerto?
	this.dead = false;
///////////////////////////////////COLISIONES///////////////////////////////////
	//Cuando colisiona un sensor del mainBody
	this.onSensorCollide = function({bodyA, bodyB, pair}){
		if(!s2.dead){
			if(bodyB === s2.getSprite().body.parts[1]){
				if(!this.gettingHit){
					this.getHit();
					p.pharaoh.setTint(0xff3333)
					scene.time.addEvent({
			            delay: 100,
			            callback: this.invulnerable,
			            callbackScope: scene
			        });
				}else{
					return;
				}
			}
		}
		


		//Si con lo que colisiona es un sensor: no hacemos nada
		if(bodyB.isSensor){
			return;
		}
		//Si colisiona el sensor de la izquierda
		if(bodyA===this.sensors.left){
			//Estamos colisionando por la izquierda
			this.isColliding.left = true;
			//Si la separación entre los objetos es mayor a 0.5
			if(pair.separation > 0.5){
				//Aumentamos la x del sprite la separación-0.5 (para que no se atasque)
				this.pharaoh.x += pair.separation - 0.5;
			}
		}
		//Si colisiona el sensor de la derecha
		else if(bodyA===this.sensors.right){
			//Estamos colisionando por la derecha
			this.isColliding.right = true;
			//Si la separación es mayor a 0.5
			if(pair.separation > 0.5){
				//Disminuimos la x del sprite la separación-0.5 (para que no se atasque)
				this.pharaoh.x -= pair.separation -0.5;
			}
		}
		//Si colisiona el sensor de abajo
		else if(bodyA===this.sensors.bottom){
			//Estamos colisionando por abajo
			this.isColliding.bottom = true;
		}
	}

	//Eventos que llaman a onSensorCollide cuando los sensores empiezan a colisionar con cualquier cosa y cuando están colisionando con cualquier cosa
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
	
///////////////////////////////////MÉTODOS///////////////////////////////////
	//Poner todas las colisiones a false
	this.resetColliding = function(){
		this.isColliding.left = false;
		this.isColliding.bottom = false;
		this.isColliding.right = false;
	}

	//Devuelve el sprite
	this.getSprite = function(){
		return this.pharaoh;
	}

	//Devuelve la X de la posición del sprite
	this.getX = function(){
		return this.pharaoh.x;
	}
	//Devuelve la Y de la posición del sprite
	this.getY = function(){
		return this.pharaoh.y;
	}

	//Aplica el salto
	this.jump = function(){
		//Aplicamos velocidad negativa (hacia arriba) al sprite
		p.pharaoh.setVelocityY(-12);
		//Dejamos de estar en el aire
		p.onAirP=false;
	};
	this.getHit = function(){
		this.gettingHit = true;
		this.health.getHit();
	}
	this.invulnerable = function(){
		p.pharaoh.setTint(0xffffff)
		p.gettingHit = false;

	}


///////////////////////////////////CREATE///////////////////////////////////	
	this.create = function(){
///////////////////////////////////ANIMATIONS///////////////////////////////////
		const anims = scene.anims;
		//Animación a la derecha
		anims.create({
			key: 'rightP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
		//Quieto mirando a la derecha
		anims.create({
			key: 'stayRightP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
		//Saltando a la derecha
		anims.create({
			key: 'jumpRightP',
			frames: anims.generateFrameNumbers('Pharaoh', {start: 8, end: 10}),
			frameRate: 10,
			repeat: 0
		})
	}//FIN CREATE

///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(k){
		var keys = k;
		//Fuerza que se va a añadir para hacer el movimiento más fluido (y permitir que mueva cosas)
		var movingForce = 0.1;
		//Actualizamos la vida
		this.health.update();

		if(!this.dead){
///////////////////////////////////CONTROLES///////////////////////////////////
			//Cuando flecha a la izquierda está presionado y el sprite no está quieto
			if (keys.left.isDown && !this.steady)
		    {
		    	//Le aplicamos la fuerza hacia la izquierda
		        this.pharaoh.applyForce({x:-movingForce, y:0});
		        //Hacemos que mire hacia la izquierda (true=izquierda, false=derecha)
		        this.pharaoh.flipX = true;
		    }
		    //Cuando flecha a la derecha está presionado y el sprite no está quieto
		    else if (keys.right.isDown && !this.steady)
		    {
		    	//Le aplicamos la fuerza hacia la derecha
		        this.pharaoh.applyForce({x:movingForce, y:0});
		        //Hacemos que mire hacia la derecha (true=izquierda, false=derecha)
		        this.pharaoh.flipX = false;

		    }
			//Cuando no se presiona ninguna tecla de movimiento, el sprite está en el suelo y no está quieto
		    else if(this.isColliding.bottom && !this.steady){
		    	//Ponemos la velocidad a 0
		    	this.pharaoh.setVelocityX(0);
	   
		    }

		    //Si acabas de presionar flecha hacia arriba y estás tocando el suelo y no está quieto
			if(Phaser.Input.Keyboard.JustDown(keys.up) && this.isColliding.bottom && !this.steady){
				//Estamos en el aire
		    	this.onAirP = true;
		    	//Reproducimos la animación de salto
		 		this.pharaoh.play("jumpRightP", true);
		 		//Después de un tiempo llamamos a JUMP
		    	scene.time.addEvent({
		            delay: 40,
		            callback: this.jump,
		            callbackScope: scene
		        });
		    }

		    //PONER VELOCIDAD MÁXIMA DEL SPRITE EN |2|
		    //Si la velocidad del sprite supera 2
		    if(this.pharaoh.body.velocity.x > 2){
		    	//Dejamos la velocidad en 2
		    	this.pharaoh.setVelocityX(2);
		    }
		    //Si la velocidad del sprite baja de -2
		    else if(this.pharaoh.body.velocity.x < -2){
		    	//Dejamos la velocidad en -2
		    	this.pharaoh.setVelocityX(-2);
		    }

		    //Si la velocidad en X es diferente a 0
		    if(this.pharaoh.body.velocity.x != 0){
		    	//Nos movemos
		    	this.moving = true
		    }else{
		    	//Si no, pues no nos movemos
		    	this.moving = false
		    }
///////////////////////////////////ANIMACIONES///////////////////////////////////
		    //Nota: la animación de salto se encuentra incluida en el apartado de controles

			//Si estamos en el suelo y no estamos en el aire
		    if(this.isColliding.bottom && !this.onAirP){
		    	//Si la fuerza en X del sprite no es 0
		    	if(this.pharaoh.body.force.x !== 0){
		    		//Reproducimos la animación de andar
		    		this.pharaoh.anims.play("rightP", true);
		    	}
				//Si no estamos en el aire
		    	else if(!this.onAirP){
		    		//Reproducimos la animación de estar quieto
		    		this.pharaoh.anims.play("stayRightP", true);
		    	}
		    }
		}else{
			this.pharaoh.destroy()
		}

	}//FIN UPDATE   

	
}