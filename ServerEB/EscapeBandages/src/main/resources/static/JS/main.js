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
	scene:[carga, server, menu, offline, online, victoria, gameover, submenu, lobby, characterSelection, chatOnline, onlineG]
};

var game = new Phaser.Game(config);
var myUser = new User();
var myLobby = new LobbyObj();

var gameState = 0;

var disconnected = false; 
var fx;

const SERVER = location.hostname=="localhost"
	
