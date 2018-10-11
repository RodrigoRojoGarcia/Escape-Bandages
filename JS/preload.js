function preload(){
	this.load.image("tile", "../Escape-Bandages/Sprites/brickpatternreescaladofinal.png");
	this.load.tilemapTiledJSON("map", "mapa.json");
	this.load.spritesheet("Mummy","../Escape-Bandages/Sprites/mummyRunSprites.png", {frameWidth: 100, frameHeight: 125});
	this.load.spritesheet("Pharaoh","../Escape-Bandages/Sprites/mummyRunSprites.png", {frameWidth: 100, frameHeight: 125});
	this.load.spritesheet("torch","../Escape-Bandages/Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
}