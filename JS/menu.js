var menu = new Phaser.Scene('Menu');

menu.preload = function(){
	//cargar imagenes
	this.load.image('bgmenu','../Escape-Bandages/Sprites/bgmenu.png');
	this.load.image('title','../Escape-Bandages/Sprites/title.png');
	this.load.image('play','../Escape-Bandages/Sprites/play.png');
	this.load.image('options','../Escape-Bandages/Sprites/options.png');
	this.load.image('back', '../Escape-Bandages/Sprites/back.png');

	this.load.audio('music', '../Escape-Bandages/music.mp3');
}

menu.create = function(){
	fx = this.sound.add('music');
	fx.play();

	//cargar background
	var bground = this.add.image(0, 0, 'bgmenu').setOrigin(0);
	//cargar Title
	this.btit = this.add.sprite(960, 200, 'title');

////////////////////BOTON PLAY/////////////////////////////////
	//cargar boton Play
	this.bplay = this.add.sprite(400, 500, 'play').setInteractive();
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
		menu.scene.switch(submenu);
	})
	//console.log(this.bplay);
	
//////////////////////BOTON OPTIONS///////////////////////////////
	//cargar boton Options
	this.bopt = this.add.sprite(1700, 900, 'options').setInteractive();
	//hacer boton visible
	this.bopt.setAlpha(1);
	//accion al poner el cursor sobre el boton Options
	this.bopt.on('pointerover', function(){
		menu.bopt.scaleX += 0.15;
		menu.bopt.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Options
	this.bopt.on('pointerout', function(){
		menu.bopt.scaleX -= 0.15;
		menu.bopt.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Options
	this.bopt.on('pointerdown', function(){
		fx.pause();
		/*//hacer botones invisibles
		menu.bopt.setAlpha(0);
		menu.bplay.setAlpha(0);
		menu.bout.setAlpha(0);
		menu.btit.setAlpha(0);
		//hacer botones visibles
		menu.bback.setAlpha(1);*/
	})
}

menu.update = function(){}