var config = {
	type: Phaser.AUTO,
	width: 1922,
	height: 1082,
	parent: 'GAME',
	physics: {
		default: 'matter',
		matter: {
			default: {y:1},
			debug: false,
			enableSleep: true
		}
	},
	plugins:{
		scene:[{
			plugin: PhaserMatterCollisionPlugin,
			key: "matterCollision",
			mapping: "matterCollision"
		}
		]
	},
	scene:[menu, offline, victoria, submenu]
};

var game = new Phaser.Game(config);

