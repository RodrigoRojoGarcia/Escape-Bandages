var restart = new Phaser.Scene('restart');

restart.preload = function(){

}

restart.create = function(){

    this.active = true;
    this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');

    this.add.image(1920/2,1080/2,'shade2');
    this.add.dynamicBitmapText(600, 350, 'font1', 'Seguro que deseas reiniciar?', 70);
   
    currentScene.scene.pause();
    
    
    this.yes = new UIButton(this, 650, 800, 'yes', function(){
        restart.active = false;
        
        for(var i = 0; i < currentScene.nests.length; i++){
            currentScene.nests[i].deactivate();
        }
        
        currentScene.scene.restart();
        currentScene.scene.stop(heart);
        currentScene.scene.launch(heart, currentScene);
        
        restart.scene.stop(restart);
	}, function(){
		restart.yes.amplifyScale(0.15,0.15)
	}, function(){
		restart.yes.reduceScale(0.15,0.15)
    })
    
    this.no = new UIButton(this, 1200, 800, 'no', function(){
        restart.active = false;
        if(offline.anubisText == 3){
            offline.input.setDefaultCursor('url(Sprites/cetro.png), pointer');
        }
        else{
            offline.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
        }
        currentScene.scene.resume();
       
		restart.scene.stop(restart);
	}, function(){
		restart.no.amplifyScale(0.15,0.15)
	}, function(){
		restart.no.reduceScale(0.15,0.15)
	})
}

restart.update = function(){

}