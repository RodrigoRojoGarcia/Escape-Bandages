function God(scene, x, y, sprite){
	this.scene = scene;
	

	this.god = scene.matter.add.sprite(x,y,sprite);
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	const {width: w, height: h} = this.god;
	const mainBody = Bodies.rectangle(0,0,w,h,{chamfer: {radius:10}});
	

	const compoundBody = Body.create({
		parts: [mainBody],
		//isStatic: true,
		isSensor: true
	});


	this.god.setExistingBody(compoundBody).setFixedRotation().setPosition(x,y).setStatic(true);

	this.getSprite = function(){
		return this.god;
	}

	var k;
	this.create = function(){
		if(sprite === "Anubis"){
			k = 'god1';
		}
		if(sprite === "Bastet"){
			k = 'god2';
		}

		//ANIMATIONS
		const anims = scene.anims;
		//Animation to the right
		anims.create({
			key: k,
			frames: anims.generateFrameNumbers(sprite, {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
	}

	this.update = function(){
		//We enter as parameters the sprite from Phaser and the keys to control it
		//var mummy = p;
		
		var player;
		if(sprite === "Anubis"){
			player = p.getX();
		}
		if(sprite === "Bastet"){
			player = m.getX();
		}
		var distance = this.god.x - player;
		var movingForce = 0.1;
	    if (player < this.god.x && distance > 0 && distance < 1000)
	    {
	        this.god.flipX = true;
	    }
	    else if (player > this.god.x  && distance < 0 && distance > -1000)
	    {
	        this.god.flipX = false;

	    }

	    
		this.god.anims.play(k, true);
	}  


}