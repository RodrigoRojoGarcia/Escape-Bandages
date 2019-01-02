function UIButton(scene, posX, posY, sprite, smth){
	that = this
	this.scene = scene
	this.posX = posX
	this.posY = posY
	this.onclick = smth
	
	this.scene.butt = this.scene.add.sprite(posX, posY, sprite).setInteractive({cursor: 'url(Sprites/cursor3.png), pointer'})
	
	this.scene.butt.on('pointerover', function(){
		that.scene.butt.scaleX += 0.15;
		that.scene.butt.scaleY += 0.15;
	})
	
	this.scene.butt.on('pointerout', function(){
		that.scene.butt.scaleX -= 0.15;
		that.scene.butt.scaleY -= 0.15;
	})
	
	
	this.scene.butt.on('pointerdown', this.onclick)
	
	this.setScale = function(scaleX, scaleY){
		this.scene.butt.scaleX -= scaleX;
		this.scene.butt.scaleY -= scaleY;
	}
	
	this.show = function(){
		this.scene.butt.setAlpha(1);
	}
	
	this.hide = function(){
		this.scene.butt.setAlpha(0)
	}
	
}