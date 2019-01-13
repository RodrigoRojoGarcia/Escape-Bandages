var level2 = new Phaser.Scene('Level2')

level2.preload = function(){

}
level2.create = function(){
	const {Body, Bodies} = Phaser.Physics.Matter.Matter;
	currentScene = this;

	this.input.setDefaultCursor('url(Sprites/cetro.png), pointer')

	this.cameraMummy = this.cameras.main.setSize(940,1080).setName('camLvL2Mummy');
    this.cameraPharaoh = this.cameras.add(980,0,940,1080).setName('camLvL2Pharaoh');

    this.map = this.make.tilemap({key:"map2", tileWidth: 120, tileHeight: 120})

    const tiles = this.map.addTilesetImage("tileset","tile")
    const bg= this.map.createDynamicLayer("Background", tiles, 0,0);
    const door = this.map.createDynamicLayer("Door", tiles, 0,0)
    const layer = this.map.createDynamicLayer("Foreground",tiles,0,0);

    layer.setCollisionByProperty({ collider: true });

    this.matter.world.convertTilemapLayer(layer);
    this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels + 240);

    const spawnPoint = this.map.findObject("Spawns", obj => obj.name === "Player");
    const spawnPointScorpionNest = this.map.findObject("Spawns", obj => obj.name === "Scorpion");
    const spawnZoneScorpion = this.map.findObject("Spawns", obj => obj.name === "SpawnZoneScorpion")

    this.p = new Pharaoh(this, spawnPoint.x, spawnPoint.y);
    this.m = new Mummy(this, spawnPoint.x, spawnPoint.y);

    this.cameraPharaoh.startFollow(this.p.getSprite(), false, 1, 1, -200, 350);
    this.cameraMummy.startFollow(this.m.getSprite(), false, 1, 1, -200, 350);

    this.cameraPharaoh.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    this.cameraMummy.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

    this.enemies = []

    this.numEnemies = 0;

    
    this.scorpionNest = new Nest(this, spawnPointScorpionNest.x, spawnPointScorpionNest.y, 'box', 'scorpion', 0.04, 0.4, 5000, spawnZoneScorpion)

    

    this.door1 = this.matter.add.image(20*120+60, 16*120+60, 'door', null, {isStatic:true});
    this.door1.setAngle(-90);


    ///////////////////////////////////CONTROLES///////////////////////////////////
    //Extraemos las teclas de dirección, W,A,D y barra espaciadora de las KeyCodes de Phaser
    const {LEFT, RIGHT, UP, DOWN, W, A, D, C, R, SPACE, ESC} = Phaser.Input.Keyboard.KeyCodes;
    //Les atribuimos a variables nuestras los KeyCodes de las teclas de dirección
    this.keys = this.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        down: DOWN,
        w: W,
        a: A,
        d: D,
        c: C,
        r: R,
        space: SPACE,
        esc: ESC
    });
    this.tripwire = this.matter.add.sprite(937.5,1500,'tripwire')
    var tripwireSensor = Bodies.rectangle(937.5, 1500, this.tripwire.width+10, this.tripwire.height, {isSensor:true, isStatic:true})
    this.tripwire.setExistingBody(tripwireSensor)
    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = false;
    this.input.keyboard.on("keydown_F", event => {
      this.matter.world.drawDebug = !this.matter.world.drawDebug;
      this.matter.world.debugGraphic.clear();
    });
    level2.matterCollision.addOnCollideStart({
    	objectA: level2.tripwire,
    	callback: level2.tripwireActive,
    	context: level2
    }) 

    this.platform = new Platform(this, 660, 1500, 'door', 1560, 960)
    
}
level2.tripwireActive = function({bodyA, bodyB, pair}){
	if(bodyB === level2.m.shackle[8].body){
		if(level2.m.onHit){
			level2.platform.action()
		}
	}
	
}
level2.update = function(){
	if(!this.p.dead){
		this.p.update(level2.keys)
		this.p.resetColliding()
	}
	if(!this.m.dead){
		this.m.update(level2.keys)
		this.m.resetColliding()
	}
	
	for(var i =0;i<this.enemies.length;i++){
		if(!this.enemies[i].dead){
			this.enemies[i].update()
			this.enemies[i].resetColliding()
		}
	}
	this.platform.update()


    if(!this.scorpionNest.activated){
        this.door1.x = 19*120+60;
    }else{
        this.door1.x = 20*120+60
    }
}