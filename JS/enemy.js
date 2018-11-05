function Enemy(scene, x, y){
	this.scene = scene;
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
///////////////////////////////////CREACIÓN///////////////////////////////////
	//Sprite
	this.enemy = scene.matter.add.sprite(x,y,'snake');
	const {width: w, height: h} = this.enemy;
	//Cuerpo del enemigo
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
	this.enemy.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y);

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Te dice si colisiona con la izquierda, derecha o abajo
	this.isColliding = {left: false, right: false, bottom: false};
	//Objeto barra de vida, que almacena su vida (primer parámetro), se tiene que actualizar su posición
	this.healthBar = new healthBar(100, this.enemy.x-(this.enemy.width/2), this.enemy.y-(this.enemy.height/2)+5,this.enemy.width,5);
	//Está muerto?
	this.dead = false;


///////////////////////////////////COLISIONES///////////////////////////////////
	//Cuando colisiona un sensor del mainBody
	this.onSensorCollide = function({bodyA, bodyB, pair}){
		//Si el bodyB es alguna parte de la cuerda de la momia
		if(bodyB === m.shackle[0].body || bodyB === m.shackle[1].body || bodyB === m.shackle[2].body|| bodyB === m.shackle[3].body || bodyB === m.shackle[4].body||bodyB === m.shackle[5].body||bodyB === m.shackle[6].body||bodyB === m.shackle[7].body||bodyB === m.shackle[8].body){
			//Si la momia está atacando
			if(m.onHit){
				//Quitamos vida al enemigo
				this.healthBar.damage(20)
				//Ya me has atacado una vez, ya no estás atacando
				m.onHit = false;
			}
		}
		if(bodyB === p.fire[0].body ||bodyB === p.fire[1].body ||bodyB === p.fire[2].body){
			if(p.onHit){
				this.healthBar.damage(50)
				p.onHit = false
			}
		}

		//Si con lo que colisiona es un sensor: no hacemos nada (a menos que sea un trozo de cuerda, que no llega a esta parte)
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
				this.enemy.x += pair.separation - 0.5;
			}
		}
		//Si colisiona el sensor de la derecha
		else if(bodyA===this.sensors.right){
			//Estamos colisionando por la derecha
			this.isColliding.right = true;
			//Si la separación es mayor a 0.5
			if(pair.separation > 0.5){
				//Disminuimos la x del sprite la separación-0.5 (para que no se atasque)
				this.enemy.x -= pair.separation -0.5;
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
		return this.enemy;
	}

///////////////////////////////////CREATE///////////////////////////////////
	this.create = function(){
			
///////////////////////////////////ANIMATIONS///////////////////////////////////
		const anims = scene.anims;
		//Animación a la derecha
		anims.create({
			key: 'rightS',
			frames: anims.generateFrameNumbers('snake', {start: 0, end: 7}),
			frameRate: 10,
			repeat: -1
		});
		//Quieto mirando a la derecha
		anims.create({
			key: 'stayRightS',
			frames: anims.generateFrameNumbers('snake', {start: 0, end: 7}),
			frameRate: 5,
			repeat: -1
		});
	}//FIN CREATE

///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(){
		//Fuerza que se va a añadir para hacer el movimiento más fluido (y permitir que mueva cosas)
		var movingForce = 0.1;
		//Si la momia no es´ta muerta
		if(!m.dead){
			//Cogemos su valor de la X
			var mummy = m.getX();
			//Para la distancia
			var distanceM = this.enemy.x - mummy;
			//Si está a la derecha del enemigo y su distancia es menor a 400
			if (mummy<this.enemy.x && distanceM > 0 && distanceM < 400)
	    	{
	    		//Nos movemos a la izquierda
	        	this.enemy.applyForce({x:-movingForce, y:0});
	        	//Miramos a la izquierda
	        	this.enemy.flipX = true;
	    	}
	    	//Si está a la derecha del enemigo y sus distancia es menor a 400
	    	else if (mummy>this.enemy.x && distanceM < 0 && distanceM > -400)
	    	{
	    		//Nos movemos a la derecha
	        	this.enemy.applyForce({x:movingForce, y:0});
	        	//Miramos a la derecha
	        	this.enemy.flipX = false;
	    	}
	    		//Si no está cerca de ninguno y está tocando el suelo
	    		else if(this.isColliding.bottom){
	    		//Velocidad a 0
	    		this.enemy.setVelocityX(0);    
	    	}
		}
		//Si el faraón no está muerto
		if(!p.dead){
			//Cogemos su valor de la X
			var pharaoh = p.getX();
			//Para la distancia
			var distanceP = this.enemy.x - pharaoh;
			//Si está a la derecha del enemigo y su distancia es menor a 400
			if (pharaoh < this.enemy.x && distanceP > 0 && distanceP < 400)
		    {
		    	//Nos movemos a la izquierda
		        this.enemy.applyForce({x:-movingForce, y:0});
		        //Miramos a la izquierda
		        this.enemy.flipX = true;
		    }
		    //Si está a la derecha del enemigo y sus distancia es menor a 400
		    else if (pharaoh > this.enemy.x  && distanceP < 0 && distanceP > -400)
		    {
		    	//Nos movemos a la derecha
		        this.enemy.applyForce({x:movingForce, y:0});
		        //Miramos a la derecha
		        this.enemy.flipX = false;

		    }
		    //Si no está cerca de ninguno y está tocando el suelo
		    else if(this.isColliding.bottom){
		    	//Velocidad a 0
		    	this.enemy.setVelocityX(0);    
		    }
		}

	    //PONER VELOCIDAD MÁXIMA DEL SPRITE EN |0.5|
	    //Si la velocidad del sprite supera 0.5
	    if(this.enemy.body.velocity.x > 0.5){
	    	//Dejamos la velocidad en 0.5
	    	this.enemy.setVelocityX(0.5);
	    }
	    //Si la velocidad del sprite baja de -0.5
	    else if(this.enemy.body.velocity.x < -0.5){
	    	//Dejamos la velocidad en 0.5
	    	this.enemy.setVelocityX(-0.5);
	    }


	    //Si estamos en el suelo
	    if(this.isColliding.bottom){
	    	//Si la fuerza en X del sprite no es 0
	    	if(this.enemy.body.velocity.x !== 0){
	    		//Reproducimos la animación de andar
	    		this.enemy.anims.play("rightS", true);
	    	}
	    	//Si la velocidad es 0
	    	else{
	    		//Reproducimos la animación de estar quieto
	    		this.enemy.anims.play("stayRightS", true);
	    	}
	    }
	    //Si no está tocando el suelo
	    else{
	    	//Paramos la animación
	    	this.enemy.anims.stop();
	    	//Mostramos la textura 0, por defecto
	    	this.enemy.setTexture("snake", 0);
	    }
	    
///////////////////////////////////RENDER HEALTHBAR///////////////////////////////////
		//Actualizamos la barra de vida con la posición del enemigo
		this.healthBar.update(this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height)
		//Si la vida es inferior o igual a 0
	 	if(this.healthBar.health <=0){
	 		//Está muerto
	    	this.dead = true;
	    	//Destruimos sprite
	    	this.enemy.destroy();
	    	//Destruimos barra de vida
	    	this.healthBar.destroy();
	    }
	}//FIN UPDATE
}