function healthBar (maxHealth, x, y, width, height) {
	this.maxHealth = maxHealth;

	this.health = maxHealth;


	this.update = function(x,y,width,height){
		graphics.setPosition(x,y)
		var xRec = -(width/2)
		var yRec = -(height/2)
		graphics.clear();
		graphics.fillStyle(0x00ff00)
		graphics.fillRect(xRec,yRec,width*(this.health/this.maxHealth),5);
		graphics.fillStyle(0xff0000)
		graphics.fillRect(xRec+width*(this.health/this.maxHealth),yRec,width-width*(this.health/this.maxHealth),5);
	}
	this.damage = function(dmg){
		this.health -= dmg;
	}
}