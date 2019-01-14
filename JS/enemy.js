function Enemy(scene, x, y, sprite, acc, vel, mummyDmg, pharaohDmg){
		var scene = scene;
		const {Body, Bodies} = Phaser.Physics.Matter.Matter;
		
	///////////////////////////////////CREACIÓN///////////////////////////////////
		//Sprite
		this.enemy = scene.matter.add.sprite(x,y,sprite);
		const {width: w, height: h} = this.enemy;
		//Cuerpo del enemigo
		const mainBody = Bodies.rectangle(0,0,w*0.6,h,{chamfer: {radius:10}});
		//Sensores de abajo, izquierda y derecha
		this.sensors = {
			bottom: Bodies.rectangle(0,h*0.5,w*0.25,2, {isSensor: true}),
			left: Bodies.rectangle(-w*0.35,0,2,h*0.8, {isSensor: true}),
			right: Bodies.rectangle(w*0.35,0,2,h*0.7, {isSensor: true})
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
		this.healthBar = new healthBar(scene, 100, this.enemy.x-(this.enemy.width/2), this.enemy.y-(this.enemy.height/2)+5,this.enemy.width,5);
		//Está muerto?
		this.dead = false;
		this.onAir=false;
		var walk;
		var stay;
		this.acceleration = acc;
		this.maxVelocity = vel;
	///////////////////////////////////COLISIONES///////////////////////////////////
		//Cuando colisiona un sensor del mainBody
		this.onSensorCollide = function({bodyA, bodyB, pair}){
			//Si el bodyB es alguna parte de la cuerda de la momia
			if(bodyB === scene.m.shackle[0].body || bodyB === scene.m.shackle[1].body || bodyB === scene.m.shackle[2].body|| bodyB === scene.m.shackle[3].body || bodyB === scene.m.shackle[4].body||bodyB === scene.m.shackle[5].body||bodyB === scene.m.shackle[6].body||bodyB === scene.m.shackle[7].body||bodyB === scene.m.shackle[8].body){
				//Si la momia está atacando
				if(scene.m.onHit){
					//Quitamos vida al enemigo
					this.healthBar.damage(mummyDmg)
					//Ya me has atacado una vez, ya no estás atacando
					scene.m.onHit = false;
					if(bodyA === this.sensors.left){
						this.enemy.x += 25;
					}
					if(bodyA === this.sensors.right){
						
						this.enemy.x -= 25;
					}
					this.enemy.setTint(0xff3333)
					scene.time.addEvent({
						delay: 300,
						callback: ()=>(this.enemy.setTint(0xffffff)),
						callbackScope: scene
					});
				}
			}
			if(bodyB === scene.p.fire[0].body ||bodyB === scene.p.fire[1].body ||bodyB === scene.p.fire[2].body){
				if(scene.p.onHit){
					this.healthBar.damage(pharaohDmg)
					scene.p.onHit = false
					if(bodyA === this.sensors.left){
					this.enemy.x += 12;
					}
					if(bodyA === this.sensors.right){
						this.enemy.x -= 12;
					}
					this.enemy.setTint(0xff3333)
					scene.time.addEvent({
						delay: 300,
						callback: ()=>(this.enemy.setTint(0xffffff)),
						callbackScope: scene
					});
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


		if(sprite === 'snake'){
			walk = 'rightS'
			stay = 'stayRightS'
		}
		if(sprite === 'scorpion'){
			walk = 'walkScor'
			stay = 'stayScor'
		}


	///////////////////////////////////UPDATE///////////////////////////////////
		this.update = function(){
			//Fuerza que se va a añadir para hacer el movimiento más fluido (y permitir que mueva cosas)
			var distanceMX = Infinity;
			var distanceMY = false;
			var distancePX = Infinity;
			var distancePY = false;

			if(!scene.m.dead){
				distanceMX = this.enemy.x - scene.m.getX()
				if(Math.abs(this.enemy.y - scene.m.getY()) < 240)
				distanceMY = true
			}
			if(!scene.p.dead){
				distancePX = this.enemy.x - scene.p.getX();
				if(Math.abs(this.enemy.y - scene.p.getY()) < 240)
				distancePY = true;
			}
			if(!(distanceMX === Infinity && distancePX === Infinity)){
				if(distanceMY && distancePY){
					if(distanceMX < distancePX){
						if (distanceMX > 0 && distanceMX < 600)
						{
							//Nos movemos a la izquierda
							this.enemy.applyForce({x:-this.acceleration, y:0});
							//Miramos a la izquierda
							this.enemy.flipX = true;
						}
						//Si está a la derecha del enemigo y sus distancia es menor a 400
						else if (distanceMX < 0 && distanceMX > -600)
						{
							//Nos movemos a la derecha
							this.enemy.applyForce({x:this.acceleration, y:0});
							//Miramos a la derecha
							this.enemy.flipX = false;
						}
							//Si no está cerca de ninguno y está tocando el suelo
							else if(this.isColliding.bottom){
							//Velocidad a 0
							this.enemy.setVelocityX(0);    
						}
					}else if(distancePX <= distanceMX){
						if (distancePX > 0 && distancePX < 600)
						{
							//Nos movemos a la izquierda
							this.enemy.applyForce({x:-this.acceleration, y:0});
							//Miramos a la izquierda
							this.enemy.flipX = true;
						}
						//Si está a la derecha del enemigo y sus distancia es menor a 400
						else if (distancePX < 0 && distancePX > -600)
						{
							//Nos movemos a la derecha
							this.enemy.applyForce({x:this.acceleration, y:0});
							//Miramos a la derecha
							this.enemy.flipX = false;

						}
						//Si no está cerca de ninguno y está tocando el suelo
						else if(this.isColliding.bottom){
							//Velocidad a 0
							this.enemy.setVelocityX(0);    
						}
					}
				}else if(distanceMY){
					if (distanceMX > 0 && distanceMX < 600)
					{
						//Nos movemos a la izquierda
						this.enemy.applyForce({x:-this.acceleration, y:0});
						//Miramos a la izquierda
						this.enemy.flipX = true;
					}
					//Si está a la derecha del enemigo y sus distancia es menor a 400
					else if (distanceMX < 0 && distanceMX > -600)
					{
						//Nos movemos a la derecha
						this.enemy.applyForce({x:this.acceleration, y:0});
						//Miramos a la derecha
						this.enemy.flipX = false;
					}
					//Si no está cerca de ninguno y está tocando el suelo
					else if(this.isColliding.bottom){
					//Velocidad a 0
					this.enemy.setVelocityX(0);    
					}
				}else if(distancePY){
					if (distancePX > 0 && distancePX < 600)
					{
						//Nos movemos a la izquierda
						this.enemy.applyForce({x:-this.acceleration, y:0});
						//Miramos a la izquierda
						this.enemy.flipX = true;
					}
					//Si está a la derecha del enemigo y sus distancia es menor a 400
					else if (distancePX < 0 && distancePX > -600)
					{
						//Nos movemos a la derecha
						this.enemy.applyForce({x:this.acceleration, y:0});
						//Miramos a la derecha
						this.enemy.flipX = false;

					}
					//Si no está cerca de ninguno y está tocando el suelo
					else if(this.isColliding.bottom){
						//Velocidad a 0
						this.enemy.setVelocityX(0);    
					}
				}
			}
			


			if(this.isColliding.bottom && (this.isColliding.left || this.isColliding.right)){
				this.enemy.setVelocityY(-6)
			}
			//PONER VELOCIDAD MÁXIMA DEL SPRITE EN |0.5|
			//Si la velocidad del sprite supera 0.5
			if(this.enemy.body.velocity.x > this.maxVelocity){
				//Dejamos la velocidad en 0.5
				this.enemy.setVelocityX(this.maxVelocity);
			}
			//Si la velocidad del sprite baja de -0.5
			else if(this.enemy.body.velocity.x < -this.maxVelocity){
				//Dejamos la velocidad en 0.5
				this.enemy.setVelocityX(-this.maxVelocity);
			}


			//Si estamos en el suelo
			if(this.isColliding.bottom){
				//Si la fuerza en X del sprite no es 0
				if(this.enemy.body.velocity.x !== 0){
					//Reproducimos la animación de andar
					this.enemy.anims.play(walk, true);
				}
				//Si la velocidad es 0
				else{
					//Reproducimos la animación de estar quieto
					this.enemy.anims.play(stay, true);
				}
			}
			//Si no está tocando el suelo
			else{
				//Paramos la animación
				this.enemy.anims.stop();
				//Mostramos la textura 0, por defecto
				this.enemy.setTexture(sprite, 0);
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