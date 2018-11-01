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
	//accion al poner el cursor sobre el boton Play
	this.boff.on('pointerover', function(){
		menu.boff.scaleX += 0.15;
		menu.boff.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Play
	this.boff.on('pointerout', function(){
		menu.boff.scaleX -= 0.15;
		menu.boff.scaleY -= 0.15;
	})
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
	//accion al poner el cursor sobre el boton Play
	this.bon.on('pointerover', function(){
		menu.bon.scaleX += 0.15;
		menu.bon.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Play
	this.bon.on('pointerout', function(){
		menu.bon.scaleX -= 0.15;
		menu.bon.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Online
	this.bon.on('pointerdown', function(){

	})
	
	//////////////////////BOTON OPTIONS///////////////////////////////
	//cargar boton Options
	this.bopt = this.add.sprite(w-100, h-100, 'options').setInteractive();
	//hacer boton visible
	this.bopt.setAlpha(1);
	//accion al poner el cursor sobre el boton Play
	this.bopt.on('pointerover', function(){
		menu.bopt.scaleX += 0.15;
		menu.bopt.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Play
	this.bopt.on('pointerout', function(){
		menu.bopt.scaleX -= 0.15;
		menu.bopt.scaleY -= 0.15;
	})
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
	//accion al poner el cursor sobre el boton Play
	this.bback.on('pointerover', function(){
		menu.bback.scaleX += 0.15;
		menu.bback.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Play
	this.bback.on('pointerout', function(){
		menu.bback.scaleX -= 0.15;
		menu.bback.scaleY -= 0.15;
	})
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

menu.update = function(){}