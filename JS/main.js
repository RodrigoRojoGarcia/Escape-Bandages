//Creation of the Phaser enviroment
myCustomCanvas = document.createElement('canvas');

myCustomCanvas.id = 'myCustomCanvas'

myCustomCanvas.style = 'border: 8px solid red';

document.body.appendChild(myCustomCanvas);

var contextCreationConfig = {
    alpha: false,
    depth: false,
    antialias: true,
    premultipliedAlpha: true,
    stencil: true,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: false,
    powerPreference: 'default'
};

var myCustomContext = myCustomCanvas.getContext('webgl', contextCreationConfig);


var config = {
	type: Phaser.AUTO,
	width: 1922,
	height: 1082,
	canvas: document.getElementById('myCustomCanvas'),
	physics: {
		default: 'matter',
		matter:{
			gravity:{y:1},
			debug: false,
			enableSleep: true
		}
	},
	plugins:{
		scene:[{
			plugin: PhaserMatterCollisionPlugin,
			key: "matterCollision",
			mapping: "matterCollision"
		}]
	},
	scene: [offline]
};

var game = new Phaser.Game(config);

//Array of torches, elements that are going to be in the scene
var torches = [];