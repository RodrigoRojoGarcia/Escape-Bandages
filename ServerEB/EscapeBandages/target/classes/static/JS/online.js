
var onlineG = new Phaser.Scene('OnlineG');


onlineG.preload = function(){
///////////////////////////////////MAPA///////////////////////////////////
    //Carga del tileset
    this.load.image("tile", "Sprites/tileset.png");
    //Carga del tilemap
    this.load.tilemapTiledJSON("map", "map.json");

///////////////////////////////////SPRITESHEETS///////////////////////////////////
    //MOMIA
    this.load.spritesheet("Mummy","Sprites/mummySprites2.png", {frameWidth: 100, frameHeight: 150});
    //FARAÓN
    this.load.spritesheet("Pharaoh","Sprites/pharaohsprites.png", {frameWidth: 100, frameHeight: 150});
    //ANTORCHAS
    this.load.spritesheet("torch","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
    //ARENA
    this.load.spritesheet("sand","Sprites/sand.png",{frameWidth: 10, frameHeight: 10});
    //SHEK
    this.load.spritesheet("snake","Sprites/snake_spritesheet2.png",{frameWidth: 100, frameHeight: 140});
    //BOTÓN
    this.load.spritesheet("button","Sprites/button.png",{frameWidth: 120, frameHeight: 30});
    //ANUBIS
    this.load.spritesheet("Anubis","Sprites/anubisSpriteSheet.png",{frameWidth: 100, frameHeight: 150});
    //BASTET
    this.load.spritesheet("Bastet","Sprites/bastetSpriteSheet.png",{frameWidth: 100, frameHeight: 150});
    //CAJA CON EFECTO
    this.load.spritesheet("PurpleBox1", "Sprites/purpleBox2SpriteSheet.png",{frameWidth: 175, frameHeight: 200});
    //FUEGO DEL FARAÓN
    this.load.spritesheet("Fire", "Sprites/firePharaohSprites.png",{frameWidth: 125, frameHeight: 125});
    
///////////////////////////////////IMAGENES///////////////////////////////////
    //PUERTA
    this.load.image("door","Sprites/door.png");
    //CAJA
    this.load.image("box","Sprites/caja0.1.png");
    //CUERDA
    this.load.image("rope", "Sprites/rope.png");
    //CORAZÓN
    this.load.image("heart","Sprites/heart.png");
}//FIN DEL PRELOAD

onlineG.create = function(){
	


///////////////////////////////////CONFIG///////////////////////////////////
    const {Engine, Bodies, World} = Phaser.Physics.Matter.Matter;
    const engine = Engine.create();
    scene = this;
    inputEnabled = true;
    this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');

    //Creamos dos cámaras en las dos mitades de la pantalla con 40 píxeles de por medio
    
    cameraMummy = this.cameras.main.setSize(940,1080).setName('camMummy');
    cameraPharaoh = this.cameras.add(980,0,940,1080).setName('camPharaoh');
    this.doubleCamera = true;
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //Creación del TILEMAP
	map = this.make.tilemap({key:"map", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = map.addTilesetImage("tileset","tile");

    //Extraemos las capas del TILEMAP
    const bg= map.createDynamicLayer("Background", tiles, 0,0);
    const exit = map.createDynamicLayer("Exit", tiles, 0,0)
	const layer = map.createDynamicLayer("Foreground",tiles,0,0);

    //Hacemos la capa LAYER (FOREGROUND) colisionable
    layer.setCollisionByProperty({ collider: true });
    //Se lo decimos a Matter
    this.matter.world.convertTilemapLayer(layer);
    //Colisión de los objetos con los bordes del mundo
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels + 240);
///////////////////////////////////CALCETINETE'S VARIABLES///////////////////////////////////
    this.clickNWS = false;
    this.clickWS = false;

///////////////////////////////////EXTRACCIÓN ELEMENTOS TILEMAP(JSON)///////////////////////////////////

    //SPAWNPOINTS
    //Faraón
    const spawnPointPharaoh = map.findObject("Objects", obj => obj.name === "SpawnPointPharaoh");
    //Momia
    const spawnPointMummy = map.findObject("Objects", obj => obj.name === "SpawnPointMummy");
    //Anubis
    const spawnPointAnubis = map.findObject("Objects", obj => obj.name === "GodAnubis");
    //Bastet
    const spawnPointBastet = map.findObject("Objects", obj => obj.name === "GodBastet");
    //Shek
    const spawnPointShek = map.findObject("Objects", obj => obj.name === "Shek");
    //Shek2
    const spawnPointShek2 = map.findObject("Objects", obj=> obj.name === "Shek2");
    //Shek3
    const spawnpointShek3 = map.findObject("Objects", obj=> obj.name === "Shek3");
    //Shek4
    const spawnpointShek4 = map.findObject("Objects", obj=> obj.name === "Shek4");
    //Cajas
    const spawnBox1 = map.findObject("Objects", obj => obj.name === "PurpleBox");
    const spawnBox2 = map.findObject("Objects", obj => obj.name === "PurpleBox2");
    //Arena
    const spawnPointSand = map.findObject("Objects", obj=> obj.name === "Sand");

    //OBJETOS
    //Zonas de Evento
    const Anubis = map.findObject("Objects", obj => obj.name === "Anubis");
    const Bastet = map.findObject("Objects", obj => obj.name === "Bastet");
    const wayOut = map.findObject("Objects", obj=>obj.name === "Victory")
    //Cajas de texto de tutorial
    const textAnubis = map.findObject("Objects", obj => obj.name === "TextAnubis");
    const textBastet = map.findObject("Objects", obj => obj.name === "TextBastet");
    //Botones
    buttons = map.createFromObjects('Buttons', 4, { key: 'button' });
    

///////////////////////////////////PLAYERS///////////////////////////////////
    //FARAÓN
    //Creamos un objeto Faraón, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    p = new Pharaoh(this, spawnPointPharaoh.x, spawnPointPharaoh.y);
    //Llamamos a la función crear, que crea las animaciones del mismo
    p.create();
    //Le atribuímos una profundidad de 1, por lo que pasará por delante de objetos a los que no le introduzcamos ningún valor de depth modificado
    //(El valor de depth por defecto es 0)
    p.getSprite().depth = 2
 
    //MOMIA
    //Creamos un objeto Momia, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    m = new Mummy(this,spawnPointMummy.x, spawnPointMummy.y);
    //Llamamos a la función crear, que crea las animaciones del mismo
    m.create();
    //Le atribuímos una profundidad de 1, por lo que pasará por delante de objetos a los que no le introduzcamos ningún valor de depth modificado
    m.getSprite().depth = 2

///////////////////////////////////ENEMIES///////////////////////////////////
    enemies = [];
    //SHEK
    //Creamos un objeto Enemigo, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    s = new Enemy(this,spawnPointShek.x, spawnPointShek.y);
    //Llamamos a la función crear, que crea las animaciones del mismo
    s.create();

    enemies[0] = s;
    //Creamos un objeto Enemigo, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    s2 = new Enemy(this,spawnPointShek2.x, spawnPointShek2.y);
    //Llamamos a la función crear, que crea las animaciones del mismo
    s2.create();

    enemies[1] = s2;

    shek = [];
    shek[0] = new Enemy(this,spawnpointShek3.x, spawnpointShek3.y);
    shek[1] = new Enemy(this, spawnpointShek4.x, spawnpointShek4.y);
    enemies[2] = shek[0];
    enemies[3] = shek[1];

///////////////////////////////////GODS////////////////////////////////////
    //ANUBIS
    //Creamos un objeto Dios, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    a = new God(this, spawnPointAnubis.x + 60/2, spawnPointAnubis.y + 90/2, "Anubis");
    //Llamamos a la función crear, que crea las animaciones del mismo
    a.create();

    //Creamos un objeto Dios, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    b = new God(this, spawnPointBastet.x + 60/2, spawnPointBastet.y + 90/2, "Bastet");
    //Llamamos a la función crear, que crea las animaciones del mismo
    b.create();

///////////////////////////////////CAMERA///////////////////////////////////
    //Hacemos que cada una siga a un personaje
    cameraPharaoh.startFollow(p.getSprite(), false, 1, 1, -200);
    cameraMummy.startFollow(m.getSprite(), false, 1, 1, -200);
    //Ponemos a las dos los límites del mapa
    cameraPharaoh.setBounds(0,0,map.widthInPixels,map.heightInPixels);
    cameraMummy.setBounds(0,0,map.widthInPixels,map.heightInPixels);

///////////////////////////////////ANTORCHAS///////////////////////////////////
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    //Si fuese de Matter sería colisionable y no queremos que sea colisionable
    torches = []
    for(var i = 0; i < 4; i++){
        torches.push(this.add.sprite(225 + 480*i,215,'torch'));

    };
    //Animación de las antorchas
    this.anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torch',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    //Ponemos las animaciones en bucle, de las cuatro creadas
    for(var i = 0; i<4;i++){
        torches[i].anims.play('torchAnim');
    };
    
///////////////////////////////////BUTTONS & DOOR///////////////////////////////////
    //Por cada objeto creamos un botón de la clase Button.js
    for(var i = 0; i < buttons.length; i++){
        buttons[i] = new Button(this, buttons[i].x, buttons[i].y);

    }
    //Creamos los sprites de la puerta
    const door1 = this.matter.add.image(15*120 + 60, 2*120 + 60, 'door', null, { isStatic: true });
    const door2 = this.matter.add.image(15*120 + 60, 3*120 + 60, 'door', null, { isStatic: true });
    const door3 = this.matter.add.image(31*120 + 60, 4*120 + 60, 'door', null, { isStatic: true });
    const door4 = this.matter.add.image(32*120 + 60, 4*120 + 60, 'door', null, { isStatic: true });
    const door3bis = this.matter.add.image(31*120 - 60, 8*120 + 60, 'door', null, { isStatic: true });
    const door4bis = this.matter.add.image(32*120 + 180, 8*120 + 60, 'door', null, { isStatic: true });
    door3.setAngle(-90);
    door4.setAngle(-90);
    door3bis.setAngle(-90);
    door4bis.setAngle(-90);
    const door5 = this.matter.add.image(54*120 + 60, 5*120 + 60, 'door', null, { isStatic: true });
    const door6 = this.matter.add.image(54*120 + 60, 4*120 + 60, 'door', null, { isStatic: true });

    //Puertas del último puzle
    const doorsPuzzle = [];
    for(var i = 0; i < 2; i++){
        const door = this.matter.add.image((65+i)*120 + 60, 1*120 + 60, 'door', null, { isStatic: true });
        doorsPuzzle[i] = door;
    }
    for(var i = 0; i < 2; i++){
        const door = this.matter.add.image((62+i)*120 + 60, 5*120 + 60, 'door', null, { isStatic: true });
        doorsPuzzle[i+2] = door;
    }
    for(var i = 0; i < 4; i++){
        doorsPuzzle[i].setAngle(-90);
    }
    




    //Función de actualización de botones
    updateButtons = function(){
        //Si se activa el sensor desaparecen las puertas y se transforman en sensores, por lo que el personaje las puede atravesar
        if(buttons[0].active){
            door1.setVisible(false);
            door2.setVisible(false);
            door1.setSensor(true);
            door2.setSensor(true);
        }else if(buttons[1].active){
            door3.x = 31*120 - 60;
            door4.x = 32*120 + 180;
            door3bis.x = 31*120 + 60;
            door4bis.x = 32*120 + 60;
        }else if(buttons[4].active){
            doorsPuzzle[0].x = 65*120 - 60;
            doorsPuzzle[1].x = 66*120 + 180;
        }else{
            door1.setVisible(true);
            door2.setVisible(true);
            door1.setSensor(false);
            door2.setSensor(false);
            door3.x = 31*120 + 60;
            door4.x = 32*120 + 60;
            door3bis.x = 31*120 - 60;
            door4bis.x = 32*120 + 180;
            doorsPuzzle[0].x = 65*120 + 60;
            doorsPuzzle[1].x = 66*120 + 60;   
        }
        if(buttons[2].active && buttons[3].active){
            doorsPuzzle[2].x = 62*120 - 60;
            doorsPuzzle[3].x = 63*120 + 180;
        }else{
            doorsPuzzle[2].x = 62*120 + 60;
            doorsPuzzle[3].x = 63*120 + 60;
        }
    }

    openDoors = function(){
        var dead = true;
        for(var i = 0; i< shek.length;i++){
            dead = dead && shek[i].dead
        }
        if(dead){
            door5.setVisible(false);
            door5.setSensor(true);
            door6.setVisible(false);
            door6.setSensor(true);
        }
    }
///////////////////////////////////VICTORY///////////////////////////////////
    zoneVictory = this.matter.add.rectangle(wayOut.x+(wayOut.width/2), wayOut.y+(wayOut.height/2),wayOut.width,wayOut.height,{isSensor:true, isStatic: true});

    this.mummyVictory = false;
    this.pharaohVictory = false;

    function onVictoryStartP({bodyA, bodyB, pair}){
        if(bodyB === zoneVictory){
            p.getSprite().setTint(0xddffdd)
            scene.pharaohVictory = true;
        }
    }
    function onVictoryStartM({bodyA, bodyB, pair}){
        if(bodyB === zoneVictory){
            m.getSprite().setTint(0xddffdd)
            scene.mummyVictory = true;
        }
    }

    function onVictory({bodyA, bodyB, pair}){
    }

    function onVictoryOutP({bodyA, bodyB, pair}){
        if(bodyB === zoneVictory){
            p.getSprite().setTint(0xffffff)
            scene.pharaohVictory = false;
        }
    }
    function onVictoryOutM({bodyA, bodyB, pair}){
        if(bodyB === zoneVictory){
            m.getSprite().setTint(0xffffff)
            scene.mummyVictory = false;
        }
    }

    this.matterCollision.addOnCollideStart({
        objectA: p.getSprite(),
        callback: onVictoryStartP,
        context: p.getSprite()
    })
    this.matterCollision.addOnCollideStart({
        objectA: m.getSprite(),
        callback: onVictoryStartM,
        context: m.getSprite()
    })
    this.matterCollision.addOnCollideActive({
        objectA: p.getSprite(),
        callback: onVictory,
        context: p.getSprite()
    })
    this.matterCollision.addOnCollideActive({
        objectA: m.getSprite(),
        callback: onVictory,
        context: m.getSprite()
    })
    this.matterCollision.addOnCollideEnd({
        objectA: p.getSprite(),
        callback: onVictoryOutP,
        context: p.getSprite()
    })
    this.matterCollision.addOnCollideEnd({
        objectA: m.getSprite(),
        callback: onVictoryOutM,
        context: m.getSprite()
    })
///////////////////////////////////EVENT TUTORIAL///////////////////////////////////
    //Crea un rectángulo, sensor, con las medidas del objeto de Tile de la zona de Anubis
    zoneAnubis = this.matter.add.rectangle(Anubis.x+(Anubis.width/2), Anubis.y+(Anubis.height/2), Anubis.width, Anubis.height, {isSensor: true, isStatic: true});

    //Crea un rectángulo, sensor, con las medidas del objeto de Tile de la zona de Bastet
    zoneBastet = this.matter.add.rectangle(Bastet.x+(Bastet.width/2), Bastet.y+(Bastet.height/2), Bastet.width, Bastet.height, {isSensor: true, isStatic: true});
    //Booleanos que se volverán true cuando se haya visto todo el tutorial
    this.learnedA = false;
    this.learnedB = false;
    //Contadores que llevan el texto que se tiene que mostrar
    this.anubisText = 0;
    this.bastetText = 0;
    //ANUBIS
    //Textos del tutorial de Anubis
    var wordsAnubis1 = ["Hola, soy Anubis, maestro de la Necropolis.",
    "Te he revivido porque en vida te enamoraste de una\npersona de la que no podías, por lo que os doy la\noportunidad de vivir juntos.",
    "Para ello necesitaréis salir de la pirámide JUNTOS"];
    var wordsAnubis2 = ["Te otorgo el poder del fuego místico, podrás recoger\nel calor de tu alrededor y concentrarlo en llamas",
    "delante de tí para lograrlo solo has de pulsar\nla tecla de dirección 'abajo'"];
    var wordsAnubis3 = ["Te otorgo también el poder de la telequinesis\npara usarlo has de apuntar con este cetro, pulsar",
    "el botón izquierdo y arrastrar."]
    //Hacemos que el texto aparezca en el mismo lugar que el objeto de texto de Tiled
    this.sayAnubis1 = this.add.text(textAnubis.x, textAnubis.y, wordsAnubis1).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');
    this.sayAnubis2 = this.add.text(textAnubis.x, textAnubis.y, wordsAnubis2).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');
    this.sayAnubis3 = this.add.text(textAnubis.x, textAnubis.y, wordsAnubis3).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');
    //Profundidad 100 para que aparezca delante de todo
    this.sayAnubis1.depth = 100;
    //Invisible mientras no esté en el tutorial
    this.sayAnubis1.setVisible(false);
    //Profundidad 100 para que aparezca delante de todo
    this.sayAnubis2.depth = 100;
    //Invisible mientras no esté en el tutorial
    this.sayAnubis2.setVisible(false);
    //Profundidad 100 para que aparezca delante de todo
    this.sayAnubis3.depth = 100;
    //Invisible mientras no esté en el tutorial
    this.sayAnubis3.setVisible(false);

    //BASTET
    //Textos del tutorial de Bastet
    var wordsBastet1 = ["Hola, soy Bastet, Diosa de la armonía del hogar.",
    "Te he revivido porque en vida te enamoraste de una\npersona de la que no deberías, por lo que os doy la\n oportunidad de vivir juntos.",
    "Para ello necesitaréis salir de la pirámide JUNTOS"];
    var wordsBastet2 = ["Te otorgo el poder de las vendas malditas\npodrás estirar tus vendas pulsando 'ESPACIO' y de",
    "esta manera podrás derrotar los enemigos\nque se antepongan"];
    //Hacemos que el texto aparezca en el mismo lugar que el objeto de texto de Tiled
    this.sayBastet1 = this.add.text(textBastet.x, textBastet.y, wordsBastet1).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');
    this.sayBastet2 = this.add.text(textBastet.x, textBastet.y, wordsBastet2).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');
    //Profundidad 100 para que aparezca delante de todo
    this.sayBastet1.depth = 100;
    //Invisible mientras no esté en el tutorial
    this.sayBastet1.setVisible(false);
    //Profundidad 100 para que aparezca delante de todo
    this.sayBastet2.depth = 100;
    //Invisible mientras no esté en el tutorial
    this.sayBastet2.setVisible(false);


    //COLISIONES CON LAS ZONAS DE EVENTO

    //FARAÓN
    //Al inicio de la colisión del sprite del faraón con algo llama a eventAnubisIn()
    this.matterCollision.addOnCollideStart({
        objectA: p.getSprite(),
        callback: eventAnubisIn,
        context: p.getSprite()
    })
    //Al final de la colisión del sprite del faraón con algo llama a eventAnubisOut()
    this.matterCollision.addOnCollideEnd({
        objectA: p.getSprite(),
        callback: eventAnubisOut,
        context: p.getSprite()
    })
    //Evento cuando colisiona con algo el FARAÓN
    function eventAnubisIn({bodyA, bodyB, pair}){
        //Si con lo que colisiona es la zona de Anubis, no ha aprendido el tutorial y la posición del tutorial en la que se encuentra es la 0
        if(bodyB === zoneAnubis && !scene.learnedA && scene.anubisText === 0){
            //Tutorial aprendido
            scene.learnedA = true;
            //Pasa a tener que mostrar el segundo texto
            scene.anubisText = 1;
            //Texto 1 visible
            scene.sayAnubis1.setVisible(true);
            //Después de un breve tiempo se hace que el faraón no se pueda mover con los botones de control. Se hace que sea después de un tiempo
            //Para que no haya problemas por estar al filo de la colisión
            scene.time.addEvent({
                delay: 250,
                callback: ()=>( p.steady = true),
                callbackScope: this
            });
        }
    }
    //Evento cuando deja de colisionar con algo el FARAÓN
    function eventAnubisOut({bodyA, bodyB, pair}){
        //Si con lo que colisiona es la zona de Anubis
        if(bodyB === zoneAnubis){
            //Esconde todos los textos de tutorial
            scene.sayAnubis1.setVisible(false);
            scene.sayAnubis2.setVisible(false);
        }
    }

    //MOMIA
    //Al inicio de la colisión del sprite de la momia con algo llama a eventBastetIn()
    this.matterCollision.addOnCollideStart({
        objectA: m.getSprite(),
        callback: eventBastetIn,
        context: m.getSprite()
    })
    //Al final de la colisión del sprite de la momia con algo llama a eventBastetOut()
    this.matterCollision.addOnCollideEnd({
        objectA: m.getSprite(),
        callback: eventBastetOut,
        context: m.getSprite()
    })
    //Evento cuando colisiona con algo la MOMIA
    function eventBastetIn({bodyA, bodyB, pair}){
        //Si colisiona con la zona Bastet, no ha aprendido el tutorial y se tiene que mostrar el primer texto
        if(bodyB === zoneBastet && !scene.learnedB && scene.bastetText === 0){
            //Tutorial aprendido
            scene.learnedB = true;
            //Text0 1 visible
            scene.sayBastet1.setVisible(true);
            //El siguiente texto que mostrar es el 2
            scene.bastetText = 1;
            //Después de un breve tiempo se hace que la momia no se pueda mover con los botones de control. Se hace que sea después de un tiempo
            //Para que no haya problemas por estar al filo de la colisión
            scene.time.addEvent({
                delay: 250,
                callback: ()=>( m.steady = true),
                callbackScope: this
            });
        }
    }

    //Evento cuando deja de colisionar con algo la MOMIA
    function eventBastetOut({bodyA, bodyB, pair}){
        //Si ese algo es la zona Bastet
        if(bodyB === zoneBastet){
            //Se esconden los textos
            scene.sayBastet1.setVisible(false);
            scene.sayBastet2.setVisible(false);
        }
    }
    
    //Los textos de Bastet no se le muestran al faraón
    cameraPharaoh.ignore(this.sayBastet1);
    cameraPharaoh.ignore(this.sayBastet2);
    //Los textos de Anubis no se le muestran a la momia
    cameraMummy.ignore(this.sayAnubis1);
    cameraMummy.ignore(this.sayAnubis2);
    cameraMummy.ignore(this.sayAnubis3);


///////////////////////////////////PURPLE BOXES///////////////////////////////////
    //Creamos una objeto PurpleBox con las coordenadas del objeto del tilemap
    this.box1 = new PurpleBox(this, spawnBox1.x, spawnBox1.y, 705, 860, 'PurpleBox1', 0, 0.01, 0.1, 100);
    //Llamamos a create que crea las animaciones del objeto
    

    this.box2 = new PurpleBox(this, spawnBox2.x, spawnBox2.y,220,860,'PurpleBox1',0,0.01,0.1,100);

    //Lo introducimos en el array de cajas
    box = [this.box1,this.box2];
    for(var i = 0;i<box.length;i++){
        box[i].create();
    }

///////////////////////////////////DEBUG///////////////////////////////////
    /*    //Muestra las líneas de colisión de los elementos del mundo pulsando la F
    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = false;
    this.input.keyboard.on("keydown_F", event => {
      this.matter.world.drawDebug = !this.matter.world.drawDebug;
      this.matter.world.debugGraphic.clear();
    });
    */
///////////////////////////////////CONTROLES///////////////////////////////////
    //Extraemos las teclas de dirección, W,A,D y barra espaciadora de las KeyCodes de Phaser
    const {LEFT, RIGHT, UP, DOWN, W, A, D, C, R, SPACE} = Phaser.Input.Keyboard.KeyCodes;
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
        space: SPACE
    });
    
    if(myUser.character==2){
    	//Evento cuando se hace click
	    this.input.on('pointerdown',function(pointer){
	    	this.clickNWS = true;
	        //Si se tiene que mostrar el segundo texto
	        if(scene.anubisText === 1){
	            //Se hace invisible el primer texto
	            scene.sayAnubis1.setVisible(false);
	            //Se hace visible el segundo
	            scene.sayAnubis2.setVisible(true);
	            //El siguiente texto que se tiene que mostrar es el tercero
	            scene.anubisText = 2;
	        }else if(scene.anubisText === 2){ //Si ha terminado de mostrar textos
	            //Se esconde el texto 2
	            scene.sayAnubis2.setVisible(false);
	            scene.sayAnubis3.setVisible(true);
	            scene.anubisText = 3
	        }else if(scene.anubisText === 3){
	            scene.sayAnubis3.setVisible(false);
	            //Permitimos movimiento del faraón
	            p.steady = false;
	            //Cambiamos el puntero al cetro
	            scene.input.setDefaultCursor('url(Sprites/cetro.png), pointer');
	            p.getSprite().setVelocity(0,0)
	        }
	    },this);
	    
	    this.input.on('pointerup',function(pointer){
	    	this.clickNWS = false;
	    },this);
    }
    
    

///////////////////////////////////OBJETOS///////////////////////////////////
    //ARENA
    //Añadimos a un array de arena 30 granos de arena (10 por for)
    arena = []
    for(var i = 0; i < 200; i++){
        arena[i] = this.matter.add.sprite(spawnPointSand.x + 0.5+i, spawnPointSand.y, 'sand', { restitution: 1, friction: 0.1 });
        arena[i].setScale(1.5);
    }    


    
    

    //CAJAS
    //Creamos una cada inservible
    const caja = this.matter.add.image(1500, 150, 'box', { restitution: 0, frictionAir: 0, friction: 0.2, density: 0.0005 });
    const utilBox1 = this.matter.add.image(65*120, 0, 'box', { restitution: 0, frictionAir: 0, friction: 0.2, density: 0.0005 });
    const utilBox2 = this.matter.add.image(68*120, 3*120, 'box', { restitution: 0, frictionAir: 0, friction: 0.2, density: 0.0005 });

    //LLAMAR AL CALCETINETE
    onlineG.updateCalcetinete();


}//FIN DEL CREATE

