import Pharaoh from "../Escape-Bandages/JS/pharaoh.js"

function create(){
	const map = this.make.tilemap({key:"map", tileWidth: 120, tileHeight: 120});
	const tiles = map.addTilesetImage("brickpatternreescaladofinal","tile");

	const layer = map.createStaticLayer("Capa de Patrones 1",tiles,0,0);

    for(var i = 0; i < 4; i++){
        torches.push(this.add.sprite(225 + 480*i,215,'torch'));
    };

	layer.setCollisionByProperty({ collider: true });


    const spawnPointPharaoh = map.findObject("Objects", obj => obj.name === "SpawnPointPharaoh");
    const spawnPointMummy = map.findObject("Objects", obj => obj.name === "SpawnPointMummy");
    const Anubis = map.findObject("Objects", obj => obj.name === "Anubis");
    const Bastet = map.findObject("Objects", obj => obj.name === "Bastet");


    /////////////////////////////////EVENT ANUBIS////////////////////////////////////
    zoneAnubis = this.add.zone(Anubis.x, Anubis.y).setSize(Anubis.width, Anubis.height);
    this.physics.world.enable(zoneAnubis,0);
    zoneAnubis.body.setAllowGravity(false);
    zoneAnubis.body.moves = false;

    ///////////////////////////////EVENT BASTET///////////////////////////////////////
    zoneBastet = this.add.zone(Bastet.x, Bastet.y).setSize(Bastet.width, Bastet.height);
    this.physics.world.enable(zoneBastet,0);
    zoneBastet.body.setAllowGravity(false);
    zoneBastet.body.moves = false;

   

    ////////////////////////////PLAYERS///////////////////////////////////////////

    this.pharaoh = new Player(this, spawnPointPharaoh.x, spawnPointPharaoh.y);

    mummy = this.physics.add.sprite(spawnPointMummy.x, spawnPointMummy.y, 'Mummy');



    //////////////////ANIMATIONS////////////////////////////////////////////////
    this.anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torch',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    for(var i = 0; i<4;i++){
        torches[i].anims.play('torchAnim');
    };


    
    /////////////////////////////////////MUMMY ANIMATIONS///////////////////////////////
    this.anims.create({
    	key: 'leftM',
    	frames: this.anims.generateFrameNumbers('Mummy', {start: 0, end: 3}),
    	frameRate: 10,
    	repeat: -1
    });


    this.anims.create({
    	key: 'rightM',
    	frames: this.anims.generateFrameNumbers('Mummy', {start: 4, end: 7}),
    	frameRate: 10,
    	repeat: -1
    });
    this.anims.create({
    	key: 'stayLeftM',
    	frames: [{key: 'Mummy', frame:0}],
    	frameRate: 20
    });
	this.anims.create({
    	key: 'stayRightM',
    	frames: [{key: 'Mummy', frame:7}],
    	frameRate: 20
    });
    ///////////////////////////////////////////////////////////////////////////
    const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      w: W,
      a: A,
      d: D
    });

	

    ////////////////////////////COLLIDERS//////////////////////////////////////
	this.physics.add.collider(pharaoh, layer);
    this.physics.add.collider(mummy, layer);



    ///////////////////////////EVENTOS////////////////////////////////////////
    this.physics.add.overlap(pharaoh, zoneAnubis, eventAnubis, null, this);

    function eventAnubis (pharaoh, zoneAnubis){
        pharaoh.setTint(0xee0099);
    }
    this.physics.add.overlap(mummy, zoneBastet, eventBastet, null, this);

    function eventBastet (mummy, zoneBastet){
        mummy.setTint(0x00ff00);
    }





    ///////////////////////////CAMERA/////////////////////////////////////////
	const camera = this.cameras.main;
	camera.startFollow(pharaoh);

	camera.setBounds(0,0,map.widthInPixels,map.heightInPixels);
}