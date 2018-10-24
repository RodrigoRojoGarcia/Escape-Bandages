function Button(scene, x, y, sprite){
	this.active = false;
	//boolean que dice si el boton esta activado
	this.button = scene.matter.add.sprite(x, y, sprite);


	this.activating = function(elem){
		elem = true;
	}
	//Activa un booleano que le metemos (puertas o lo que sea)

	this.create = function(){
		const anims = scene.anims;

		anims.create({
			key: 'pushed',
			frames: anims.generateFrameNumbers('Mummy', {start: 0, end: 1}),
			frameRate: 10,
			repeat: 0

		});
	}

	this.update = function(){
		if(p.isColliding.bottom && !this.active || m.isColliding.bottom && !this.active){
			this.active = true;
		}
		if(this.active){
			this.button.setTexture(sprite, 1);
		}else{
			this.button.setTexture(sprite, 0);
		}


	}
}