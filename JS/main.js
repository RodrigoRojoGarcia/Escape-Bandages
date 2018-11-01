
//Creation of the Phaser enviroment

var config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	parent: "GAME",
	physics: {
		default: 'matter',
		matter:{
			gravity:{y:1},
			debug: false,
			enableSleep: true
		}

	},
	scene:{
		preload: preload,
		create: create,
		update: update
	},
	plugins:{
		scene:[
		{
			plugin: PhaserMatterCollisionPlugin,
			key: "matterCollision",
			mapping: "matterCollision"
		}
		]
	}
};

var game = new Phaser.Game(config);


//Array of torches, elements that are going to be in the scene
var torches = [];


