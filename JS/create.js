
function create(){
    //TileMap creation
	const map = this.make.tilemap({key:"map", tileWidth: 120, tileHeight: 120});
    //We add the tileSet to the tileMap
	const tiles = map.addTilesetImage("tileset","tile");
    //Extract a layer of tiles from the map (fron the JSON)
    const bg= map.createDynamicLayer("Background", tiles, 0,0);
	const layer = map.createDynamicLayer("Foreground",tiles,0,0);

    //We take the collider property from the JSON and make it a Collision for layer in Phaser
    layer.setCollisionByProperty({ collider: true });
    this.matter.world.convertTilemapLayer(layer);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //Create the 4 sprites for the torches

    for(var i = 0; i < 4; i++){
        torches.push(this.add.sprite(225 + 480*i,215,'torch'));
    };

    //We extract the spawnPoints from the Objecto of the JSON
    const spawnPointPharaoh = map.findObject("Objects", obj => obj.name === "SpawnPointPharaoh");
    const spawnPointMummy = map.findObject("Objects", obj => obj.name === "SpawnPointMummy");
    //We extract the Objects Anubis and Bastet from the JSON so we can make an area of action in the game
    const Anubis = map.findObject("Objects", obj => obj.name === "Anubis");
    const Bastet = map.findObject("Objects", obj => obj.name === "Bastet");


    /////////////////////////////////EVENT ANUBIS////////////////////////////////////
    //Create a zone with the size of the objecto from the JSON file
    zoneAnubis = new Phaser.Geom.Rectangle(Anubis.x, Anubis.y, Anubis.width, Anubis.height);
    ///////////////////////////////EVENT BASTET///////////////////////////////////////
    //Create a zone with the size of the objecto from the JSON file
    zoneBastet = new Phaser.Geom.Rectangle(Bastet.x, Bastet.y, Bastet.width, Bastet.height);
    

   

    ////////////////////////////PLAYERS///////////////////////////////////////////
    //Create a Pharaoh object from the function Pharaoh of the pharaoh.js file
    p = new Pharaoh(this, spawnPointPharaoh.x, spawnPointPharaoh.y);
    //We save the sprite that create() from Pharaoh returns in pharaoh
    p.create();

    //Create a Mummy object from the function Mummy of the mummy.js file
    //m = new Mummy(this,spawnPointMummy.x, spawnPointMummy.y);
    //We save the sprite that create() from Mummy returns in mummy
    //m.create();


    //////////////////ANIMATIONS////////////////////////////////////////////////
    //Animation of the torches

    this.anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torch',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });


    


    //We play the animation of the torches in all 4 of them
    for(var i = 0; i<4;i++){
        torches[i].anims.play('torchAnim');
    };
    ///////////////////////////////////////////////////////////////////////////

	

    ////////////////////////////COLLIDERS//////////////////////////////////////
    //We set the colliders between the players (pharaoh and mummy) with the world (layer)




    ///////////////////////////EVENTOS////////////////////////////////////////
    //Detect if pharaoh and zoneAnubis overlap then call to eventAnubis function
    //this.matter.add.overlap(p.getSprite(), GetSize(zoneAnubis), eventAnubis, null, this);

    function eventAnubis (pharaoh, zoneAnubis){
        //Make the sprite of the pharaoh pink
        pharaoh.setTint(0xee0099);
    }
    //Detect if mummy and zoneBastet overlap then call to eventBastet function
   // this.matter.add.overlap(m.getSprite(), zoneBastet.GetSize(), eventBastet, null, this);

    function eventBastet (mummy, zoneBastet){
        //Make the sprite of the mummy green
    //    mummy.setTint(0x00ff00);
    }




    //Detect the keys pressed
    const {LEFT, RIGHT, UP, W, A, D} = Phaser.Input.Keyboard.KeyCodes;

    this.keys = this.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        w: W,
        a: A,
        d: D
    });



    ///////////////////////////CAMERA/////////////////////////////////////////
    //Create a camera
	const camera = this.cameras.main;
    //Make it follow the player pharaoh
	camera.startFollow(p.getSprite());
    //The camera must not leave the boundaries of the map

	camera.setBounds(0,0,map.widthInPixels,map.heightInPixels);

    //////////// ARENA //////////////////
    const arena = [];

    for(var i = 0; i < 100; i++){
        arena[i] = this.matter.add.image(600 + i*4, 120, 'sand', { restitution: 1, friction: 0.1 });
    }
    for(var i = 0; i < 100; i++){
        arena[i] = this.matter.add.image(400 + i*4, 116, 'sand', { restitution: 1, friction: 0.1 });
    }
    for(var i = 0; i < 100; i++){
        arena[i] = this.matter.add.image(400 + i*4, 112, 'sand', { restitution: 1, friction: 0.1 });
    }
    
    //CAJAS
    const caja = this.matter.add.image(1500, 150, 'box', { restitution: 0, frictionAir: 0, friction: 0.2, density: 0.0005 });


}