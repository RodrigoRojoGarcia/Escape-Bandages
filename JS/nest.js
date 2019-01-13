function Nest(scene, x, y, nestSprite, enemySprite, enemyAcc, enemyMaxVel, time, activationZone){

	this.scene = scene;
	var that = this;
	this.zone = this.scene.matter.add.rectangle(activationZone.x + (activationZone.width/2), activationZone.y + (activationZone.height/2), activationZone.width, activationZone.height, {isSensor: true, isStatic: true})
	this.nest = this.scene.add.sprite(x, y, nestSprite);
    this.activated = false;

	function nestBeginSpawn({bodyA, bodyB, pair}){
        if(bodyB === that.zone){
        	if(!that.activated){
                that.activated = true
                that.scene.genEnemies = setInterval(function(){
                    that.scene.enemies[level2.numEnemies] = new Enemy(that.scene, x, y, enemySprite, enemyAcc, enemyMaxVel)
                    that.scene.numEnemies++;
                }, time)
            }
            
        }
    }

    this.scene.matterCollision.addOnCollideStart({
        objectA: currentScene.m.getSprite(),
        callback: nestBeginSpawn,
        context: currentScene.m.getSprite()
    })
    this.scene.matterCollision.addOnCollideStart({
        objectA: currentScene.p.getSprite(),
        callback: nestBeginSpawn,
        context: currentScene.p.getSprite()
    })

    this.deactivate = function(){
        clearInterval(this.scene.genEnemies)
    }

}