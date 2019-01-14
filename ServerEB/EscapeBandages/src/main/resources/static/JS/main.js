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
	scene:[carga, menu, offline, onlineG, online, victoria, gameover, submenu, lobby, characterSelection, heart, chatOnline, restart, pause, disconnect]
};

var game = new Phaser.Game(config);
var myUser = new User();
var myLobby = new LobbyObj();

var gameState = 0;

var onRestart = false;
var onOut = false;
var onRestartWS = false;

var disconnected = false; 
var fx;


	
