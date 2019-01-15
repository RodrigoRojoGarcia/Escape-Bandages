var offline = new Phaser.Scene('Offline');

offline.preload = function(){

   
}//FIN DEL PRELOAD

offline.create = function(){


///////////////////////////////////CONFIG///////////////////////////////////
    currentScene = this;
    
    this.inputEnabled = true;
    this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');

    //Creamos dos cámaras en las dos mitades de la pantalla con 40 píxeles de por medio
    
    this.cameraMummy = this.cameras.main.setSize(940,1080).setName('camMummy');
    this.cameraPharaoh = this.cameras.add(980,0,940,1080).setName('camPharaoh');
    this.doubleCamera = true;
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //Creación del TILEMAP
	this.map = this.make.tilemap({key:"map", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = this.map.addTilesetImage("tileset","tile");

    //Extraemos las capas del TILEMAP
    const bg= this.map.createDynamicLayer("Background", tiles, 0,0);
    const exit = this.map.createDynamicLayer("Exit", tiles, 0,0)
	const layer = this.map.createDynamicLayer("Foreground",tiles,0,0);

    //Hacemos la capa LAYER (FOREGROUND) colisionable
    layer.setCollisionByProperty({ collider: true });
    //Se lo decimos a Matter
    this.matter.world.convertTilemapLayer(layer);
    //Colisión de los objetos con los bordes del mundo
    this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels + 240);

    

///////////////////////////////////EXTRACCIÓN ELEMENTOS TILEMAP(JSON)///////////////////////////////////

    //SPAWNPOINTS
    //Faraón
    const spawnPointPharaoh = this.map.findObject("Objects", obj => obj.name === "SpawnPointPharaoh");
    //Momia
    const spawnPointMummy = this.map.findObject("Objects", obj => obj.name === "SpawnPointMummy");
    //Anubis
    const spawnPointAnubis = this.map.findObject("Objects", obj => obj.name === "GodAnubis");
    //Bastet
    const spawnPointBastet = this.map.findObject("Objects", obj => obj.name === "GodBastet");
    //Shek
    const spawnPointShek = this.map.findObject("Objects", obj => obj.name === "Shek");
    //Shek2
    const spawnPointShek2 = this.map.findObject("Objects", obj=> obj.name === "Shek2");
    //Shek3
    const spawnpointShek3 = this.map.findObject("Objects", obj=> obj.name === "Shek3");
    //Shek4
    const spawnpointShek4 = this.map.findObject("Objects", obj=> obj.name === "Shek4");
    //Cajas
    const spawnBox1 = this.map.findObject("Objects", obj => obj.name === "PurpleBox");
    const spawnBox2 = this.map.findObject("Objects", obj => obj.name === "PurpleBox2");
    //Arena
    const spawnPointSand = this.map.findObject("Objects", obj=> obj.name === "Sand");

    //OBJETOS
    //Zonas de Evento
    const Anubis = this.map.findObject("Objects", obj => obj.name === "Anubis");
    const Bastet = this.map.findObject("Objects", obj => obj.name === "Bastet");
    const wayOut = this.map.findObject("Objects", obj=>obj.name === "Victory")
    //Cajas de texto de tutorial
    const textAnubis = this.map.findObject("Objects", obj => obj.name === "TextAnubis");
    const textBastet = this.map.findObject("Objects", obj => obj.name === "TextBastet");
    //Botones
    this.buttons = this.map.createFromObjects('Buttons', 4, { key: 'button' });
    
    //escena love
    this.loving = false;

///////////////////////////////////PLAYERS///////////////////////////////////
    //FARAÓN
    //Creamos un objeto Faraón, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    this.p = new Pharaoh(this, spawnPointPharaoh.x, spawnPointPharaoh.y);

    //Le atribuímos una profundidad de 1, por lo que pasará por delante de objetos a los que no le introduzcamos ningún valor de depth modificado
    //(El valor de depth por defecto es 0)
    this.p.getSprite().depth = 2
 
    //MOMIA
    //Creamos un objeto Momia, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    this.m = new Mummy(this,spawnPointMummy.x, spawnPointMummy.y);

    //Le atribuímos una profundidad de 1, por lo que pasará por delante de objetos a los que no le introduzcamos ningún valor de depth modificado
    this.m.getSprite().depth = 2

///////////////////////////////////ENEMIES///////////////////////////////////
    this.enemies = [];
    //SHEK
    //Creamos un objeto Enemigo, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    this.s = new Enemy(this,spawnPointShek.x, spawnPointShek.y, 'snake', 0.1, 0.5, 20, 50);
 

    this.enemies[0] = this.s;
    //Creamos un objeto Enemigo, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    this.s2 = new Enemy(this,spawnPointShek2.x, spawnPointShek2.y, 'snake', 0.1, 0.5, 20, 50);
 

    this.enemies[1] = this.s2;

    this.shek = [];
    this.shek[0] = new Enemy(this,spawnpointShek3.x, spawnpointShek3.y, 'snake', 0.1, 0.5, 20, 50);
    this.shek[1] = new Enemy(this, spawnpointShek4.x, spawnpointShek4.y, 'snake', 0.1, 0.5, 20, 50);
    this.enemies[2] = this.shek[0];
    this.enemies[3] = this.shek[1];


///////////////////////////////////GODS////////////////////////////////////
    //ANUBIS
    //Creamos un objeto Dios, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    this.a = new God(this, spawnPointAnubis.x + 60/2, spawnPointAnubis.y + 90/2, "Anubis");
  

    //Creamos un objeto Dios, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    this.b = new God(this, spawnPointBastet.x + 60/2, spawnPointBastet.y + 90/2, "Bastet");
  
///////////////////////////////////CAMERA///////////////////////////////////
    //Hacemos que cada una siga a un personaje
    this.cameraPharaoh.startFollow(this.p.getSprite(), false, 1, 1, -200);
    this.cameraMummy.startFollow(this.m.getSprite(), false, 1, 1, -200);
    //Ponemos a las dos los límites del mapa
    this.cameraPharaoh.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
    this.cameraMummy.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

///////////////////////////////////ANTORCHAS///////////////////////////////////
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    //Si fuese de Matter sería colisionable y no queremos que sea colisionable
    this.torches = []
    for(var i = 0; i < 4; i++){
        this.torches.push(this.add.sprite(225 + 480*i,215,'torch'));

    };

    //Ponemos las animaciones en bucle, de las cuatro creadas
    for(var i = 0; i<4;i++){
        this.torches[i].anims.play('torchAnim');
    };
    
///////////////////////////////////BUTTONS & DOOR///////////////////////////////////
    //Por cada objeto creamos un botón de la clase Button.js
    for(var i = 0; i < this.buttons.length; i++){
        this.buttons[i] = new Button(this, this.buttons[i].x, this.buttons[i].y);

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
    this.updateButtons = function(){
        //Si se activa el sensor desaparecen las puertas y se transforman en sensores, por lo que el personaje las puede atravesar
        if(offline.buttons[0].active){
            door1.setVisible(false);
            door2.setVisible(false);
            door1.setSensor(true);
            door2.setSensor(true);
        }else{
            door1.setVisible(true);
            door2.setVisible(true);
            door1.setSensor(false);
            door2.setSensor(false);
        }
        if(offline.buttons[1].active){
            door3.x = 31*120 - 60;
            door4.x = 32*120 + 180;
            door3bis.x = 31*120 + 60;
            door4bis.x = 32*120 + 60;
        }else{
            door3.x = 31*120 + 60;
            door4.x = 32*120 + 60;
            door3bis.x = 31*120 - 60;
            door4bis.x = 32*120 + 180;
        } 
        if(offline.buttons[4].active){
            doorsPuzzle[0].x = 65*120 - 60;
            doorsPuzzle[1].x = 66*120 + 180;
        }else{
            doorsPuzzle[0].x = 65*120 + 60;
            doorsPuzzle[1].x = 66*120 + 60;   
        }
        if(offline.buttons[2].active && offline.buttons[3].active){
            doorsPuzzle[2].x = 62*120 - 60;
            doorsPuzzle[3].x = 63*120 + 180;
        }else{
            doorsPuzzle[2].x = 62*120 + 60;
            doorsPuzzle[3].x = 63*120 + 60;
        }
    }

    this.openDoors = function(){
        var dead = true;
        for(var i = 0; i< offline.shek.length;i++){
            dead = dead && offline.shek[i].dead
        }
        if(dead){
            door5.setVisible(false);
            door5.setSensor(true);
            door6.setVisible(false);
            door6.setSensor(true);
        }
    }
///////////////////////////////////VICTORY///////////////////////////////////
    this.zoneVictory = this.matter.add.rectangle(wayOut.x+(wayOut.width/2), wayOut.y+(wayOut.height/2),wayOut.width,wayOut.height,{isSensor:true, isStatic: true});

    this.mummyVictory = false;
    this.pharaohVictory = false;

    function onVictoryStartP({bodyA, bodyB, pair}){
        if(bodyB === offline.zoneVictory){
            offline.p.getSprite().setTint(0xddffdd)
            offline.pharaohVictory = true;
        }
    }
    function onVictoryStartM({bodyA, bodyB, pair}){
        if(bodyB === offline.zoneVictory){
            offline.m.getSprite().setTint(0xddffdd)
            offline.mummyVictory = true;
        }
    }

    function onVictory({bodyA, bodyB, pair}){
    }

    function onVictoryOutP({bodyA, bodyB, pair}){
        if(bodyB === offline.zoneVictory){
            offline.p.getSprite().setTint(0xffffff)
            offline.pharaohVictory = false;
        }
    }
    function onVictoryOutM({bodyA, bodyB, pair}){
        if(bodyB === offline.zoneVictory){
            offline.m.getSprite().setTint(0xffffff)
            offline.mummyVictory = false;
        }
    }

    this.matterCollision.addOnCollideStart({
        objectA: offline.p.getSprite(),
        callback: onVictoryStartP,
        context: offline.p.getSprite()
    })
    this.matterCollision.addOnCollideStart({
        objectA: offline.m.getSprite(),
        callback: onVictoryStartM,
        context: offline.m.getSprite()
    })
    this.matterCollision.addOnCollideActive({
        objectA: offline.p.getSprite(),
        callback: onVictory,
        context: offline.p.getSprite()
    })
    this.matterCollision.addOnCollideActive({
        objectA: offline.m.getSprite(),
        callback: onVictory,
        context: offline.m.getSprite()
    })
    this.matterCollision.addOnCollideEnd({
        objectA: offline.p.getSprite(),
        callback: onVictoryOutP,
        context: offline.p.getSprite()
    })
    this.matterCollision.addOnCollideEnd({
        objectA: offline.m.getSprite(),
        callback: onVictoryOutM,
        context: offline.m.getSprite()
    })
///////////////////////////////////EVENT TUTORIAL///////////////////////////////////
    //Crea un rectángulo, sensor, con las medidas del objeto de Tile de la zona de Anubis
    this.zoneAnubis = this.matter.add.rectangle(Anubis.x+(Anubis.width/2), Anubis.y+(Anubis.height/2), Anubis.width, Anubis.height, {isSensor: true, isStatic: true});

    //Crea un rectángulo, sensor, con las medidas del objeto de Tile de la zona de Bastet
    this.zoneBastet = this.matter.add.rectangle(Bastet.x+(Bastet.width/2), Bastet.y+(Bastet.height/2), Bastet.width, Bastet.height, {isSensor: true, isStatic: true});
    //Booleanos que se volverán true cuando se haya visto todo el tutorial
    this.learnedA = false;
    this.learnedB = false;
    //Contadores que llevan el texto que se tiene que mostrar
    this.anubisText = 0;
    this.bastetText = 0;
    //ANUBIS
    //Textos del tutorial de Anubis
    var wordsAnubis1 = ["Greetings, I'm Anubis, god of the Necropolis.",
    "I've resurrected you because you fell in love with\nsomeone you couldn't, so I'm giving you\nthe opportunity to live together.",
    "But for this to work, you'll need to escape from the\npyramid... TOGETHER"]

    var wordsAnubis2 = ["I give you the gift of the arcane fire, you'll be able\nto collect the heat around you and concentrated in flames",
    "in front of you. In order to do that you just need to presss\nthe down arrow key."]

    var wordsAnubis3 = ["I give you the gift of the ancient psychokinesis,\nto use it you'll need to aim with this ceptre, press",
    "the left button and drag."]



    var palabrasAnubis1 = ["Hola, soy Anubis, maestro de la Necropolis.",
    "Te he revivido porque en vida te enamoraste de una\npersona de la que no podías, por lo que os doy la\noportunidad de vivir juntos.",
    "Para ello necesitaréis salir de la pirámide JUNTOS"];
    var palabrasAnubis2 = ["Te otorgo el poder del fuego místico, podrás recoger\nel calor de tu alrededor y concentrarlo en llamas",
    "delante de tí para lograrlo solo has de pulsar\nla tecla de dirección 'abajo'"];
    var palabrasAnubis3 = ["Te otorgo también el poder de la telequinesis\npara usarlo has de apuntar con este cetro, pulsar",
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

    var wordsBastet1 = ["Greetings, I'm Bastet, domestic cat goddess.",
    "I've resurrected you because in life you fell in love with\nsomeone you couldn't, so I'm ginving you\nthe opportunity to live together.",
    "But for this to work, you'll need to escape the\npyramid... TOGETHER"]

    var wordsBastet2 = ["I give you the gift of the cursed bandages\nyou'll be able to stretch your bandages pressing 'SPACE', this way",
    "you'll be able to defeat any foe\nthat may appear upon you."]



    var palabrasBastet1 = ["Hola, soy Bastet, Diosa de la armonía del hogar.",
    "Te he revivido porque en vida te enamoraste de una\npersona de la que no deberías, por lo que os doy la\n oportunidad de vivir juntos.",
    "Para ello necesitaréis salir de la pirámide JUNTOS"];
    var palabrasBastet2 = ["Te otorgo el poder de las vendas malditas\npodrás estirar tus vendas pulsando 'ESPACIO' y de",
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
        objectA: offline.p.getSprite(),
        callback: eventAnubisIn,
        context: offline.p.getSprite()
    })
    //Al final de la colisión del sprite del faraón con algo llama a eventAnubisOut()
    this.matterCollision.addOnCollideEnd({
        objectA: offline.p.getSprite(),
        callback: eventAnubisOut,
        context: offline.p.getSprite()
    })
    //Evento cuando colisiona con algo el FARAÓN
    function eventAnubisIn({bodyA, bodyB, pair}){
        //Si con lo que colisiona es la zona de Anubis, no ha aprendido el tutorial y la posición del tutorial en la que se encuentra es la 0
        if(bodyB === offline.zoneAnubis && !offline.learnedA && offline.anubisText === 0){
            //Tutorial aprendido
            offline.learnedA = true;
            //Pasa a tener que mostrar el segundo texto
            offline.anubisText = 1;
            //Texto 1 visible
            offline.sayAnubis1.setVisible(true);
            //Después de un breve tiempo se hace que el faraón no se pueda mover con los botones de control. Se hace que sea después de un tiempo
            //Para que no haya problemas por estar al filo de la colisión
            offline.time.addEvent({
                delay: 250,
                callback: ()=>( offline.p.steady = true),
                callbackScope: offline
            });
        }
    }
    //Evento cuando deja de colisionar con algo el FARAÓN
    function eventAnubisOut({bodyA, bodyB, pair}){
        //Si con lo que colisiona es la zona de Anubis
        if(bodyB === offline.zoneAnubis){
            //Esconde todos los textos de tutorial
           offline.sayAnubis1.setVisible(false);
           offline.sayAnubis2.setVisible(false);
        }
    }

    //MOMIA
    //Al inicio de la colisión del sprite de la momia con algo llama a eventBastetIn()
    this.matterCollision.addOnCollideStart({
        objectA: offline.m.getSprite(),
        callback: eventBastetIn,
        context: offline.m.getSprite()
    })
    //Al final de la colisión del sprite de la momia con algo llama a eventBastetOut()
    this.matterCollision.addOnCollideEnd({
        objectA: offline.m.getSprite(),
        callback: eventBastetOut,
        context: offline.m.getSprite()
    })
    //Evento cuando colisiona con algo la MOMIA
    function eventBastetIn({bodyA, bodyB, pair}){
        //Si colisiona con la zona Bastet, no ha aprendido el tutorial y se tiene que mostrar el primer texto
        if(bodyB === offline.zoneBastet && !offline.learnedB && offline.bastetText === 0){
            //Tutorial aprendido
            offline.learnedB = true;
            //Text0 1 visible
            offline.sayBastet1.setVisible(true);
            //El siguiente texto que mostrar es el 2
            offline.bastetText = 1;
            //Después de un breve tiempo se hace que la momia no se pueda mover con los botones de control. Se hace que sea después de un tiempo
            //Para que no haya problemas por estar al filo de la colisión
            offline.time.addEvent({
                delay: 250,
                callback: ()=>( offline.m.steady = true),
                callbackScope: offline
            });
        }
    }

    //Evento cuando deja de colisionar con algo la MOMIA
    function eventBastetOut({bodyA, bodyB, pair}){
        //Si ese algo es la zona Bastet
        if(bodyB === offline.zoneBastet){
            //Se esconden los textos
            offline.sayBastet1.setVisible(false);
            offline.sayBastet2.setVisible(false);
        }
    }
    
    //Los textos de Bastet no se le muestran al faraón
    this.cameraPharaoh.ignore(this.sayBastet1);
    this.cameraPharaoh.ignore(this.sayBastet2);
    //Los textos de Anubis no se le muestran a la momia
    this.cameraMummy.ignore(this.sayAnubis1);
    this.cameraMummy.ignore(this.sayAnubis2);
    this.cameraMummy.ignore(this.sayAnubis3);


///////////////////////////////////PURPLE BOXES///////////////////////////////////
    //Creamos una objeto PurpleBox con las coordenadas del objeto del tilemap
    this.box1 = new PurpleBox(this, spawnBox1.x, spawnBox1.y, 705, 860, 'PurpleBox1', 0, 0.01, 0.1, 100);
    //Llamamos a create que crea las animaciones del objeto
    

    this.box2 = new PurpleBox(this, spawnBox2.x, spawnBox2.y,220,860,'PurpleBox1',0,0.01,0.1,100);

    //Lo introducimos en el array de cajas
    this.box = [this.box1,this.box2];
    for(var i = 0;i<this.box.length;i++){
        this.box[i].create();
    }

///////////////////////////////////DEBUG///////////////////////////////////
        //Muestra las líneas de colisión de los elementos del mundo pulsando la F
    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = false;
    this.input.keyboard.on("keydown_F", event => {
      this.matter.world.drawDebug = !this.matter.world.drawDebug;
      this.matter.world.debugGraphic.clear();
    });
    
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
    //Evento cuando se hace click
    this.input.on('pointerdown',function(pointer){
        //Si se tiene que mostrar el segundo texto
        if(offline.anubisText === 1){
            //Se hace invisible el primer texto
            offline.sayAnubis1.setVisible(false);
            //Se hace visible el segundo
            offline.sayAnubis2.setVisible(true);
            //El siguiente texto que se tiene que mostrar es el tercero
            offline.anubisText = 2;
        }else if(offline.anubisText === 2){ //Si ha terminado de mostrar textos
            //Se esconde el texto 2
            offline.sayAnubis2.setVisible(false);
            offline.sayAnubis3.setVisible(true);
            offline.anubisText = 3
        }else if(offline.anubisText === 3){
            offline.sayAnubis3.setVisible(false);
            //Permitimos movimiento del faraón
            offline.p.steady = false;
            //Cambiamos el puntero al cetro
            offline.input.setDefaultCursor('url(Sprites/cetro.png), pointer');
            offline.p.getSprite().setVelocity(0,0)
        }
    },this);

///////////////////////////////////OBJETOS///////////////////////////////////
    //ARENA
    //Añadimos a un array de arena 30 granos de arena (10 por for)
    this.arena = []
    for(var i = 0; i < 200; i++){
        this.arena[i] = this.matter.add.sprite(spawnPointSand.x + 0.5+i, spawnPointSand.y, 'sand', 0, { restitution: 1, friction: 0.1 });
        this.arena[i].setScale(1.5);
        //
    }    


    
    

    //CAJAS
    //Creamos una cada inservible
    const caja = this.matter.add.image(1500, 150, 'box', 0, {density: 0.0005 });
    const utilBox1 = this.matter.add.image(65*120, 0, 'box', 0, {density: 0.0005 });
    const utilBox2 = this.matter.add.image(68*120, 3*120, 'box', 0, {density: 0.0005 });

}//FIN DEL CREATE

offline.update = function(){
   
    //Variable keys de nuestros objetos de teclas
    const keys = this.keys;
    //No se puede mover ninguna caja
    this.move = false;
///////////////////////////////////ACTUALIZACIÓN DE SPRITES///////////////////////////////////

    if(this.p.dead  || this.m.dead){
		this.scene.start(gameover);
        this.scene.stop(heart);
    }
    
   
    //Si el faraón no está muerto
    if(!this.p.dead){   
        //Actualizamos faraón
        this.p.update(keys);
        //Resetamos el estado de colisiones de los sensores del faraón
        this.p.resetColliding();
        if(this.p.pharaoh.y > 10*120){
            this.p.dead = true;
        }
    }else{
        //Si lo está que la cámara deje de seguirle
        this.cameraPharaoh.stopFollow()
        this.p.destroy()
    }
    //Si la momia no está muerta
    if(!this.m.dead){
        //Actualizamos momia
        this.m.update(keys);
        //Resetamos el estado de colisiones de los sensores de la momia
        this.m.resetColliding();
        //Caida momia
        if(this.m.mummy.y > 10*120){
            this.m.dead = true;
            
        }
    }else{
        //Si lo está que la cámara deje de seguirla
        this.cameraMummy.stopFollow();
        this.m.destroy()
    }
    
    //Si Shek no está muerto
    if(!this.s.dead){
        //Actualizamos Shek
        this.s.update();
        //Reseteamos el estado de colisiones de los sensores del Shek
        this.s.resetColliding();
    }
    //Si Shek no está muerto
    if(!this.s2.dead){
        //Actualizamos Shek
        this.s2.update()
        //Reseteamos el estado de colisiones de los sensores del Shek
        this.s2.resetColliding()
    }
    for(var i=0;i<this.shek.length;i++){
        if(!this.shek[i].dead){
            this.shek[i].update();
            this.shek[i].resetColliding();
        }
    }
    //Actualizamos Anubis
    this.a.update();
    //Actualizamos Bastet
    this.b.update();
    //Actualización de todas las cajas (recorre el array de todas las cajas)
    for(var i = 0; i < this.box.length; i++){
        this.move = this.move || this.box[i].move;
        this.box[i].update();
    }
    //Actualización de todos los botones (recorre el array de todos los botones)
    for(var i = 0; i < this.buttons.length; i++){
        this.buttons[i].update();
        this.buttons[i].resetColliding();
    }

///////////////////////////////////RESOLVER COLISIONES///////////////////////////////////
    //Resuelve colisiones de los botones
    this.updateButtons();
    this.openDoors();
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
            this.m.steady = false;
        }
    }

    if(keys.r.isDown){
        
        keys.r.isDown = false;
        if(!pause.active && !restart.active){
            offline.scene.launch(restart);
        }
        
    }

    if(keys.esc.isDown){
        
        keys.esc.isDown = false;
        if(!restart.active && !pause.active){
            offline.scene.launch(pause);
        }
    }

    
    if(this.mummyVictory && this.pharaohVictory){
        offline.scene.start(vlevel);
        this.scene.stop(heart);
    }

    if(Math.abs(this.p.pharaoh.x - this.m.mummy.x) < 240 && Math.abs(this.p.pharaoh.y - this.m.mummy.y) < 120 && !this.loving){
        this.loving = true;
        this.p.love = true;
        this.m.love = true;

        if(this.p.pharaoh.x < this.m.mummy.x){
            this.p.pharaoh.flipX = false;
            this.m.mummy.flipX = true;
        }else{
            this.p.pharaoh.flipX = true;
            this.m.mummy.flipX = false;
        }

        this.m.mummy.anims.play("jumpRightMCicle", true);
        this.p.pharaoh.anims.play("jumpRightPCicle", true);
        var x = (this.m.mummy.x + this.p.pharaoh.x) / 2;
        var y = this.p.pharaoh.y - 100;

        this.hearts = this.add.sprite(x, y, 'love');
        this.hearts.anims.play("loving", true);

        this.time.addEvent({
            delay: 5000,
            callback: this.stopLove,
            callbackScope: this
        });

    }

}//FINAL UPDATE

offline.stopLove = function(){
    this.p.love = false;
    this.m.love = false;
    this.hearts.anims.stop();
    this.hearts.destroy();
}


