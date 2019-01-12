//crear escena Menu Principal
var menu = new Phaser.Scene('Menu');

menu.preload = function(){
	////////////////////////////LETRAS////////////////////////////////
	//game over
	this.load.image('gameoveri','Sprites/gameoveri.png');
	//Escape Bandages
	this.load.image('title','Sprites/title.png');
	//////////////////////////////BOTONES//////////////////////////////
	//botones volumenes
	this.load.image('novolumen','Sprites/novolumen.png');
	this.load.image('volumen','Sprites/volumen.png');	
	//boton play
	this.load.image('play','Sprites/play.png');
	//boton offline
	this.load.image('off', 'Sprites/offline.png');
	//boton volver
	this.load.image('back', 'Sprites/back.png');
	//boton sí
 	this.load.image('yes','Sprites/si.png');
 	//botón no
    this.load.image('no','Sprites/no.png');
	//salir
	this.load.image('out','Sprites/salir.png');
	//reiniciar
	this.load.image('reinicio','Sprites/reiniciar.png');
    ///////////////////////////////AUDIO///////////////////////////////////
	//cargar audio
	this.load.audio('music', 'music.mp3');

	

	///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tile", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("background", "background.json");
    //Carga del tilemap
    this.load.tilemapTiledJSON("map", "map.json");
    //Carga del tilemap
    this.load.tilemapTiledJSON("map2", "pyramid2.json");

    /////////////////////////////////FONDOS/////////////////////////
    this.load.image('shade2','Sprites/shade2.png');
	//background
	this.load.image('bgmenu','Sprites/bgmenu.png');
    //////////////////////////////////FUENTES////////////////////////////////
    this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');



    ////////////////////////////////OBJETOS INGAME/////////////////////////////
    ///////////////SPRITESHEETS///////////////
    //MOMIA
    this.load.spritesheet("Mummy","Sprites/mummySprites2.png", {frameWidth: 100, frameHeight: 150});
    //FARAÓN
    this.load.spritesheet("Pharaoh","Sprites/pharaohsprites.png", {frameWidth: 100, frameHeight: 150});
    //ANTORCHAS
    this.load.spritesheet("torch","Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
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

    ///////////////SPRITES///////////////
	//ARENA
    this.load.spritesheet("sand","Sprites/sand.png",{frameWidth: 10, frameHeight: 10});
    //PUERTA
    this.load.image("door","Sprites/door.png");
    //CAJA
    this.load.image("box","Sprites/caja0.1.png");
    //CUERDA
    this.load.image("rope", "Sprites/rope.png");

    
}

menu.create = function(){
	
	
	this.input.setDefaultCursor('url(Sprites/cursor2.png), pointer');
	//cargar letras Escape Bandages
	this.btit = this.add.sprite(960, 200, 'title')
	//inicializar musica
	fx = this.sound.add('music');
	fx.play();
	fx.pause();
	//cargar background
	var bground = this.add.image(0, 0, 'bgmenu').setOrigin(0);
	//cargar Title
	this.btit = this.add.sprite(960, 200, 'title');

////////////////////BOTON PLAY/////////////////////////////////
	//cargar boton Play
	this.bplay = new UIButton(this, 400, 500, 'play', function(){
		//cambio de escena a submenu
		menu.scene.start(submenu);
	}, function(){
		menu.bplay.amplifyScale(0.15,0.15)
	}, function(){
		menu.bplay.reduceScale(0.15,0.15)
	})
	this.bplay.reduceScale(0.1, 0.1);
	this.bplay.show();
	
	
//////////////////////BOTON SILENCIO///////////////////////////////
	
	this.bnvol = new UIButton(this, 1750, 950, 'novolumen', function(){
		fx.resume();
		//hacer botones invisibles
		menu.bnvol.hide();
		//hacer botones visibles
		menu.bvol.show();
	}, function(){
		menu.bnvol.amplifyScale(0.15,0.15)
	}, function(){
		menu.bnvol.reduceScale(0.15,0.15)
	}
	)
	
	this.bnvol.show();

//////////////////////BOTON VOLUMEN///////////////////////////////
	
	this.bvol = new UIButton(this, 1750, 950, 'volumen', function(){
		fx.pause();
		//hacer botones invisibles
		menu.bvol.hide();
		//hacer botones visibles
		menu.bnvol.show();
	}, function(){
		menu.bvol.amplifyScale(0.15,0.15)
	}, function(){
		menu.bvol.reduceScale(0.15,0.15)
	})
	this.bvol.hide()
	
}

menu.update = function(){}