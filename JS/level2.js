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
    const first = this.map.createDynamicLayer("First", tiles, 0, 0);

    first.depth = 100;

    layer.setCollisionByProperty({ collider: true });

    this.matter.world.convertTilemapLayer(layer);
    this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels + 240);

    const spawnPoint = this.map.findObject("Spawns", obj => obj.name === "Player");
    const spawnPointScorpionNest = this.map.findObject("Spawns", obj => obj.name === "Scorpion");
    const spawnPointScorpionNest2 = this.map.findObject("Spawns", obj => obj.name === "Scorpion2");
    const spawnZoneScorpion = this.map.findObject("Spawns", obj => obj.name === "SpawnZoneScorpion")
    const spawnZoneScorpion2 = this.map.findObject("Spawns", obj => obj.name === "SpawnZoneScorpion2")
    const victory = this.map.findObject("Spawns", obj => obj.name === "victoryZone")

    this.p = new Pharaoh(this, spawnPoint.x, spawnPoint.y);
    this.m = new Mummy(this, spawnPoint.x, spawnPoint.y);

    this.victoryzone = this.matter.add.rectangle(victory.x+(victory.width/2), victory.y+(victory.height/2),victory.width,victory.height,{isSensor:true, isStatic: true});

    this.mummyVictory = false;
    this.pharaohVictory = false;

    function onVictoryStartP({bodyA, bodyB, pair}){
        if(bodyB === level2.victoryzone){
            level2.p.getSprite().setTint(0xddffdd)
            level2.pharaohVictory = true;
        }
    }
    function onVictoryStartM({bodyA, bodyB, pair}){
        if(bodyB === level2.victoryzone){
            level2.m.getSprite().setTint(0xddffdd)
            level2.mummyVictory = true;
        }
    }

    function onVictoryOutP({bodyA, bodyB, pair}){
        if(bodyB === level2.victoryzone){
            level2.p.getSprite().setTint(0xffffff)
            level2.pharaohVictory = false;
        }
    }
    function onVictoryOutM({bodyA, bodyB, pair}){
        if(bodyB === level2.victoryzone){
            level2.m.getSprite().setTint(0xffffff)
            level2.mummyVictory = false;
        }
    }

    this.matterCollision.addOnCollideStart({
        objectA: level2.p.getSprite(),
        callback: onVictoryStartP,
        context: level2.p.getSprite()
    })
    this.matterCollision.addOnCollideStart({
        objectA: level2.m.getSprite(),
        callback: onVictoryStartM,
        context: level2.m.getSprite()
    })
    this.matterCollision.addOnCollideEnd({
        objectA: level2.p.getSprite(),
        callback: onVictoryOutP,
        context: level2.p.getSprite()
    })
    this.matterCollision.addOnCollideEnd({
        objectA: level2.m.getSprite(),
        callback: onVictoryOutM,
        context: level2.m.getSprite()
    })

    this.cameraPharaoh.startFollow(this.p.getSprite(), false, 1, 1, 0, 200);
    this.cameraMummy.startFollow(this.m.getSprite(), false, 1, 1, 0, 200);

    this.cameraPharaoh.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    this.cameraMummy.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

    this.nests = [];
    this.enemies = [];

    this.numEnemies = 0;
    
    this.boxes = [];
    for(var i = 0; i < 2; i++){
        this.boxes[i] = new PurpleBox(this, (4+i)*120+60, 26*120+60, 0, 0, 'smallBox', 0, 0.01, 0.1, 1);;
        
    }
    
    this.scorpionNest = new Nest(this, spawnPointScorpionNest.x + 60, spawnPointScorpionNest.y + 60, 'nest', 'scorpion', 0.04, 0.4, 7000, spawnZoneScorpion, 8);
    this.scorpionNest2 = new Nest(this, spawnPointScorpionNest2.x + 60, spawnPointScorpionNest2.y + 60, 'nest', 'scorpion', 0.04, 0.4, 2000, spawnZoneScorpion2, 8);

    this.nests[0] = this.scorpionNest;
    this.nests[1] = this.scorpionNest2;

    this.door1 = this.matter.add.image(20*120+60, 16*120+60, 'stoneDoor', null, {isStatic:true});
    this.door1.setAngle(-90);

    this.door2 = this.matter.add.image(22*120+60, 24*120+60, 'stoneDoor', null, {isStatic:true});
    this.door2.setTint(0xFFFF00);

    this.door3 = this.matter.add.image(22*120+60, 25*120+60, 'stoneDoor', null, {isStatic:true});
    this.door3.setTint(0xBF00FF);

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
    this.tripwire3 = new Tripwire(this, 30, 26, 'tripwire', function(){
        level2.platform3.action()
    })

    
    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = false;
    this.input.keyboard.on("keydown_F", event => {
      this.matter.world.drawDebug = !this.matter.world.drawDebug;
      this.matter.world.debugGraphic.clear();
    });
   

    this.platform = new Platform(this, 5*120 + 60, 12 * 120 + 60, 'platform', 13 * 120, 8 * 120 + 60)
    this.platform2 = new Platform(this, 11*120 + 60, 10 * 120 + 60, 'platform', 11 * 120, 7 * 120 + 60)
    this.platform3 = new Platform(this, 26*120 + 60, 26 * 120 + 60, 'platform', 27 * 120, 3 * 120 + 60)
    this.move = false;
    this.box = [];
    this.box[0] = new PurpleBox(this, 2280, 1820, 960, 1820, 'PurpleBox1', 0, 0.01, 0.1, 100)

    for(var i = 0; i< this.box.length;i++){
        this.box[i].create()
    }

    this.buttons = this.map.createFromObjects('Buttons', 4, { key: 'button' });
    //Por cada objeto creamos un botón de la clase Button.js
    for(var i = 0; i < this.buttons.length; i++){
        this.buttons[i] = new Button(this, this.buttons[i].x, this.buttons[i].y);
    }

    this.buttons[2].button.setTint(0xFF0000);
    this.buttons[3].button.setTint(0xFFFF00);
    this.buttons[4].button.setTint(0x00FF00);
    this.buttons[5].button.setTint(0x00FFFF);
    this.buttons[6].button.setTint(0x0000FF);
    this.buttons[7].button.setTint(0xBF00FF);

        
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
    this.platform3.update();
    
    for(var i = 0; i < this.nests.length; i++){
        this.nests[i].update();
    }

    if(this.buttons[0].active || this.buttons[1].active){
        this.door1.x = 19*120+60;
    }else{
        this.door1.x = 20*120+60
    }

    if(this.buttons[3].active && this.buttons[7].active){
        this.door2.setVisible(false);
        this.door3.setVisible(false);
        this.door2.setSensor(true);
        this.door3.setSensor(true);
    }
    else{
        this.door2.setVisible(true);
        this.door3.setVisible(true);
        this.door2.setSensor(false);
        this.door2.setSensor(false);
    }
    
    for(var i=0;i<this.box.length;i++){
        this.move = this.move || this.box[i].move;
        this.box[i].update();
    }

    if(this.mummyVictory && this.pharaohVictory){
        for(var i = 0; i < this.nests.length; i++){
            this.nests[i].deactivate();
        }
        this.scene.start(victoria)
        this.scene.stop(heart);
    }

}

level2.startGameOver = function(){
    this.scene.start(gameover);
    this.scene.stop(heart);
}



