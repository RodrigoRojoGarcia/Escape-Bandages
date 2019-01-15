var victoria = new Phaser.Scene('Victoria');

victoria.preload = function(){


}

victoria.create = function(){


	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//background
	var bgV = this.add.image(0, 0, 'bgmenu').setOrigin(0);
	//letras victoria
	var vic = this.add.sprite(960, 540, 'victory');

////////////////////Victoria Mummy//////////////////////////////////
	var mumV = this.add.sprite(1300, 400,'Mummy');
	

    mumV.anims.play('jumpRightMCicle');

////////////////////Victoria Pharaoh//////////////////////////////////
	var pV = this.add.sprite(640, 400,'Pharaoh');

    pV.anims.play('jumpRightPCicle');

//////////////////////BOTON REINICIAR///////////////////////////
	//cargar boton Reiniciar

	this.brei = new UIButton(this, 960, 800, 'restart', function(){
		victoria.scene.start(currentScene);
		victoria.scene.launch(heart, currentScene);
	}, function(){
		victoria.brei.amplifyScale(0.15, 0.15)
	}, function(){
		victoria.brei.reduceScale(0.15, 0.15)
	})
	this.brei.reduceScale(0.2,0.2)
	this.brei.show()

/////////////////BOTON VOLVER//////////////////
	//cargar boton Volver
	this.binit = new UIButton(this, 960, 950, 'exit', function(){
		victoria.scene.start(submenu);
	}, function(){
		victoria.binit.amplifyScale(0.15, 0.15)
	}, function(){
		victoria.binit.reduceScale(0.15, 0.15)
	})
	this.binit.reduceScale(0.4,0.4)
	this.binit.show()
}

victoria.update = function(){
	
}