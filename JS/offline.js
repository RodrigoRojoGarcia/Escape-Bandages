var offline = new Phaser.Scene('Offline');

offline.init = function(){}

offline.preload = function(){
	this.load.image('options','../Escape-Bandages/sprites/options.png')
}

offline.create = function(){
	this.bopt = this.add.sprite(w-100, h-100, 'options').setInteractive();
	this.bopt.setAlpha(1);
}

offline.update = function(){}