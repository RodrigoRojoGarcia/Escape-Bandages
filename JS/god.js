function God(scene, x, y){
	this.scene = scene;
	

	this.god = scene.add.sprite(x,y,'Anubis');
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	const {width: w, height: h} = this.god;
	
	this.god.depth = 0



	this.getSprite = function(){
		return this.god;
	}

	this.create = function(){
		
		
		//ANIMATIONS
		const anims = scene.anims;
		//Animation to the right
		anims.create({
			key: 'StayGod',
			frames: anims.generateFrameNumbers('Anubis', {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
	}

	this.update = function(){
		//We enter as parameters the sprite from Phaser and the keys to control it
		//var mummy = p;
		
		var pharaoh = p.getX();
		var distance = this.god.x - pharaoh;
		var movingForce = 0.1;
	    if (pharaoh < this.god.x && distance > 0 && distance < 1000)
	    {
	        this.god.flipX = true;
	    }
	    else if (pharaoh > this.god.x  && distance < 0 && distance > -1000)
	    {
	        this.god.flipX = false;

	    }

	    
		this.god.anims.play("StayGod", true);
	}  


}