//crear escena
var carga = new Phaser.Scene('Carga');

carga.preload = function(){
    this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');
	///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tile", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("background", "background.json");

    
    this.load.image('frame1', 'Sprites/frame1.png');
    this.load.image('frame2', 'Sprites/frame2.png');
    this.load.image('frame3', 'Sprites/frame3.png');
    this.load.image('frame4', 'Sprites/frame4.png');

    this.load.image('shade','Sprites/shade.png');
    this.load.image('shade2','Sprites/shade2.png');
    
	this.load.image('bgmenu','Sprites/bgmenu.png');
    
///////////////////////////////////MAPA///////////////////////////////////

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
    
    this.load.image('login', 'Sprites/login.png');
    this.load.image('register', 'Sprites/register.png');
    this.load.image('victoria','Sprites/victoria.png');
	this.load.image('back','Sprites/back.png');
	this.load.image('reinicio','Sprites/reiniciar.png');
	this.load.image('off', 'Sprites/offline.png');
	this.load.image('on', 'Sprites/online.png');
    this.load.image('yes','Sprites/si.png');
    this.load.image('no','Sprites/no.png');
  //Input
    this.load.spritesheet("input", "Sprites/manualInput.png", {frameWidth: 420, frameHeight: 50});
  //boton play
	this.load.image('play','Sprites/play.png');
	//botones volumenes
	this.load.image('novolumen','Sprites/novolumen.png');
	this.load.image('volumen','Sprites/volumen.png');
	//cargar audio
	this.load.audio('music', 'music.mp3');
	//titulo
	this.load.image('lobbytxt', 'Sprites/lobby.png');
	this.load.image('privado', 'Sprites/privado.png');
	this.load.image('aleatorio', 'Sprites/aleatorio.png');
	this.load.image('buscar', 'Sprites/buscar.png');
	this.load.image('desconectar', 'Sprites/desconectar.png');
	this.load.image("heart","Sprites/heart.png");
	this.load.image("hudMummy", "Sprites/hudMummy.png");
	this.load.image("hudPharaoh", "Sprites/hudPharaoh.png");
	this.load.image("hudOffline", "Sprites/hudOffline.png");
	//salir
	this.load.image('out','Sprites/salir.png');
	//game over
	this.load.image('gameoveri','Sprites/gameoveri.png');
	this.load.image('chatBack','Sprites/chatBack.png');
	//boton eleccion momia
    this.load.spritesheet("boton_mummy","Sprites/boton_mummy_spritesheet.png",{frameWidth: 380, frameHeight: 380});
    this.load.image('unableMummy', 'Sprites/boton_mummy2.png');
    //boton eleccion faraon
    this.load.spritesheet("boton_pharaoh","Sprites/boton_pharaoh_spritesheet.png",{frameWidth: 380, frameHeight: 380});
    this.load.image('unablePharaoh', 'Sprites/boton_pharaoh2.png');
	//boton momia seleccionada
	this.load.spritesheet("boton_mummySelected","Sprites/boton_mummySelected_spritesheet.png",{frameWidth: 380, frameHeight: 380});

	//boton faraon seleccionado
	this.load.spritesheet("boton_pharaohSelected","Sprites/boton_pharaohSelected_spritesheet.png",{frameWidth: 380, frameHeight: 380});
	this.load.image('select','Sprites/letras_seleccionar.png');
	
    
	//letras ready
    this.load.image('ready', 'Sprites/listo.png');
    //checks
    this.load.image('nocheck', 'Sprites/nocheck.png');
    this.load.image('check', 'Sprites/check.png');
	//ANTORCHAS
    this.load.image('title', 'Sprites/title.png')
}



