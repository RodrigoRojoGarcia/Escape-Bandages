var menu = new Phaser.Scene('Menu');

menu.init = function(){}

menu.preload = function(){
	this.load.image('play','../menus/sprites/play.png');
}

menu.create = function(){
	this.bplay = this.add.sprite(w/2, h/2-100, 'play').setInteractive();
	
	console.log(this.bplay);
}

menu.update = function(){
	//this.bplay.angle +=5;
}