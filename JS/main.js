var config = {
	type: Phaser.AUTO,
	width: window.innerWidth -15,
	height: window.innerHeight -15,
	parent: "GAME",
	physics: {
		default: 'matter',
		matter: {
			default: {y:1},
			debug: false,
			enableSleep: true
		}
	},
	/*plugins:{
		scene:[
		{
			plugin: PhaserMatterCollisionPlugin,
			key: "matterCollision",
			mapping: "matterCollision"
		}
		]
	},*/
	scene:[menu]
}

var game = new Phaser.Game(config);

var w = window.innerWidth -15;
var h = window.innerHeight -15;