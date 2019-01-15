function Platform (scene, x, y, sprite, ymax, ymin){
	this.scene = scene;
	this.plat = this.scene.matter.add.sprite(x,y,sprite);

	this.activated = false;
	this.plat.setFixedRotation()
	this.velocity = 0;
	this.plat.setStatic(true)
	this.goingUp = true;


	this.action = function(){
		this.activated = !this.activated;
	}


	this.update = function(){
		if(this.activated){

			if(this.goingUp){
				this.plat.y -= 2;
			}else{
				this.plat.y += 2;
			}
			
			
			if(this.plat.y + this.plat.height/2 > ymax){
				this.goingUp = true;
			}
			if(this.plat.y - this.plat.height/2< ymin){
				this.goingUp = false;
			}
		
		}
		this.plat.x = x;
	}

}