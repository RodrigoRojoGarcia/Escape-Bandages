function preload(){
	//Load the tileSet
	this.load.image("tile", "../Escape-Bandages/Sprites/brickpatternreescaladofinal.png");
	//Load the tileMap
	this.load.tilemapTiledJSON("map", "mapa.json");
	//Loas the spriteSheet of the mummy
	this.load.spritesheet("Mummy","../Escape-Bandages/Sprites/mummyRunSprites.png", {frameWidth: 100, frameHeight: 125});
	//Load the spriteSheet of the pharaoh
	this.load.spritesheet("Pharaoh","../Escape-Bandages/Sprites/mummyRunSprites.png", {frameWidth: 100, frameHeight: 125});
	//Load the spriteSheet of the torches
	this.load.spritesheet("torch","../Escape-Bandages/Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
}