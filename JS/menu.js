var menu = new Phaser.Scene('Menu');

menu.init = function(){}

menu.preload = function(){
	this.load.image('play','../Escape-Bandages/sprites/play.png');
	//this.load.image('options','../Escape-Bandages/sprites/options.png')
}

menu.create = function(){
	//boton 'play'
	this.bplay = this.add.sprite(w/6, h/6, 'play').setInteractive();
	this.bplay.setAlpha(1);
	this.bplay.on('pointerdown', function(){
		menu.scene.switch(offline);
		//menu.bplay.setAlpha(0);
	})
	console.log(this.bplay);

	/*/boton 'options'
	this.bopt = this.add.sprite(w-100, h-100, 'options').setInteractive();
	this.bopt.setAlpha(1);
	this.bopt.on('pointerdown', function(){
		menu.bopt.setAlpha(0);
	})*/
}

menu.update = function(){
	//this.bplay.angle +=5;
}