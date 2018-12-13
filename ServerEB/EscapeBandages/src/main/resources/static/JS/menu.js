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
	this.bplay = this.add.sprite(400, 500, 'play').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.bplay.scaleX -= 0.1;
	this.bplay.scaleY -= 0.1;

	//hacer boton visible
	this.bplay.setAlpha(1);
	//accion al poner el cursor sobre el boton Play
	this.bplay.on('pointerover', function(){
		menu.bplay.scaleX += 0.15;
		menu.bplay.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Play
	this.bplay.on('pointerout', function(){
		menu.bplay.scaleX -= 0.15;
		menu.bplay.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Play
	this.bplay.on('pointerdown', function(){
		//cambio de escena a submenu
		sendMessage("UwUs")
		menu.scene.switch(submenu);
	})
	//console.log(this.bplay);
	
//////////////////////BOTON SILENCIO///////////////////////////////
	//cargar boton Silencio
	this.bnvol = this.add.sprite(1750, 950, 'novolumen').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	//hacer boton visible
	this.bnvol.setAlpha(1);
	//accion al poner el cursor sobre el boton Silencio
	this.bnvol.on('pointerover', function(){
		menu.bnvol.scaleX += 0.15;
		menu.bnvol.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Silencio
	this.bnvol.on('pointerout', function(){
		menu.bnvol.scaleX -= 0.15;
		menu.bnvol.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Silencio
	this.bnvol.on('pointerdown', function(){
		fx.resume();
		//hacer botones invisibles
		menu.bnvol.setAlpha(0);
		//hacer botones visibles
		menu.bvol.setAlpha(1);
	})

//////////////////////BOTON VOLUMEN///////////////////////////////
	//cargar boton Volumen
	this.bvol = this.add.sprite(1750, 950, 'volumen').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	//hacer boton visible
	this.bvol.setAlpha(0);
	//accion al poner el cursor sobre el boton Volumen
	this.bvol.on('pointerover', function(){
		menu.bvol.scaleX += 0.15;
		menu.bvol.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Volumen
	this.bvol.on('pointerout', function(){
		menu.bvol.scaleX -= 0.15;
		menu.bvol.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Volumen
	this.bvol.on('pointerdown', function(){
		fx.pause();
		//hacer botones invisibles
		menu.bvol.setAlpha(0);
		//hacer botones visibles
		menu.bnvol.setAlpha(1);
	})
}

menu.update = function(){}