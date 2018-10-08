import Player from "./player.js";

function create(){
	const map = this.make.tilemap({key:"map"});
	const tiles = map.addTilesetImage("brickpatternreescaladofinal","tile");

	map.createDynamicLayer("Background", tile);

	const spawnPoint = map.findObject("Objects", obj => obj.name === "SpawnPoint");
	this.player = new Player(this, spawnPoint.x spawnPoint.y);

	this.
}