var pause = new Phaser.Scene('pause');

pause.preload = function(){
    this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');
    this.load.image('shade2','Sprites/shade2.png');
    this.load.image('yes','Sprites/si.png');
    this.load.image('no','Sprites/no.png');
}

pause.create = function(){
    this.add.image(1920/2,1080/2,'shade2');
    this.add.dynamicBitmapText(600, 350, 'font1', 'Seguro de que deseas salir?', 70);

    this.yes = new UIButton(this, 650, 800, 'yes', function(){
        onOut = true;
        pause.scene.stop(pause);
	}, function(){
		pause.yes.amplifyScale(0.15,0.15)
	}, function(){
		pause.yes.reduceScale(0.15,0.15)
    })
    
    this.no = new UIButton(this, 1200, 800, 'no', function(){
		pause.scene.stop(pause);
	}, function(){
		pause.no.amplifyScale(0.15,0.15)
	}, function(){
		pause.no.reduceScale(0.15,0.15)
	})
}

pause.update = function(){

}