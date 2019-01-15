function UIButton(scene, posX, posY, sprite, onclick, over, out){
	var that = this
	this.scene = scene
	this.posX = posX
	this.posY = posY
	this.onclick = onclick
	this.onover = over
	this.onout = out
	
	this.butt = this.scene.add.sprite(posX, posY, sprite).setInteractive({cursor: 'url(Sprites/cursor3.png), pointer'})
	
	this.butt.on('pointerover', this.onover)
	
	this.butt.on('pointerout', this.onout)
	
	
	this.butt.on('pointerdown', this.onclick)
	
	this.reduceScale = function(scaleX, scaleY){
		this.butt.scaleX -= scaleX;
		this.butt.scaleY -= scaleY;
	}
	
	this.amplifyScale = function(scaleX, scaleY){
		this.butt.scaleX += scaleX;
		this.butt.scaleY += scaleY;
	}
	
	this.show = function(){
		this.butt.setAlpha(1);
	}
	
	this.hide = function(){
		this.butt.setAlpha(0)
	}
	this.setTint = function(tint){
		this.butt.setTint(tint)
	}
}