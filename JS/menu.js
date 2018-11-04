var menu = new Phaser.Scene('Menu');

menu.init = function(){}

menu.preload = function(){
	//cargar imagenes
	this.load.image('title','../Escape-Bandages/Sprites/title.png');
	this.load.image('play','../Escape-Bandages/Sprites/play.png');
	this.load.image('out','../Escape-Bandages/Sprites/salir.png');
	this.load.image('options','../Escape-Bandages/Sprites/options.png');
	this.load.image('back', '../Escape-Bandages/Sprites/back.png');
}

menu.create = function(){
/////////////////////BOTON TITLE//////////////////////////////
	//cargar boton Title
	this.btit = this.add.sprite(960, 200, 'title').setInteractive();
	//hacer boton visible
	this.btit.setAlpha(1);

////////////////////BOTON PLAY/////////////////////////////////
	//cargar boton Play
	this.bplay = this.add.sprite(400, 500, 'play').setInteractive();
	this.bplay.scaleX -= 0.2;
	this.bplay.scaleY -= 0.2;
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
		//hacer botones invisibles
		menu.bopt.setAlpha(0);
		menu.bplay.setAlpha(0);
		menu.bout.setAlpha(0);
		menu.btit.setAlpha(0);
		//hacer botones visibles
		menu.bback.setAlpha(1);
	})

//////////////////////BOTON SALIR///////////////////////////////
	//cargar boton Salir
	this.bout = this.add.sprite(400, 700, 'out').setInteractive();
	this.bout.scaleX -= 0.2;
	this.bout.scaleY -= 0.2;
	//hacer boton visible
	this.bout.setAlpha(1);
	//accion al poner el cursor sobre el boton Salir
	this.bout.on('pointerover', function(){
		menu.bout.scaleX += 0.15;
		menu.bout.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.bout.on('pointerout', function(){
		menu.bout.scaleX -= 0.15;
		menu.bout.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.bout.on('pointerdown', function(){
		
	})

//////////////////////BOTON BACK////////////////////////////////
	//cargar boton Back
	this.bback = this.add.sprite(1700, 900, 'back').setInteractive();
	//hacer boton invisible
	this.bback.setAlpha(0);
	//accion al poner el cursor sobre el boton Back
	this.bback.on('pointerover', function(){
		menu.bback.scaleX += 0.15;
		menu.bback.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.bback.on('pointerout', function(){
		menu.bback.scaleX -= 0.15;
		menu.bback.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.bback.on('pointerdown', function(){
		//hacer botones invisibles
		menu.bback.setAlpha(0);
		//hacer botones visibles
		menu.bplay.setAlpha(1);
		menu.bopt.setAlpha(1);
		menu.bout.setAlpha(1);
		menu.btit.setAlpha(1);
	})
}

menu.update = function(){}