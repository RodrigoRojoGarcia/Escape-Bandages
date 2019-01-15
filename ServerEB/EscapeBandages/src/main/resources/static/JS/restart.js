var restart = new Phaser.Scene('restart');

restart.preload = function(){

    

}

restart.create = function(){
    myClient.setScene(this);

    this.active = true;
    this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');

    this.add.image(1920/2,1080/2,'shade2');
    this.add.dynamicBitmapText(600, 350, 'font1', 'Seguro que deseas reiniciar?', 70);
    if(gameState == 1){
        offline.scene.pause();
    }
    
    this.yes = new UIButton(this, 650, 800, 'yes', function(){
        restart.active = false;
        if(gameState == 2){
            onRestart = true;
        }else if(gameState == 1){
        	offline.scene.stop(offline)
            offline.scene.start(offline);
            offline.scene.stop(heart);
            offline.scene.launch(heart, offline);
        }
        restart.scene.stop(restart);
	}, function(){
		restart.yes.amplifyScale(0.15,0.15)
	}, function(){
		restart.yes.reduceScale(0.15,0.15)
    })
    
    this.no = new UIButton(this, 1200, 800, 'no', function(){
        restart.active = false;
        if(gameState == 1){
            if(offline.anubisText == 3){
                offline.input.setDefaultCursor('url(Sprites/cetro.png), pointer');
            }
            else{
                offline.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
            }
            offline.scene.resume();
        }
        else if(gameState == 2){
            if(onlineG.anubisText == 3){
                onlineG.input.setDefaultCursor('url(Sprites/cetro.png), pointer');
            }
            else{
                onlineG.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
            }
        }
		restart.scene.stop(restart);
	}, function(){
		restart.no.amplifyScale(0.15,0.15)
	}, function(){
		restart.no.reduceScale(0.15,0.15)
	})
}

restart.update = function(){

}