var victoria = new Phaser.Scene('Victoria');

victoria.preload = function(){


}

victoria.create = function(){


	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//background
	var bgV = this.add.image(0, 0, 'bgmenu').setOrigin(0);
	//letras victoria
	var vic = this.add.sprite(960, 540, 'victoria');

////////////////////Victoria Mummy//////////////////////////////////
	var mumV = this.add.sprite(1300, 400,'Mummy');
	

    mumV.anims.play('jumpRightMCicle');

////////////////////Victoria Pharaoh//////////////////////////////////
	var pV = this.add.sprite(640, 400,'Pharaoh');

    pV.anims.play('jumpRightPCicle');

//////////////////////BOTON REINICIAR///////////////////////////
	//cargar boton Reiniciar
	this.brei = this.add.sprite(960, 800, 'restart').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
	this.brei.scaleX -= 0.2;
	this.brei.scaleY -= 0.2;
	//hacer boton visible
	this.brei.setAlpha(1);
	//accion al poner el cursor sobre el boton Reiniciar
	this.brei.on('pointerover', function(){
		victoria.brei.scaleX += 0.15;
		victoria.brei.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Reiniciar
	this.brei.on('pointerout', function(){
		victoria.brei.scaleX -= 0.15;
		victoria.brei.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Reiniciar
	this.brei.on('pointerdown', function(){
		victoria.scene.start(offline);
		victoria.scene.launch(heart, offline);
		
	})
/////////////////BOTON VOLVER//////////////////
	//cargar boton Volver
	this.binit = this.add.sprite(960, 950, 'exit').setInteractive();
	this.binit.scaleX -= 0.4;
	this.binit.scaleY -= 0.4;
	//hacer boton invisible
	this.binit.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.binit.on('pointerover', function(){
		victoria.binit.scaleX += 0.15;
		victoria.binit.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.binit.on('pointerout', function(){
		victoria.binit.scaleX -= 0.15;
		victoria.binit.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.binit.on('pointerdown', function(){
		//cambio de escena a menu
		
		victoria.scene.start(submenu);
		
	})
}

victoria.update = function(){
	
}