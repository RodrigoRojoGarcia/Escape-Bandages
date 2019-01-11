var pause = new Phaser.Scene('pause');

pause.preload = function(){

}

pause.create = function(){

    this.active = true;
    this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');

    this.add.image(1920/2,1080/2,'shade2');
    this.add.dynamicBitmapText(600, 350, 'font1', 'Seguro que deseas salir?', 70);
    if(gameState == 1){
        offline.scene.pause();
    }
    

    this.yes = new UIButton(this, 650, 800, 'yes', function(){
        pause.active = false;
        if(gameState == 2){
            onOut = true;
        }else if(gameState == 1){
            offline.scene.start(submenu);
            offline.scene.stop(heart);
        }
        pause.scene.stop(pause);
	}, function(){
		pause.yes.amplifyScale(0.15,0.15)
	}, function(){
		pause.yes.reduceScale(0.15,0.15)
    })
    
    this.no = new UIButton(this, 1200, 800, 'no', function(){
        pause.active = false;
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
		pause.scene.stop(pause);
	}, function(){
		pause.no.amplifyScale(0.15,0.15)
	}, function(){
		pause.no.reduceScale(0.15,0.15)
	})
}

pause.update = function(){

}