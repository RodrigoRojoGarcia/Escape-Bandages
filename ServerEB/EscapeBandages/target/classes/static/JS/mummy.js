function Mummy(scene, x, y){
	m = this;
	this.scene = scene;	
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
///////////////////////////////////CREACIÓN///////////////////////////////////
	//Sprite
	this.mummy = scene.matter.add.sprite(x,y,'Mummy');
	const {width: w, height: h} = this.mummy;
	//Cuerpo de la momia
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
	this.mummy.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y).setMass(10);

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Te dice si colisiona con la izquierda, derecha o abajo	
	this.isColliding = {left: false, right: false, bottom: false};
	//Si está en aire
	this.onAirM = false;
	//Fuerza calcetinete
	this.forceWS = 0;
	//Salto calcetinete
	this.jumpWS = false;
	//Ataque calcetinete
	this.attackWS = false;
	//Si no se puede mover
	this.steady = false;
	//Si está atacando
	this.onHit = false;
	//Bloque estático dónde empieza la cuerda (se sitúa siempre dónde esté la momia)
	this.block = scene.matter.add.rectangle(this.mummy.x+15, this.mummy.y, this.mummy.width/2, this.mummy.height/2,{isStatic: true, isSensor:true});
	//Array de trozos de cuerda
	this.shackle = []
	for(var i=0;i<9;i++){
		//Se generan todos los trozos de cuerda en el lugar del bloque
		this.shackle[i] = scene.matter.add.image(this.block.position.x, this.block.position.y, 'rope',null,{mass:0.01,isSensor: true});
	}
	//Creación de una variable auxiliar "previa" que es el eslabón al que unir el siguiente trozo de cuerda (empezamos con el bloque)
	var prev = this.block;
	for(var i =0;i<9;i++){
		//Hacemos que los trozos de cuerda sean invisibles
		this.shackle[i].setVisible(false)
		if(myUser.character == 1){
			//Unimos con un "muelle" el elemento previo y el elemento del array de trozos de cuerda en el que estamos
			scene.matter.add.joint(prev,this.shackle[i],10,1)
			//Hacemos que el elemento previo sea el elemento de cuerda en el que estamos
			prev = this.shackle[i];
		}
	}
	if(myUser.character == 2){
		for(var i = 0; i < 9; i++){
			this.shackle[i].setStatic(true);
		}
	}

	//Vida
	this.health = new heart("Mummy");
	//Se mueve?
	this.moving = false;
	//Me acaban de dar?
	this.gettingHit = false;
	//Muerto?
	this.dead = false;

