var config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	parent: "GAME",
	physics: {
		default: 'matter',
		matter: {
			default: {y:1},
			debug: false,
			enableSleep: true
		}
	},
	plugins:{
		scene:[
		{
			plugin: PhaserMatterCollisionPlugin,
			key: "matterCollision",
			mapping: "matterCollision"
		}
		]
	},
	scene:[menu, offline, submenu]
};

var game = new Phaser.Game(config);

var torchesM = [];
var torchesM2 = [];