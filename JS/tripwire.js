function Tripwire (scene, x, y, sprite, callback){ //x e y en tiles del mapa
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	this.scene = scene
	var that = this;
	var posx = x*120 + 97.5
	var posy = y*120 + 60

	this.tripwire = this.scene.matter.add.sprite(posx, posy, sprite)
	var sensor = Bodies.rectangle(posx, posy, this.tripwire.width+20, this.tripwire.height, {isSensor:true, isStatic:true})
	this.tripwire.setExistingBody(sensor)

	function tripwireAction({bodyA, bodyB, pair}){
			
			if(currentScene.m.onHit){
				this.justOnce = true;
				if(bodyB === currentScene.m.shackle[8].body){
					callback();
				}
			}

		
	}


	this.scene.matterCollision.addOnCollideStart({
		objectA: that.tripwire,
		callback: tripwireAction,
		context: that.tripwire
	})


}