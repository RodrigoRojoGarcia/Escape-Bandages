function Nest(scene, x, y, nestSprite, enemySprite, enemyAcc, enemyMaxVel, time, activationZone, maxEnemies){

	this.scene = scene;
	var that = this;
	this.zone = this.scene.matter.add.rectangle(activationZone.x + (activationZone.width/2), activationZone.y + (activationZone.height/2), activationZone.width, activationZone.height, {isSensor: true, isStatic: true})
	this.nest = this.scene.add.sprite(x, y, nestSprite);
    this.activated = false;
    this.numScorpions = 0;
    this.breakEgg = false;

	function nestBeginSpawn({bodyA, bodyB, pair}){
        if(bodyB === that.zone){
        	if(!that.activated){
                that.activated = true;
                that.scene.genEnemies = setInterval(function(){
                    if(that.numScorpions < maxEnemies){
                        that.scene.enemies[level2.numEnemies] = new Enemy(that.scene, x, y, enemySprite, enemyAcc, enemyMaxVel, 50, 100)
                        that.scene.numEnemies++;;
                        that.numScorpions++;
                        that.breakEgg = true;
                    }
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

    this.update = function(){
        if(this.breakEgg){
            that.nest.setFrame(1);
        }else{
            that.nest.setFrame(0);
        }

        for(var i = 0; i < this.scene.enemies.length; i++){
            if(this.scene.enemies[i].dead){
                this.scene.enemies.splice(i, 1);
                this.scene.numEnemies = this.scene.enemies.length;
                this.numScorpions--;
            }
        }
    }

}