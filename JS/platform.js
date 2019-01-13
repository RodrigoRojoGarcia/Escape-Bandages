function Platform (scene, x, y, sprite, ymax, ymin){
	this.scene = scene;


	this.plat = this.scene.matter.add.sprite(x,y,sprite);

	this.activated = false;
	this.plat.setAngle(90)
	this.plat.setFixedRotation()
	this.velocity = 0;
	this.plat.setStatic(true)
	this.goingUp = true




	this.action = function(){
		this.activated = !this.activated;
		if(this.activated){
			if(this.goingUp){
				this.velocity = -2
			}else{
				this.velocity = 2
			}
			
			this.plat.setStatic(false)
		}else{
			this.plat.setStatic(true)
		}
	}


	this.update = function(){
		if(this.activated){
			
			
			if(this.plat.y + this.plat.height/2 > ymax){
				this.velocity = -2
				this.goingUp = true;
			}
			if(this.plat.y - this.plat.height/2< ymin){
				this.velocity = 2
				this.goingUp = false;
			}
		}else{
			
			this.velocity = 0
		}
		this.plat.setVelocityY(this.velocity)
		this.plat.x = x;
	}

}