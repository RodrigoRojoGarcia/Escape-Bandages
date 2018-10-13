
//Creation of the Phaser enviroment

var config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade:{
			gravity:{y:500},
			debug: false
		}
	},
	scene:{
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var onAir = false;

//Array of torches, elements that are going to be in the scene
var torches = [];


