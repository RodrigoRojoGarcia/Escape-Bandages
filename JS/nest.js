function Nest(scene, x, y, nestSprite, enemySprite, enemyAcc, enemyMaxVel, time, activationZone, maxEnemies){

	this.scene = scene;
	var that = this;
	this.zone = this.scene.matter.add.rectangle(activationZone.x + (activationZone.width/2), activationZone.y + (activationZone.height/2), activationZone.width, activationZone.height, {isSensor: true, isStatic: true})
	this.nest = this.scene.add.sprite(x, y, nestSprite);
    this.activated = false;
    this.numScorpions = 0;
    this.breakEgg = false;
    this.enemies = [];

	function nestBeginSpawn({bodyA, bodyB, pair}){
        if(bodyB === that.zone){
        	if(!that.activated){
                that.activated = true;
                that.genEnemies = setInterval(function(){
                    if(that.numScorpions < maxEnemies){
                        that.enemies[that.numScorpions] = new Enemy(that.scene, x, y, enemySprite, enemyAcc, enemyMaxVel, 50, 100)
                        that.numScorpions++;
                        that.breakEgg = true;
                    }
                }, time)
            }
        }
    }

    function nestStop({bodyA, bodyB, pair}){
        if(bodyB === that.zone){
            if(that.activated){
                that.activated = false;
            }
        }
    }

    this.scene.matterCollision.addOnCollideActive({
        objectA: currentScene.m.getSprite(),
        callback: nestBeginSpawn,
        context: currentScene.m.getSprite()
    })
    this.scene.matterCollision.addOnCollideActive({
        objectA: currentScene.p.getSprite(),
        callback: nestBeginSpawn,
        context: currentScene.p.getSprite()
    })
    this.scene.matterCollision.addOnCollideEnd({
        objectA: currentScene.p.getSprite(),
        callback: nestStop,
        context: currentScene.p.getSprite()
    })
    this.scene.matterCollision.addOnCollideEnd({
        objectA: currentScene.m.getSprite(),
        callback: nestStop,
        context: currentScene.m.getSprite()
    })

    this.deactivate = function(){
        clearInterval(this.genEnemies);
    }

    this.update = function(){
        if(this.breakEgg){
            this.nest.setFrame(1);
        }else{
            this.nest.setFrame(0);
        }

        if(!this.activated){
            this.deactivate();
        }
        
        for(var i = 0; i < this.enemies.length; i++){
            if(!this.enemies[i].dead){
                this.enemies[i].update();
                this.enemies[i].resetColliding();
            }
        }

        for(var i = 0; i < this.enemies.length; i++){
            if(this.enemies[i].dead){
                this.enemies.splice(i, 1);
                this.numScorpions--;
            }
        }

        if(this.numScorpions < 0){
            this.numScorpions = 0;
        }
    }

}