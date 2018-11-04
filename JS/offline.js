var offline = new Phaser.Scene('Offline');

offline.preload = function(){
///////////////////////////////////MAPA///////////////////////////////////
    //Carga del tileset
    this.load.image("tile", "../Escape-Bandages/Sprites/tileset.png");
    //Carga del tilemap
    this.load.tilemapTiledJSON("map", "map.json");

///////////////////////////////////SPRITESHEETS///////////////////////////////////
    //MOMIA
    this.load.spritesheet("Mummy","../Escape-Bandages/Sprites/mummySprites2.png", {frameWidth: 100, frameHeight: 150});
    //FARAÓN
    this.load.spritesheet("Pharaoh","../Escape-Bandages/Sprites/pharaohsprites.png", {frameWidth: 100, frameHeight: 150});
    //ANTORCHAS
    this.load.spritesheet("torch","../Escape-Bandages/Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
    //ARENA
    this.load.spritesheet("sand","../Escape-Bandages/Sprites/sand.png",{frameWidth: 10, frameHeight: 10});
    //SHEK
    this.load.spritesheet("snake","../Escape-Bandages/Sprites/snake_spritesheet2.png",{frameWidth: 100, frameHeight: 140});
    //BOTÓN
    this.load.spritesheet("button","../Escape-Bandages/Sprites/button.png",{frameWidth: 120, frameHeight: 30});
    //ANUBIS
    this.load.spritesheet("Anubis","../Escape-Bandages/Sprites/anubisSpriteSheet.png",{frameWidth: 100, frameHeight: 150});
    //BASTET
    this.load.spritesheet("Bastet","../Escape-Bandages/Sprites/bastetSpriteSheet.png",{frameWidth: 100, frameHeight: 150});
    //CAJA CON EFECTO
    this.load.spritesheet("PurpleBox1", "../Escape-Bandages/Sprites/purpleBox2SpriteSheet.png",{frameWidth: 175, frameHeight: 200});
    
///////////////////////////////////IMAGENES///////////////////////////////////
    //PUERTA
    this.load.image("door","../Escape-Bandages/Sprites/door.png");
    //CAJA
    this.load.image("box","../Escape-Bandages/Sprites/caja0.1.png");
    //CUERDA
    this.load.image("rope", "../Escape-Bandages/Sprites/rope.png");
}//FIN DEL PRELOAD

offline.create = function(){
///////////////////////////////////CONFIG///////////////////////////////////
    const {Engine, Bodies, World} = Phaser.Physics.Matter.Matter;
    const engine = Engine.create();
    scene = this;
    inputEnabled = true;

///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //Creación del TILEMAP
	const map = this.make.tilemap({key:"map", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = map.addTilesetImage("tileset","tile");

    //Extraemos las capas del TILEMAP
    const bg= map.createDynamicLayer("Background", tiles, 0,0);
	const layer = map.createDynamicLayer("Foreground",tiles,0,0);

    //Hacemos la capa LAYER (FOREGROUND) colisionable
    layer.setCollisionByProperty({ collider: true });
    //Se lo decimos a Matter
    this.matter.world.convertTilemapLayer(layer);
    //Colisión de los objetos con los bordes del mundo
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //Añadimos un atributo graphics, para poder dibujar las barras de vida
    graphics = this.add.graphics({ x: map.widthInPixels, y: map.heightInPixels });

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
    //Caja
    const spawnBox1 = map.findObject("Objects", obj => obj.name === "PurpleBox");

    //OBJETOS
    //Zonas de Evento
    const Anubis = map.findObject("Objects", obj => obj.name === "Anubis");
    const Bastet = map.findObject("Objects", obj => obj.name === "Bastet");
    //Cajas de texto de tutorial
    const textAnubis = map.findObject("Objects", obj => obj.name === "TextAnubis");
    const textBastet = map.findObject("Objects", obj => obj.name === "TextBastet");
    //Botones
    buttons = map.createFromObjects('Buttons', 10, { key: 'button' });

///////////////////////////////////PLAYERS///////////////////////////////////
    //FARAÓN
    //Creamos un objeto Faraón, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    p = new Pharaoh(this, spawnPointPharaoh.x, spawnPointPharaoh.y);
    //Llamamos a la función crear, que crea las animaciones del mismo
    p.create();
    //Le atribuímos una profundidad de 1, por lo que pasará por delante de objetos a los que no le introduzcamos ningún valor de depth modificado
    //(El valor de depth por defecto es 0)
    p.getSprite().depth = 1
    //MOMIA
    //Creamos un objeto Momia, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    m = new Mummy(this,spawnPointMummy.x, spawnPointMummy.y);
    //Llamamos a la función crear, que crea las animaciones del mismo
    m.create();
    //Le atribuímos una profundidad de 1, por lo que pasará por delante de objetos a los que no le introduzcamos ningún valor de depth modificado
    m.getSprite().depth = 1

///////////////////////////////////ENEMIES///////////////////////////////////
    //SHEK
    //Creamos un objeto Enemigo, el cual contiene un sprite. Le colocamos en las coordenadas del objeto spawnpoint del JSON
    s = new Enemy(this,spawnPointShek.x, spawnPointShek.y);
    //Llamamos a la función crear, que crea las animaciones del mismo
    s.create();

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
    //Creamos dos cámaras en las dos mitades de la pantalla con 40 píxeles de por medio
    const cameraPharaoh = this.cameras.main.setSize(940,1080).setName('camPharaoh');
    const cameraMummy = this.cameras.add(980,0,940,1080).setName('camMummy');
    //Hacemos que cada una siga a un personaje
    cameraPharaoh.startFollow(p.getSprite(), true, 0.8, 0.8, -200);
    cameraMummy.startFollow(m.getSprite(), true, 0.8, 0.8, -200);
    //Ponemos a las dos los límites del mapa
    cameraPharaoh.setBounds(0,0,map.widthInPixels,map.heightInPixels);
    cameraMummy.setBounds(0,0,map.widthInPixels,map.heightInPixels);

///////////////////////////////////ANTORCHAS///////////////////////////////////
    //Creamos un array de antorchas y les atribuimos un sprite de Phaser, que no de Matter
    //Si fuese de Matter sería colisionable y no queremos que sea colisionable
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
    //Función de actualización de botones
    updateButtons = function(){
        //Si se activa el sensor desaparecen las puertas y se transforman en sensores, por lo que el personaje las puede atravesar
        if(buttons[0].active){
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
    }
    
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
    "delante de tí para lograrlo solo has de apuntar\ncon este cetro"];
    //Hacemos que el texto aparezca en el mismo lugar que el objeto de texto de Tiled
    this.sayAnubis1 = this.add.text(textAnubis.x, textAnubis.y, wordsAnubis1).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');
    this.sayAnubis2 = this.add.text(textAnubis.x, textAnubis.y, wordsAnubis2).setFontSize(24).setFontStyle('bold').setFontFamily('Power Clear').setBackgroundColor('#000000');
    //Profundidad 100 para que aparezca delante de todo
    this.sayAnubis1.depth = 100;
    //Invisible mientras no esté en el tutorial
    this.sayAnubis1.setVisible(false);
    //Profundidad 100 para que aparezca delante de todo
    this.sayAnubis2.depth = 100;
    //Invisible mientras no esté en el tutorial
    this.sayAnubis2.setVisible(false);

    //BASTET
    //Textos del tutorial de Bastet
    var wordsBastet1 = ["Hola, soy Bastet, Diosa de la armonía del hogar.",
    "Te he revivido porque en vida te enamoraste de una\npersona de la que no deberías, por lo que os doy la\n oportunidad de vivir juntos.",
    "Para ello necesitaréis salir de la pirámide JUNTOS"];
    var wordsBastet2 = ["Te otorgo el poder de las vendas malditas\npodrás estirar tus vendas en el ESPACIO y de",
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
                delay: 200,
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
                delay: 200,
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

///////////////////////////////////PURPLE BOXES///////////////////////////////////
    //Creamos una objeto PurpleBox con las coordenadas del objeto del tilemap
    const box1 = new PurpleBox(this, spawnBox1.x, spawnBox1.y, 705, 860, 'PurpleBox1', 0, 0.01, 0.1, 100);
    //Llamamos a create que crea las animaciones del objeto
    box1.create();
    //Lo introducimos en el array de cajas
    box = [box1];

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
    const {LEFT, RIGHT, UP, W, A, D, SPACE} = Phaser.Input.Keyboard.KeyCodes;
    //Les atribuimos a variables nuestras los KeyCodes de las teclas de dirección
    this.keys = this.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        w: W,
        a: A,
        d: D,
        space: SPACE
    });
    //Evento cuando se hace click
    this.input.on('pointerdown',function(pointer){
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
            //Permitimos movimiento del faraón
            p.steady = false;
        }
    },this);

///////////////////////////////////OBJETOS///////////////////////////////////
    //ARENA
    //Añadimos a un array de arena 30 granos de arena (10 por for)
    arena = []
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
    //Creamos una cada
    const caja = this.matter.add.image(1500, 150, 'box', { restitution: 0, frictionAir: 0, friction: 0.2, density: 0.0005 });

}//FIN DEL CREATE

offline.update = function(){

    //Variable keys de nuestros objetos de teclas
    const keys = this.keys;
    //No se puede mover ninguna caja
    move = false;
///////////////////////////////////ACTUALIZACIÓN DE SPRITES///////////////////////////////////
    //Actualizamos faraón
    p.update(keys);
    //Actualizamos momia
    m.update(keys);
    //Resetamos el estado de colisiones de los sensores del faraón
    p.resetColliding();
    //Resetamos el estado de colisiones de los sensores de la momia
    m.resetColliding();
    //Si Shek no está muerto
    if(!s.dead){
        //Actualizamos Shek
        s.update();
        //Reseteamos el estado de colisiones de los sensores del Shek
        s.resetColliding();
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

}//FINAL UPDATE