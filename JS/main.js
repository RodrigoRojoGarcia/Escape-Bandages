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
	audio: {
        disableWebAudio: true
    },
	scene:[menu, offline, level2, victoria, victorylevel, controls, gameover, submenu, heart, restart, pause]
};

var game = new Phaser.Game(config);
var fx;
var currentScene;
var loaded = false;
var lvl1passed = false;
	
