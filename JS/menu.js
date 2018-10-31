var menu = new Phaser.Scene('Menu');

menu.init = function(){}

menu.preload = function(){
	//cargar imagenes
	this.load.image('play','../Escape-Bandages/Sprites/play.png');
	this.load.image('options','../Escape-Bandages/Sprites/options.png');
	this.load.image('off', '../Escape-Bandages/Sprites/offline.png');
	this.load.image('on', '../Escape-Bandages/Sprites/online.png');
	this.load.image('back', '../Escape-Bandages/Sprites/back.png');
}

menu.create = function(){
	/////////////////////BOTON PLAY/////////////////////////////////
	//cargar boton Play
	this.bplay = this.add.sprite(w/6, h/6, 'play').setInteractive();
	//hacer boton visible
	this.bplay.setAlpha(1);
	//accion al hacer click sobre el boton Play
	this.bplay.on('pointerdown', function(){
		//hacer botones invisibles
		menu.bplay.setAlpha(0);
		menu.bopt.setAlpha(0);
		//hacer botones visibles
		menu.boff.setAlpha(1);
		menu.bon.setAlpha(1);
		menu.bback.setAlpha(1);
	})
	//console.log(this.bplay);

	/////////////////////BOTON OFFLINE//////////////////////////////
	//cargar boton Offline
	this.boff = this.add.sprite(w/2+150, h/2, 'off').setInteractive();
	//hacer boton invisible
	this.boff.setAlpha(0);
	//accion al hacer click sobre el boton Offline
	this.boff.on('pointerdown', function(){
		//cambio de escena
		menu.scene.switch(offline);
	})

	/////////////////////BOTON ONLINE//////////////////////////////
	//cargar boton Online
	this.bon = this.add.sprite(w/2-150, h/2, 'on').setInteractive();
	//hacer boton invisible
	this.bon.setAlpha(0);
	//accion al hacer click sobre el boton Online
	this.bon.on('pointerdown', function(){

	})
	
	//////////////////////BOTON OPTIONS///////////////////////////////
	//cargar boton Options
	this.bopt = this.add.sprite(w-100, h-100, 'options').setInteractive();
	//hacer boton visible
	this.bopt.setAlpha(1);
	//accion al hacer click sobre el boton Options
	this.bopt.on('pointerdown', function(){
		//hacer botones invisibles
		menu.bopt.setAlpha(0);
		menu.bplay.setAlpha(0);
		//hacer botones visibles
		menu.bback.setAlpha(1);
	})

	//////////////////////BOTON BACK////////////////////////////////
	//cargar boton Back
	this.bback = this.add.sprite(w-100, h-100, 'back').setInteractive();
	//hacer boton invisible
	this.bback.setAlpha(0);
	//accion al hacer click sobre el boton Back
	this.bback.on('pointerdown', function(){
		//hacer botones invisibles
		menu.boff.setAlpha(0);
		menu.bon.setAlpha(0);
		menu.bback.setAlpha(0);
		//hacer botones visibles
		menu.bplay.setAlpha(1);
		menu.bopt.setAlpha(1);
	})
}

menu.update = function(){
	//this.bplay.angle +=5;
}