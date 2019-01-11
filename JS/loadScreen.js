//crear escena
var carga = new Phaser.Scene('Carga');

carga.preload = function(){
    this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');
	///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tilec", "Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundc", "background.json");

    this.load.path = 'Sprites/';
    this.load.image('frame1', 'frame1.png');
    this.load.image('frame2', 'frame2.png');
    this.load.image('frame3', 'frame3.png');
    this.load.image('frame4', 'frame4.png');

    this.load.image('shade','shade.png');
}


carga.create = function(){
	myClient = new Client(this)
	myClient.create();
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
    //TILEMAP
	const backg = this.make.tilemap({key:"backgroundc", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tilec");
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