onlineG.update = function(){
   
    //Variable keys de nuestros objetos de teclas
    const keys = this.keys;
    //No se puede mover ninguna caja
    move = false;
///////////////////////////////////ACTUALIZACIÓN DE SPRITES///////////////////////////////////

   
    //Si el faraón no está muerto
    if(!p.dead){   
        //Actualizamos faraón
        p.update(keys);
        //Resetamos el estado de colisiones de los sensores del faraón
        p.resetColliding();
    }else{
        //Si lo está que la cámara deje de seguirle
        cameraPharaoh.stopFollow()
        p.destroy()
    }
    //Si la momia no está muerta
    if(!m.dead){
        //Actualizamos momia
        m.update(keys);
        //Resetamos el estado de colisiones de los sensores de la momia
        m.resetColliding();
    }else{
        //Si lo está que la cámara deje de seguirla
        cameraMummy.stopFollow();
        m.destroy()
    }
    
    //Si Shek no está muerto
    if(!s.dead){
        //Actualizamos Shek
        s.update();
        //Reseteamos el estado de colisiones de los sensores del Shek
        s.resetColliding();
    }
    //Si Shek no está muerto
    if(!s2.dead){
        //Actualizamos Shek
        s2.update()
        //Reseteamos el estado de colisiones de los sensores del Shek
        s2.resetColliding()
    }
    for(var i=0;i<shek.length;i++){
        if(!shek[i].dead){
            shek[i].update();
            shek[i].resetColliding();
        }
    }
    //Actualizamos Anubis
    a.update();
    //Actualizamos Bastet
    b.update();
    //Actualización de todas las cajas (recorre el array de todas las cajas)
    for(var i = 0; i < box.length; i++){
        move = move || box[i].move;
        box[i].update();
    }
    //Actualización de todos los botones (recorre el array de todos los botones)
    for(var i = 0; i < buttons.length; i++){
        buttons[i].update();
        buttons[i].resetColliding();
    }

///////////////////////////////////RESOLVER COLISIONES///////////////////////////////////
    //Resuelve colisiones de los botones
    updateButtons();
    openDoors();
///////////////////////////////////RESOLVER CONTROLES///////////////////////////////////
    //Si se acaba de pulsar el espacio
    if(Phaser.Input.Keyboard.JustDown(keys.space)){
        //Si tiene que mostrar el segundo texto
        if(this.bastetText === 1){
            //Hace invisible el primer texto y visible el segundo
            this.sayBastet1.setVisible(false);
            this.sayBastet2.setVisible(true);
            //El siguiente texto que se muestra es el tercero
            this.bastetText = 2;
        }else if(this.bastetText === 2){//Si se tiene que mostrar el "tercero", que no existe
            //Escondemos el texto 2
            this.sayBastet2.setVisible(false);
            //Permitimos movimiento a la momia
            m.steady = false;
        }
    }
    if(myUser.character==1){
    	if(this.clickWS){
	    	//Si se tiene que mostrar el segundo texto
	        if(scene.anubisText === 1){
	            //Se hace invisible el primer texto
	            scene.sayAnubis1.setVisible(false);
	            //Se hace visible el segundo
	            scene.sayAnubis2.setVisible(true);
	            //El siguiente texto que se tiene que mostrar es el tercero
	            scene.anubisText = 2;
	        }else if(scene.anubisText === 2){ //Si ha terminado de mostrar textos
	            //Se esconde el texto 2
	            scene.sayAnubis2.setVisible(false);
	            scene.sayAnubis3.setVisible(true);
	            scene.anubisText = 3
	        }else if(scene.anubisText === 3){
	            scene.sayAnubis3.setVisible(false);
	            //Permitimos movimiento del faraón
	            p.steady = false;
	            //Cambiamos el puntero al cetro
	            scene.input.setDefaultCursor('url(Sprites/cetro.png), pointer');
	            p.getSprite().setVelocity(0,0)
	        }
	    }
    }
    
    
    
    if(Phaser.Input.Keyboard.JustDown(keys.r)){
        
        scene.time.addEvent({
            delay: 100,
            callback: ()=>(onlineG.scene.restart()),
            callbackScope: scene
        });
        
    }
    if(Phaser.Input.Keyboard.JustDown(keys.c)){
        
        if(this.doubleCamera){
            this.doubleCamera = false;
            cameraPharaoh = this.cameras.add(0,0,1920,1080).setName('camPharaoh');
            cameraMummy = this.cameras.add(1920,1080,0,0).setName('camMummy');
            cameraPharaoh.startFollow(p.getSprite(), false, 1, 1, -200);
            cameraPharaoh.setBounds(0,0,map.widthInPixels,map.heightInPixels);
            cameraPharaoh.ignore(this.sayBastet1);
            cameraPharaoh.ignore(this.sayBastet2);            
        }else{
            this.doubleCamera = true;
            this.cameras.remove(cameraMummy)
            this.cameras.remove(cameraPharaoh)
            cameraMummy = this.cameras.add(0,0,940,1080).setName('camMummy');
            cameraPharaoh = this.cameras.add(980,0,940,1080).setName('camPharaoh');
            cameraPharaoh.startFollow(p.getSprite(), false, 1, 1, -200);
            cameraMummy.startFollow(m.getSprite(), false, 1, 1, -200);
            cameraPharaoh.setBounds(0,0,map.widthInPixels,map.heightInPixels);
            cameraMummy.setBounds(0,0,map.widthInPixels,map.heightInPixels);
            cameraPharaoh.ignore(this.sayBastet1);
            cameraPharaoh.ignore(this.sayBastet2);
            cameraMummy.ignore(this.sayAnubis1);
            cameraMummy.ignore(this.sayAnubis2);
            cameraMummy.ignore(this.sayAnubis3);
            for(var i=0;i<p.health.health.length;i++){
                cameraMummy.ignore(p.health.health[i])
            }
            
            for(var i=0;i<m.health.health.length;i++){
                cameraPharaoh.ignore(m.health.health[i])
            }
            
        }
        
    }
    if(this.mummyVictory && this.pharaohVictory){
        onlineG.scene.restart()
        p.getSprite().setVelocity(0,0)
        m.getSprite().setVelocity(0,0)
        onlineG.scene.switch(victoria)
    }


}//FINAL UPDATE

onlineG.updateCalcetinete = function(){
    const keys = this.keys
    if(myUser.character == 1)
    {
        setInterval(function(){
            sendMummy(m.mummy.x, m.mummy.y, m.health.life, m.mummy.body.force.x, keys.w.isDown, keys.space.isDown);
        }, 30);
    }
    else if(myUser.character == 2)
    {
        setInterval(function(){
            sendPharaoh(p.pharaoh.x, p.pharaoh.y, p.health.life, p.pharaoh.body.force.x, keys.up.isDown, keys.down.isDown, onlineG.clickWS);
        }, 30);
    }
}
