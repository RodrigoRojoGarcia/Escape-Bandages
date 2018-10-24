function preload(){

	//Load the tileSet
	this.load.image("tile", "../Escape-Bandages/Sprites/tileset.png");
	//Load the tileMap
	this.load.tilemapTiledJSON("map", "map.json");
	//Loas the spriteSheet of the mummy
	this.load.spritesheet("Mummy","../Escape-Bandages/Sprites/mummySprites2.png", {frameWidth: 100, frameHeight: 150});
	//Load the spriteSheet of the pharaoh
	this.load.spritesheet("Pharaoh","../Escape-Bandages/Sprites/mummySprites2.png", {frameWidth: 100, frameHeight: 150});
	//Load the spriteSheet of the torches
	this.load.spritesheet("torch","../Escape-Bandages/Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});

	this.load.spritesheet("sand","../Escape-Bandages/Sprites/sand.png",{frameWidth: 10, frameHeight: 10});

	this.load.spritesheet("snake","../Escape-Bandages/Sprites/snake_spritesheet2.png",{frameWidth: 100, frameHeight: 140});


	this.load.image("box","../Escape-Bandages/Sprites/caja0.1.png");

}