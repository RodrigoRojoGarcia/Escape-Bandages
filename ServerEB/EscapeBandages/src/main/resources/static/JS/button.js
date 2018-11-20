function Button(scene, x, y){
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
///////////////////////////////////CREACIÓN///////////////////////////////////
	//Sprite
	this.button = scene.matter.add.sprite(x, y, 'button');
	const {width: w, height: h} = this.button;
	//Cuerpo del botón
	const mainBody = Bodies.rectangle(0,0,w,h*0.5);
	//Sensor del activador
	this.sensors = {
		top: Bodies.rectangle(0,-h*0.5,80,h*0.5, {isSensor: true})
	};
	//Composición de las dos partes del cuerpo
	const compoundBody = Body.create({
		parts: [mainBody, this.sensors.top],
		isStatic: true
	});
	//Cambiamos el mainBody del sprite
	this.button.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y+46);

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Si hay colisión con el activador
	this.isColliding = {top: false};
	//boolean que dice si el boton esta activado
	this.active = false;
	
///////////////////////////////////COLISIONES///////////////////////////////////
	//Cuando colisiona un sensor del mainBody
	this.onSensorCollide = function({bodyA, bodyB, pair}){
		//Si con lo que colisiona es un sensor: no hacemos nada
		if(bodyB.isSensor){
			return;
		}
		//Si colisiona el sensor del activador
		if(bodyA===this.sensors.top){
			//Estamos colisionando con el activador
			this.isColliding.top = true;
		}
	}

	//Eventos que llaman a onSensorCollide cuando los sensores empiezan a colisionar con cualquier cosa y cuando están colisionando con cualquier cosa
	scene.matterCollision.addOnCollideStart({
		objectA: [this.sensors.top],
		callback: this.onSensorCollide,
		context: this
	});

	scene.matterCollision.addOnCollideActive({
		objectA: [this.sensors.top],
		callback: this.onSensorCollide,
		context: this
	});

///////////////////////////////////MÉTODOS///////////////////////////////////
	//Poner todas las colisiones a false
	this.resetColliding = function(){
		this.isColliding.top = false;
	}
	//Activa un booleano si está activo el botón
	this.activating = function(elem){
		//Si está activo
		if(this.active){
			//Pone el elemento a true
			elem = true;
		}
	}

///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(){
		//Si hay colisión en el activador
		if(this.isColliding.top){
			//Nos activamos
			this.active = true;
		}else{
			//Si no nos desactivamos
			this.active = false;
		}
		//Si estamos activos
		if(this.active){
			//Mostramos textura de activo
			this.button.setTexture('button', 1);
		}else{
			//Si no estamos, mostramos textura de inactivo
			this.button.setTexture('button', 0);
		}


	} //FIN UPDATE
}