///////////////////////////////////COLISIONES///////////////////////////////////
	//Cuando colisiona un sensor del mainBody
	this.onSensorCollide = function({bodyA, bodyB, pair}){
		//Si el shek no está muerto
		for(var i=0;i<enemies.length;i++){
			if(!enemies[i].dead){
				//Si el bodyB es el shek
				if(bodyB === enemies[i].getSprite().body.parts[1]){
					//Si no estamos en periodo de invulnerabilidad
					if(!this.gettingHit){
						//Nos golpean
						this.getHit();
						//Nos ponemos rojos
						m.mummy.setTint(0xff3333)
						//Al cabo de un tiempo llamamos a invulnerable
						scene.time.addEvent({
				            delay: 300,
				            callback: this.invulnerable,
				            callbackScope: scene
				        });
					}else{
						return;
					}
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
				this.mummy.x += pair.separation - 0.5;
			}
		}
		//Si colisiona el sensor de la derecha
		else if(bodyA===this.sensors.right){
			//Estamos colisionando por la derecha
			this.isColliding.right = true;
			//Si la separación es mayor a 0.5
			if(pair.separation > 0.5){
				//Disminuimos la x del sprite la separación-0.5 (para que no se atasque)
				this.mummy.x -= pair.separation -0.5;
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
		return this.mummy;
	}

	//Devuelve la X de la posición del sprite
	this.getX = function(){
		return this.mummy.x;
	}
	//Devuelve la Y de la posición del sprite
	this.getY = function(){
		return this.mummy.y;
	}

	//Aplica el salto
	this.jump = function(){
		//Aplicamos velocidad negativa (hacia arriba) al sprite
		m.mummy.setVelocityY(-12);
		//Dejamos de estar en el aire
		m.onAirM=false;
	};


	//Crea la cuerda
	this.createRope = function(){
		//Estamos atacando
		this.onHit = true;
		
		//Actualizamos la posición del bloque
		this.block.position.x = this.mummy.x;
		this.block.position.y = this.mummy.y;
		//Actualizamos las posiciones de la cuerda y la hacemos visible
		for(var i=0;i<9;i++){
			
			if(myUser.character == 1){
				this.shackle[i].x = this.block.position.x
				this.shackle[i].y = this.block.position.y
			}
			this.shackle[i].setVisible(true)
		}
		if(myUser.character == 1){
			//Aplicamos una fuerza al último trozo de cuerda para que salga disparada en la dirección en la que está mirando el sprite
			if(!this.mummy.flipX){
				this.shackle[8].applyForce({x:0.01,y:0});
			}else{
				this.shackle[8].applyForce({x:-0.01,y:0});
			}
		
		}
		//Después de un tiempo, destruimos la cuerda
		scene.time.addEvent({
	        delay: 100,
	        callback: this.hideRopes,
	        callbackScope: scene
	    });
	};
	//Hace que no se vean la cuerda
	this.hideRopes = function(){
		
		//Hacemos invisibles las cuerdas
		for(var i=0;i<9;i++){
			m.shackle[i].setVisible(false)
		}
		
		//Ya no estamos atacando
		m.onHit = false;
	}

	this.destroyRopes = function(){
		for(var i=0;i<9;i++){
			m.shackle[i].destroy()
		}
	}

	//Nos pone en periodo de estar golpeados y llama a getHit de la vida
	this.getHit = function(){
		this.gettingHit = true;
		this.health.getHit();
	}
	//Cambia el sprite al original y termina el periodo de invulnerabilidad
	this.invulnerable = function(){
		m.mummy.setTint(0xffffff)
		m.gettingHit = false;
	}

	this.destroy = function(){
		this.destroyRopes();
		this.health.destroy();
		this.mummy.destroy();
	}

///////////////////////////////////CREATE///////////////////////////////////
	this.create = function(){
///////////////////////////////////ANIMATIONS///////////////////////////////////
		const anims = scene.anims;
		//Animación a la derecha
		anims.create({
			key: 'rightM',
			frames: anims.generateFrameNumbers('Mummy', {start: 4, end: 7}),
			frameRate: 10,
			repeat: -1
		});
		//Quieto mirando a la derecha
		anims.create({
			key: 'stayRightM',
			frames: anims.generateFrameNumbers('Mummy', {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
		//Saltando a la derecha
		anims.create({
			key: 'jumpRightM',
			frames: anims.generateFrameNumbers('Mummy', {start: 8, end: 10}),
			frameRate: 20,
			repeat: 0
		})
		
		
		
		
	} //FIN CREATE

///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(k){
		var keys = k;
		//Fuerza que se va a añadir para hacer el movimiento más fluido (y permitir que mueva cosas)
		var movingForce = 0.1;
		//Actualizamos la vida
		this.health.update()
		//Caida momia
		if(this.mummy.y > 10*120){
			this.dead = true;
			offline.scene.restart();
			p.getSprite().setVelocity(0,0)
        	m.getSprite().setVelocity(0,0)
			offline.scene.switch(gameover);
		}
		//Si no estoy muerto
		if(!this.dead){
			if(myUser.character == 1){
///////////////////////////////////CONTROLES///////////////////////////////////
				//Cuando a está presionado y el sprite no está quieto		
				if (keys.a.isDown && !this.steady)
				{	
					//Le aplicamos la fuerza hacia la izquierda
					this.mummy.applyForce({x:-movingForce, y:0});
					//Hacemos que mire hacia la izquierda (true=izquierda, false=derecha)
					this.mummy.flipX = true;

				}
				//Cuando d está presionado y el sprite no está quieto	
				else if (keys.d.isDown && !this.steady)
				{
					//Le aplicamos la fuerza hacia la derecha
					this.mummy.applyForce({x:movingForce, y:0});
					//Hacemos que mire hacia la derecha (true=izquierda, false=derecha)
					this.mummy.flipX = false;

				}
				//Cuando no se presiona ninguna tecla de movimiento, el sprite está en el suelo y no está quieto
				else if(this.isColliding.bottom && !this.steady){
					//Ponemos la velocidad a 0
					this.mummy.setVelocityX(0);

				}
				//Si acabas de presionar w y estás tocando el suelo y no está quieto
				if(Phaser.Input.Keyboard.JustDown(keys.w) && this.isColliding.bottom && !this.steady){
					//Estamos en el aire
					this.onAirM = true;
					//Reproducimos la animación de salto
					this.mummy.play("jumpRightM", true);
					//Después de un tiempo llamamos a JUMP
					scene.time.addEvent({
						delay: 40,
						callback: this.jump,
						callbackScope: scene
					});
				}
				//Si se acaba de pulsar el espacio
				if(Phaser.Input.Keyboard.JustDown(keys.space)){
					//Si tiene que mostrar el segundo texto
					if(scene.bastetText === 1){
						//Hace invisible el primer texto y visible el segundo
						scene.sayBastet1.setVisible(false);
						scene.sayBastet2.setVisible(true);
						//El siguiente texto que se muestra es el tercero
						scene.bastetText = 2;
					}
					//Si se tiene que mostrar el "tercero", que no existe
					else if(scene.bastetText === 2){
						//Escondemos el texto 2
						scene.sayBastet2.setVisible(false);
						//Permitimos movimiento al sprite
						this.steady = false;
						//El siguiente que se tiene que mostrar es el cuarto (esto es para que no vuelva a entrar en esta rama del if)
						scene.bastetText = 3;
					}else if(!this.onHit){
						//Creamos la cuerda
						this.createRope();
					}
				
				}

				//PONER VELOCIDAD MÁXIMA DEL SPRITE EN |2|
				//Si la velocidad del sprite supera 2
				if(this.mummy.body.velocity.x > 2){
					//Dejamos la velocidad en 2
					this.mummy.setVelocityX(2);
				}
				//Si la velocidad del sprite baja de -2
				else if(this.mummy.body.velocity.x < -2){
					//Dejamos la velocidad en -2
					this.mummy.setVelocityX(-2);
				}

				//Si la velocidad en X es diferente a 0
				if(this.mummy.body.force.x != 0){
					//Nos movemos
					this.moving = true
				}else{
					//Si no, pues no nos movemos
					this.moving = false
				}
///////////////////////////////////ANIMACIONES///////////////////////////////////
				//Nota: la animación de salto se encuentra incluida en el apartado de controles

				//Si estamos en el suelo y no estamos en el aire
				if(this.isColliding.bottom && !this.onAirM){
					//Si la fuerza en X del sprite no es 0
					if(this.mummy.body.force.x !== 0){
						//Reproducimos la animación de andar
						this.mummy.anims.play("rightM", true);
					}
					//Si no estamos en el aire
					else if(!this.onAirM){
						//Reproducimos la animación de estar quieto
						this.mummy.anims.play("stayRightM", true);
					}
				}
			}
			else if(myUser.character == 2)
			{
				///////////////////////////////////ANIMACIONES///////////////////////////////////
				//Nota: la animación de salto se encuentra incluida en el apartado de controles
				if(this.jumpWS && this.isColliding.bottom && !this.steady){
					//Estamos en el aire
					this.onAirM = true;
					//Reproducimos la animación de salto
					this.mummy.play("jumpRightM", true);
					//Después de un tiempo llamamos a JUMP
					scene.time.addEvent({
						delay: 40,
						callback: this.jump,
						callbackScope: scene
					});
				}

				//Si estamos en el suelo y no estamos en el aire
				if(this.isColliding.bottom && !this.onAirM){
					//Si la fuerza en X del sprite no es 0
					if(this.forceWS !== 0){
						//Reproducimos la animación de andar
						this.mummy.anims.play("rightM", true);
					}
					//Si no estamos en el aire
					else if(!this.onAirM){
						//Reproducimos la animación de estar quieto
						this.mummy.anims.play("stayRightM", true);
					}
				}
				if(this.forceWS > 0){
					this.mummy.flipX = false;
				}else if(this.forceWS < 0){
					this.mummy.flipX = true;
				}

				if(this.attackWS){
					//Si tiene que mostrar el segundo texto
					if(scene.bastetText === 1){
						//Hace invisible el primer texto y visible el segundo
						scene.sayBastet1.setVisible(false);
						scene.sayBastet2.setVisible(true);
						//El siguiente texto que se muestra es el tercero
						scene.bastetText = 2;
					}
					//Si se tiene que mostrar el "tercero", que no existe
					else if(scene.bastetText === 2){
						//Escondemos el texto 2
						scene.sayBastet2.setVisible(false);
						//Permitimos movimiento al sprite
						this.steady = false;
						//El siguiente que se tiene que mostrar es el cuarto (esto es para que no vuelva a entrar en esta rama del if)
						scene.bastetText = 3;
					}else{
						//Creamos la cuerda
						this.createRope();
					}
				
				}

				
			}
			else
			{
				console.log("UWU este no es tu barrio");
			}

		} 
		
	}//FIN UPDATE
}