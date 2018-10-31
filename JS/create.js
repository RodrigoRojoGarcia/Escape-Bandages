
function create(){
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
    const textAnubis = map.findObject("Objects", obj => obj.name === "TextAnubis");
    const textBastet = map.findObject("Objects", obj => obj.name === "TextBastet");

    /////////////////////////////////EVENT ANUBIS////////////////////////////////////
    //Create a zone with the size of the object from the JSON file
    zoneAnubis = this.matter.add.rectangle(Anubis.x+(Anubis.width/2), Anubis.y+(Anubis.height/2), Anubis.width, Anubis.height, {isSensor: true, isStatic: true});
    ///////////////////////////////EVENT BASTET///////////////////////////////////////
    //Create a zone with the size of the object from the JSON file
    zoneBastet = this.matter.add.rectangle(Bastet.x+(Bastet.width/2), Bastet.y+(Bastet.height/2), Bastet.width, Bastet.height, {isSensor: true, isStatic: true});
    




   

    ////////////////////////////PLAYERS///////////////////////////////////////////
    //Create a Pharaoh object from the function Pharaoh of the pharaoh.js file
    p = new Pharaoh(this, spawnPointPharaoh.x, spawnPointPharaoh.y);
    //We save the sprite that create() from Pharaoh returns in pharaoh
    p.create();

    //Create a Mummy object from the function Mummy of the mummy.js file
    m = new Mummy(this,spawnPointMummy.x, spawnPointMummy.y);
    //We save the sprite that create() from Mummy returns in mummy
    m.create();

    //////////////////ENEMIES//////////////////////////////////////////////////
    //e = new Enemy(this, 1800, 400);
    //e.create();


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
    const camera = this.cameras.main;
	

    ////////////////////////////COLLIDERS//////////////////////////////////////
    //We set the colliders between the players (pharaoh and mummy) with the world (layer)
    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = false;
    this.input.keyboard.on("keydown_F", event => {
      this.matter.world.drawDebug = !this.matter.world.drawDebug;
      this.matter.world.debugGraphic.clear();
    });



    ///////////////////////////EVENTOS////////////////////////////////////////
    //Text for Anubis tutorial
    var wordsAnubis = ["Hola, soy Anubis, maestro de la Necropolis.",
    "Te he revivido porque en vida te enamoraste de una\npersona de la que no podías, por lo que os doy la\noportunidad de vivir juntos.",
    "Para ello necesitaréis salir de la pirámide JUNTOS"];
    //The text appears in the same position as the object textAnubis from Tiled
    this.sayAnubis = this.add.text(textAnubis.x, textAnubis.y, wordsAnubis).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');

    //Text for Bastet Tutorial
    var wordsBastet = ["Hola, soy Bastet, Diosa de la armonía del hogar.",
    "Te he revivido porque en vida te enamoraste de una\npersona de la que no deberías, por lo que os doy la\n oportunidad de vivir juntos.",
    "Para ello necesitaréis salir de la pirámide JUNTOS"];
    //The text appears in the same position as the object textBastet from Tiled
    this.sayBastet = this.add.text(textBastet.x, textBastet.y, wordsBastet).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');

    //Sets the depth of the text to 100 (in front of everything) and set its visible value to false 
    this.sayAnubis.depth = 100;
    this.sayAnubis.setVisible(false);
    this.sayBastet.depth = 100;
    this.sayBastet.setVisible(false);



    //At the start of a collision between the pharaoh and something calls eventAnubisIn
    this.matterCollision.addOnCollideStart({
        objectA: p.getSprite(),
        callback: eventAnubisIn,
        context: p.getSprite()
    })
    //At the end of a collision between the pharaoh and something calls eventAnubisOut
    this.matterCollision.addOnCollideEnd({
        objectA: p.getSprite(),
        callback: eventAnubisOut,
        context: p.getSprite()
    })
    //Event called when the pharaoh collides with something
    function eventAnubisIn({bodyA, bodyB, pair}){
        //If this something is the zoneAnubis
        if(bodyB === zoneAnubis && !scene.learnedA){
            scene.learnedA = true;
            //Text visible
            scene.sayAnubis.setVisible(true);
            //Steady value of pharaoh changed to true after a delay (so there is no problem with the edge of the collision box)
            scene.time.addEvent({
                delay: 200,
                callback: ()=>( p.steady = true),
                callbackScope: this
            });

        }
    }
    //Event called when the pharaoh stops colliding with something
    function eventAnubisOut({bodyA, bodyB, pair}){
        //If this something is zoneAnubis
        if(bodyB === zoneAnubis && !scene.learnedA){
            //Hide the text
            scene.sayAnubis.setVisible(false);
        }
    }

    //At the start of a collision between the mummy and something calls eventBastetIn
    this.matterCollision.addOnCollideStart({
        objectA: m.getSprite(),
        callback: eventBastetIn,
        context: m.getSprite()
    })
    //At the end of a collision between the mummy and something calls eventBastetOut
    this.matterCollision.addOnCollideEnd({
        objectA: m.getSprite(),
        callback: eventBastetOut,
        context: m.getSprite()
    })
    //Event called when the mummy collides with something
    function eventBastetIn({bodyA, bodyB, pair}){
        //If this something is the zoneBastet
        if(bodyB === zoneBastet && !scene.learnedB){
            scene.learnedB = true;
            //Text visible
            scene.sayBastet.setVisible(true);
            //Steady value of mummy changed to true after a delay (so there is no problem with the edge of the collision box)
            scene.time.addEvent({
                delay: 200,
                callback: ()=>( m.steady = true),
                callbackScope: this
            });
        }
    }

    //Event called when the mummy stops colliding with something
    function eventBastetOut({bodyA, bodyB, pair}){
        //If this something is the zoneBastet
        if(bodyB === zoneBastet && !scene.learnedB){
            //The text hides
            scene.sayBastet.setVisible(false);
        }
    }


    this.input.on('pointerdown',function(pointer){
        scene.sayAnubis.setVisible(false);
        p.steady = false;
    },this);



    //Detect the keys pressed
    const {LEFT, RIGHT, UP, W, A, D, SPACE} = Phaser.Input.Keyboard.KeyCodes;

    this.keys = this.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        w: W,
        a: A,
        d: D,
        space: SPACE
    });



    ///////////////////////////CAMERA/////////////////////////////////////////
    //Create a camera
	
    //Make it follow the player pharaoh
	camera.startFollow(p.getSprite());
    //The camera must not leave the boundaries of the map

	camera.setBounds(0,0,map.widthInPixels,map.heightInPixels);

    //////////// ARENA //////////////////
    const arena = [];
    for(var i = 0; i < 10; i++){
        arena[i] = this.matter.add.image(600 + i*4, 120, 'sand', { restitution: 1, friction: 0.1 });
    }
    for(var i = 0; i < 10; i++){
        arena[i] = this.matter.add.image(400 + i*4, 116, 'sand', { restitution: 1, friction: 0.1 });
    }
    for(var i = 0; i < 10; i++){
        arena[i] = this.matter.add.image(400 + i*4, 112, 'sand', { restitution: 1, friction: 0.1 });
    }
    
    //CAJAS
    const caja = this.matter.add.image(1500, 150, 'box', { restitution: 0, frictionAir: 0, friction: 0.2, density: 0.0005 });


}