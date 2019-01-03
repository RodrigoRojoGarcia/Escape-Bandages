//crear escena Menu Principal
var menu = new Phaser.Scene('Menu');

menu.preload = function(){
	//cargar imagenes
	//background
	this.load.image('bgmenu','Sprites/bgmenu.png');
	//Escape Bandages
	this.load.image('title','Sprites/title.png');
	//boton play
	this.load.image('play','Sprites/play.png');
	//botones volumenes
	this.load.image('novolumen','Sprites/novolumen.png');
	this.load.image('volumen','Sprites/volumen.png');

	//cargar audio
	this.load.audio('music', 'music.mp3');
}

menu.create = function(){
	
	
	
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//cargar letras Escape Bandages
	this.btit = this.add.sprite(960, 200, 'title')
	//inicializar musica
	fx = this.sound.add('music');
	fx.play();
	fx.pause();
	//cargar background
	var bground = this.add.image(0, 0, 'bgmenu').setOrigin(0);
	//cargar Title
	this.btit = this.add.sprite(960, 200, 'title');

////////////////////BOTON PLAY/////////////////////////////////
	//cargar boton Play
	this.bplay = new UIButton(this, 400, 500, 'play', function(){
		//cambio de escena a submenu
		
		menu.scene.switch(submenu);
	}, function(){
		menu.bplay.amplifyScale(0.15,0.15)
	}, function(){
		menu.bplay.reduceScale(0.15,0.15)
	})
	this.bplay.reduceScale(0.1, 0.1);
	this.bplay.show();
	
	
//////////////////////BOTON SILENCIO///////////////////////////////
	
	this.bnvol = new UIButton(this, 1750, 950, 'novolumen', function(){
		fx.resume();
		//hacer botones invisibles
		menu.bnvol.hide();
		//hacer botones visibles
		menu.bvol.show();
	}, function(){
		menu.bnvol.amplifyScale(0.15,0.15)
	}, function(){
		menu.bnvol.reduceScale(0.15,0.15)
	}
	)
	
	this.bnvol.show();

//////////////////////BOTON VOLUMEN///////////////////////////////
	
	this.bvol = new UIButton(this, 1750, 950, 'volumen', function(){
		fx.pause();
		//hacer botones invisibles
		menu.bvol.hide();
		//hacer botones visibles
		menu.bnvol.show();
	}, function(){
		menu.bvol.amplifyScale(0.15,0.15)
	}, function(){
		menu.bvol.reduceScale(0.15,0.15)
	})
	this.bvol.hide()
	
}

menu.update = function(){}