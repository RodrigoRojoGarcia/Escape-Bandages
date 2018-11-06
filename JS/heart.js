function heart(player){
	var spriteWidth = 65;
	var spriteHeight = 65;
	this.life = 3;
	this.health = []
	var player = player;
	if(player==="Pharaoh"){
		
		for(var i =0;i<3;i++){
			this.health[i] = scene.add.image(cameraPharaoh.worldView.left+(spriteWidth/2)+(spriteWidth*i),cameraPharaoh.worldView.bottom-(spriteHeight/2),'heart');
			cameraMummy.ignore(this.health[i])
		}
	}else if(player==="Mummy"){
		
		for(var i =0;i<3;i++){
			this.health[i] = scene.add.image(cameraMummy.worldView.left+(spriteWidth/2)+(spriteWidth*i),cameraMummy.worldView.bottom-(spriteHeight/2),'heart');
			cameraPharaoh.ignore(this.health[i])
		}
	}
	this.update = function(){
			if(player==="Pharaoh"){
				for(var i =0;i<this.life;i++){
					if(p.moving){
						if(p.getSprite().flipX){
							this.health[i].x = cameraPharaoh.worldView.left+(spriteWidth/2)+(spriteWidth*i)-5
							this.health[i].y = cameraPharaoh.worldView.bottom-(spriteHeight/2)
						}else{
							this.health[i].x = cameraPharaoh.worldView.left+(spriteWidth/2)+(spriteWidth*i)+5
							this.health[i].y = cameraPharaoh.worldView.bottom-(spriteHeight/2)
						}
					}else{
						this.health[i].x = cameraPharaoh.worldView.left+(spriteWidth/2)+(spriteWidth*i)
						this.health[i].y = cameraPharaoh.worldView.bottom-(spriteHeight/2)
					}
					
				}
				
			}else if(player==="Mummy"){
				for(var i =0;i<this.life;i++){
					if(m.moving){
						if(m.getSprite().flipX){
							this.health[i].x = cameraMummy.worldView.left+(spriteWidth/2)+(spriteWidth*i)-5
							this.health[i].y = cameraMummy.worldView.bottom-(spriteHeight/2)
						}else{
							this.health[i].x = cameraMummy.worldView.left+(spriteWidth/2)+(spriteWidth*i)+5
							this.health[i].y = cameraMummy.worldView.bottom-(spriteHeight/2)
						}
					}else{
						this.health[i].x = cameraMummy.worldView.left+(spriteWidth/2)+(spriteWidth*i)
						this.health[i].y = cameraMummy.worldView.bottom-(spriteHeight/2)
					}
					
				}
				
			}
			
		

	}

	this.getHit = function(){
		this.life -=1;
		if(this.life === 2){
			this.health[2].destroy()
		}else if(this.life===1){
			this.health[1].destroy()
		}else if(this.life===0){
			this.health[0].destroy()
			if(player==="Pharaoh"){
				p.dead = true;
			}else if(player==="Mummy"){
				m.dead = true;
			}
		}
	}

}