carga.create = function(){
	
	
	const anims = carga.anims;
	//Animación a la derecha
	anims.create({
		key: 'rightM',
		frames: anims.generateFrameNumbers('Mummy', {start: 4, end: 7}),
		frameRate: 10,
		repeat: -1
	});
	//Quieto mirando a la derecha
	anims.create({
		key: 'stayRightM',
		frames: anims.generateFrameNumbers('Mummy', {start: 0, end: 3}),
		frameRate: 5,
		repeat: -1
	});
	//Saltando a la derecha
	anims.create({
		key: 'jumpRightM',
		frames: anims.generateFrameNumbers('Mummy', {start: 8, end: 10}),
		frameRate: 20,
		repeat: 0
	})
	anims.create({
        key: 'torchAnim',
        frames: this.anims.generateFrameNumbers('torch',{start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
	
	//Animación a la derecha
	anims.create({
		key: 'rightP',
		frames: anims.generateFrameNumbers('Pharaoh', {start: 0, end: 3}),
		frameRate: 5,
		repeat: -1
	});
	//Quieto mirando a la derecha
	anims.create({
		key: 'stayRightP',
		frames: anims.generateFrameNumbers('Pharaoh', {start: 0, end: 3}),
		frameRate: 5,
		repeat: -1
	});
	//Saltando a la derecha
	anims.create({
		key: 'jumpRightP',
		frames: anims.generateFrameNumbers('Pharaoh', {start: 8, end: 10}),
		frameRate: 10,
		repeat: 0
	});
	//Fuego llano
	anims.create({
		key: 'planeFire',
		frames: anims.generateFrameNumbers('Fire', {start: 0, end: 1}),
		frameRate: 10,
		repeat: -1
	});
	//Llamarada
	anims.create({
		key: 'endFire',
		frames: anims.generateFrameNumbers('Fire', {start: 2, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	anims.create({
        key: 'pvAnim',
        frames: this.anims.generateFrameNumbers('Pharaoh',{start: 8, end: 10}),
        frameRate: 3,
        repeat: -1
    });
	
	
	anims.create({
        key: 'mvAnim',
        frames: this.anims.generateFrameNumbers('Mummy',{start: 13, end: 15}),
        frameRate: 5,
        repeat: -1
    });
	
	
	//Animation to the right
	anims.create({
		key: 'box1',
		frames: anims.generateFrameNumbers('PurpleBox1', {start: 1, end: 2}),
		frameRate: 5,
		repeat: -1
	});
	
	
	anims.create({
		key: 'rightS',
		frames: anims.generateFrameNumbers('snake', {start: 0, end: 7}),
		frameRate: 10,
		repeat: -1
	});
	//Quieto mirando a la derecha
	anims.create({
		key: 'stayRightS',
		frames: anims.generateFrameNumbers('snake', {start: 0, end: 7}),
		frameRate: 5,
		repeat: -1
	});
	
	
	anims.create({
    	key: 'manualInput',
    	frames: this.anims.generateFrameNumbers('input',{start: 0, end: 1}),
    	frameRate: 5,
    	repeat: -1
    })
	
	//Quieto mirando a la derecha
		anims.create({
			key: 'god1',
			frames: anims.generateFrameNumbers('Anubis', {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
	//Quieto mirando a la derecha
	anims.create({
		key: 'god2',
		frames: anims.generateFrameNumbers('Bastet', {start: 0, end: 3}),
		frameRate: 5,
		repeat: -1
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	myClient = new Client(this)
	myClient.create();
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"background", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tile");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);

    this.cosa = this.add.image(1920/2, 1080/2, 'shade');
    this.cosa.setAlpha(0);
    this.add.dynamicBitmapText(800, 350, 'font1', 'Cargando', 82);
    this.cosita = this.add.dynamicBitmapText(600, 350, 'font2', 'UWU', 10);
    this.cosita.setAlpha(0);

	this.anims.create({
        key: 'cargaAnim',
        frames: [
            { key: 'frame1' },
            { key: 'frame2' },
            { key: 'frame3' },
            { key: 'frame4', duration: 50 }
        ],
        frameRate: 1,
        repeat: -1
    });

    this.add.sprite(950, 550, 'frame1').play('cargaAnim');
}
carga.update = function(){}