var offline = new Phaser.Scene('Offline');

offline.init = function(){}

offline.preload = function(){
	this.load.tilemapTiledJSON('map','map.json');
	this.load.image('tile', '../Escape-Bandages/Sprites/tileset.png');
}

offline.create = function(){
	const {Engine, Bodies, World} = Phaser.Physics.Matter.Matter;
    const engine = Engine.create();
    const scene = this;
    //TileMap creation
    const map = this.make.tilemap({key:"map", tileWidth: 120, tileHeight: 120});
    //We add the tileSet to the tileMap
    const tiles = map.addTilesetImage("tileset","tile");
    this.learnedA = false;
    this.learnedB = false;

    //Extract a layer of tiles from the map (fron the JSON)
    const bg= map.createDynamicLayer("Background", tiles, 0,0);
    const layer = map.createDynamicLayer("Foreground",tiles,0,0);

    //We take the collider property from the JSON and make it a Collision for layer in Phaser
    layer.setCollisionByProperty({ collider: true });
    this.matter.world.convertTilemapLayer(layer);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}

offline.update = function(){}