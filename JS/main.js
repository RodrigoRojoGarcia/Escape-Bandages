var config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade:{
			gravity:{y:300},
			debug: false
		}
	},
	scene:{
		preload: preload,
		create: create,
		update: update
	}
};

var facingRightP = true;
var facingRightM = true;
var player;
var game = new Phaser.Game(config);

var torches = [];


