function Button(scene, x, y){
	this.active = false;
	//boolean que dice si el boton esta activado
	this.button = scene.matter.add.sprite(x, y, 'button');
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	const {width: w, height: h} = this.button;
	const mainBody = Bodies.rectangle(0,0,w,h*0.5);
	this.sensors = {
		top: Bodies.rectangle(w*0.25,-h*0.5,w*0.75,h*0.5, {isSensor: true})
	};

	const compoundBody = Body.create({
		parts: [mainBody, this.sensors.top],
		isStatic: true
	});
	this.button.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y+46);

	this.isColliding = {top: false};

	this.onSensorCollide = function({bodyA, bodyB, pair}){
		if(bodyB.isSensor){
			return;
		}
		if(bodyA===this.sensors.top){
			this.isColliding.top = true;
		}
	}

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

	this.resetColliding = function(){
		this.isColliding.top = false;
	}

	this.activating = function(elem){
		elem = true;
	}
	//Activa un booleano que le metemos (puertas o lo que sea)

	this.create = function(){
		const anims = scene.anims;

		anims.create({
			key: 'pushed',
			frames: anims.generateFrameNumbers('button', {start: 0, end: 1}),
			frameRate: 10,
			repeat: 0

		});
	}

	this.update = function(){

		if(this.isColliding.top){
			console.log("wiii");
			this.active = true;
		}
		if(this.active){
			this.button.setTexture('button', 1);
		}else{
			this.button.setTexture('button', 0);
		}


	}
}