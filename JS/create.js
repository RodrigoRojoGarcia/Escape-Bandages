function create(){
	const map = this.make.tilemap({key:"map", tileWidth: 120, tileHeight: 120});
	const tiles = map.addTilesetImage("brickpatternreescaladofinal","tile");

	const layer = map.createStaticLayer("Capa de Patrones 1",tiles,0,0);

    for(var i = 0; i < 4; i++){
        torches.push(this.add.sprite(225 + 480*i,215,'torch'));
    };

	layer.setCollisionByProperty({ collider: true });
    const spawnPoint = map.findObject("Capa de Objetos 1", obj => obj.name === "SpawnPoint");

	player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, 'mummy');


    this.anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torch',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    for(var i = 0; i<4;i++){
        torches[i].anims.play('torchAnim');
    };

    this.anims.create({
    	key: 'left',
    	frames: this.anims.generateFrameNumbers('mummy', {start: 0, end: 3}),
    	frameRate: 10,
    	repeat: -1
    });


    this.anims.create({
    	key: 'right',
    	frames: this.anims.generateFrameNumbers('mummy', {start: 4, end: 7}),
    	frameRate: 10,
    	repeat: -1
    });
    this.anims.create({
    	key: 'stayLeft',
    	frames: [{key: 'mummy', frame:0}],
    	frameRate: 20
    });
	this.anims.create({
    	key: 'stayRight',
    	frames: [{key: 'mummy', frame:7}],
    	frameRate: 20
    });


	cursors = this.input.keyboard.createCursorKeys();
	
	this.physics.add.collider(player, layer);

	const camera = this.cameras.main;
	camera.startFollow(player);

	camera.setBounds(0,0,map.widthInPixels,map.heightInPixels);
}