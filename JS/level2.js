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
    const spawnPointScorpionNest2 = this.map.findObject("Spawns", obj => obj.name === "Scorpion2");
    const spawnZoneScorpion = this.map.findObject("Spawns", obj => obj.name === "SpawnZoneScorpion")
    const spawnZoneScorpion2 = this.map.findObject("Spawns", obj => obj.name === "SpawnZoneScorpion2")

    this.p = new Pharaoh(this, spawnPoint.x, spawnPoint.y);
    this.m = new Mummy(this, spawnPoint.x, spawnPoint.y);

    this.cameraPharaoh.startFollow(this.p.getSprite(), false, 1, 1, 0, 200);
    this.cameraMummy.startFollow(this.m.getSprite(), false, 1, 1, 0, 200);

    this.cameraPharaoh.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    this.cameraMummy.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

    this.nests = [];
    this.enemies = [];

    this.numEnemies = 0;
    
    
    this.scorpionNest = new Nest(this, spawnPointScorpionNest.x + 60, spawnPointScorpionNest.y + 60, 'nest', 'scorpion', 0.04, 0.4, 7000, spawnZoneScorpion, 8);
    this.scorpionNest2 = new Nest(this, spawnPointScorpionNest2.x + 60, spawnPointScorpionNest2.y + 60, 'nest', 'scorpion', 0.04, 0.4, 1000, spawnZoneScorpion2, 8);

    this.nests[0] = this.scorpionNest;
    this.nests[1] = this.scorpionNest2;

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

    this.tripwire = new Tripwire(this, 7, 12, 'tripwire', function(){
        level2.platform.action()
    })
    this.tripwire2 = new Tripwire(this, 24, 7, 'tripwire', function(){
        level2.platform2.action()
    })

    
    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = false;
    this.input.keyboard.on("keydown_F", event => {
      this.matter.world.drawDebug = !this.matter.world.drawDebug;
      this.matter.world.debugGraphic.clear();
    });
   

    this.platform = new Platform(this, 5*120 + 60, 12 * 120 + 60, 'platform', 13 * 120, 8 * 120 + 60)
    this.platform2 = new Platform(this, 11*120 + 60, 10 * 120 + 60, 'platform', 11 * 120, 7 * 120 + 60)
    this.move = false;
    this.box = []
    this.box[0] = new PurpleBox(this, 2280, 1820, 960, 1820, 'PurpleBox1', 0, 0.01, 0.1, 100)

    for(var i = 0; i< this.box.length;i++){
        this.box[i].create()
    }

    this.buttons = this.map.createFromObjects('Buttons', 4, { key: 'button' });
    //Por cada objeto creamos un botón de la clase Button.js
    for(var i = 0; i < this.buttons.length; i++){
        this.buttons[i] = new Button(this, this.buttons[i].x, this.buttons[i].y);
    }
        
}

level2.update = function(){
    const keys = this.keys;
    
    if(this.p.dead  || this.m.dead){
        for(var i = 0; i < this.nests.length; i++){
            this.nests[i].deactivate();
        }
        this.time.addEvent({
            delay: 2000,
            callback: this.startGameOver,
            callbackScope: this
        });
        
    }

    if(keys.r.isDown){
        
        keys.r.isDown = false;
        if(!pause.active && !restart.active){
            level2.scene.launch(restart);
        }
        
    }

    if(keys.esc.isDown){
        
        keys.esc.isDown = false;
        if(!restart.active && !pause.active){
            level2.scene.launch(pause);
        }
    }

    for(var i = 0; i < this.buttons.length; i++){
        this.buttons[i].update();
        this.buttons[i].resetColliding();
    }

    this.move = false;
	if(!this.p.dead){
		this.p.update(level2.keys)
		this.p.resetColliding()
	}
	if(!this.m.dead){
		this.m.update(level2.keys)
		this.m.resetColliding()
	}
	
	
	this.platform.update()
    this.platform2.update()
    
    for(var i = 0; i < this.nests.length; i++){
        this.nests[i].update();
    }

    if(this.buttons[0].active || this.buttons[1].active){
        this.door1.x = 19*120+60;
    }else{
        this.door1.x = 20*120+60
    }
    
    for(var i=0;i<this.box.length;i++){
        this.move = this.move || this.box[i].move;
        this.box[i].update();
    }

}

level2.startGameOver = function(){
    this.scene.start(gameover);
    this.scene.stop(heart);
}



