function Platform (scene, x, y, sprite, ymax, ymin){
	this.scene = scene;

	this.plat = this.scene.matter.add.sprite(x,y,sprite);

	this.activated = false;
	this.plat.setAngle(90)

	this.velocity = 2;

	this.action = function(){
		this.activated = !this.activated;
	}


	this.update = function(){
		if(this.activated){
			this.plat.setVelocityY(this.velocity)
			
			if(this.plat.y + this.plat.height/2 > ymax){
				this.velocity = -2
			}
			if(this.plat.y - this.plat.height/2< ymin){
				this.velocity = 2
			}
		}else{
			
			this.plat.setVelocityY(0)
		}
		
	}

}