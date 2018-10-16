
function create(){
    //TileMap creation
	const map = this.make.tilemap({key:"map", tileWidth: 120, tileHeight: 120});
    //We add the tileSet to the tileMap
	const tiles = map.addTilesetImage("tileset","tile");
    //Extract a layer of tiles from the map (fron the JSON)
    const bg= map.createStaticLayer("Background", tiles, 0,0);
	const layer = map.createStaticLayer("Foreground",tiles,0,0);

    //We take the collider property from the JSON and make it a Collision for layer in Phaser
    layer.setCollisionByProperty({ collider: true });

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
    zoneAnubis = this.add.zone(Anubis.x, Anubis.y).setSize(Anubis.width, Anubis.height);
    this.physics.world.enable(zoneAnubis,0);
    //It doesn't have gravity nor its a movable object
    zoneAnubis.body.setAllowGravity(false);
    zoneAnubis.body.moves = false;

    ///////////////////////////////EVENT BASTET///////////////////////////////////////
    //Create a zone with the size of the objecto from the JSON file
    zoneBastet = this.add.zone(Bastet.x, Bastet.y).setSize(Bastet.width, Bastet.height);
    this.physics.world.enable(zoneBastet,0);
    //It doesn't have gravity nor its a movable object
    zoneBastet.body.setAllowGravity(false);
    zoneBastet.body.moves = false;

   

    ////////////////////////////PLAYERS///////////////////////////////////////////
    //Create a Pharaoh object from the function Pharaoh of the pharaoh.js file
    p = new Pharaoh(this, spawnPointPharaoh.x, spawnPointPharaoh.y);
    //We save the sprite that create() from Pharaoh returns in pharaoh
    p.create();

    //Create a Mummy object from the function Mummy of the mummy.js file
    m = new Mummy(this,spawnPointMummy.x, spawnPointMummy.y);
    //We save the sprite that create() from Mummy returns in mummy
    m.create();


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
	this.physics.add.collider(p.getSprite(), layer);
    this.physics.add.collider(m.getSprite(), layer);



    ///////////////////////////EVENTOS////////////////////////////////////////
    //Detect if pharaoh and zoneAnubis overlap then call to eventAnubis function
    this.physics.add.overlap(p.getSprite(), zoneAnubis, eventAnubis, null, this);

    function eventAnubis (pharaoh, zoneAnubis){
        //Make the sprite of the pharaoh pink
        pharaoh.setTint(0xee0099);
    }
    //Detect if mummy and zoneBastet overlap then call to eventBastet function
    this.physics.add.overlap(m.getSprite(), zoneBastet, eventBastet, null, this);

    function eventBastet (mummy, zoneBastet){
        //Make the sprite of the mummy green
        mummy.setTint(0x00ff00);
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
}