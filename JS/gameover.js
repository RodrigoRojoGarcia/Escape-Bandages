//creacion escena Gameover
var gameover = new Phaser.Scene('Gameover');

gameover.preload = function(){
	//carga imagenes
	//salir
	this.load.image('out','../Escape-Bandages/Sprites/salir.png');
	//reiniciar
	this.load.image('reinicio','../Escape-Bandages/Sprites/reiniciar.png');
	//game over
	this.load.image('gameoveri','../Escape-Bandages/Sprites/gameoveri.png');
	///////////////////////////////////MAPA///////////////////////////////////
    //tileset
    this.load.image("tileg", "../Escape-Bandages/Sprites/tileset.png");
    //tilemap
    this.load.tilemapTiledJSON("backgroundg", "background.json");
    //ANTORCHAS
    this.load.spritesheet("torchg","../Escape-Bandages/Sprites/torchspriteSheet.png",{frameWidth: 30, frameHeight: 95});
}

gameover.create = function(){
///////////////////////////////////CREACIÓN MAPA///////////////////////////////////
	//Puntero Default
	this.input.setDefaultCursor('url(../Escape-Bandages/Sprites/cursor2.png), pointer');
    //TILEMAP
	const backg = this.make.tilemap({key:"backgroundg", tileWidth: 120, tileHeight: 120});
    //Le añadimos el TILESET al TILEMAP
	const tiles = backg.addTilesetImage("tileset","tileg");
    //Extraemos las capas del TILEMAP
    const bg= backg.createDynamicLayer("Background", tiles, 0,0);
	const layer = backg.createDynamicLayer("Foreground",tiles,0,0);

	//carga letras Gameover
	this.go = this.add.sprite(960, 400, 'gameoveri');
	this.go.scaleX += 0.3;
	this.go.scaleY += 0.3;

//////////////////////BOTON REINICIAR///////////////////////////
	//cargar boton Reiniciar
	this.brei = this.add.sprite(960, 800, 'reinicio').setInteractive({ cursor: 'url(../Escape-Bandages/Sprites/cursor3.png), pointer' });
	this.brei.scaleX -= 0.2;
	this.brei.scaleY -= 0.2;
	//hacer boton visible
	this.brei.setAlpha(1);
	//accion al poner el cursor sobre el boton Reiniciar
	this.brei.on('pointerover', function(){
		gameover.brei.scaleX += 0.15;
		gameover.brei.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Reiniciar
	this.brei.on('pointerout', function(){
		gameover.brei.scaleX -= 0.15;
		gameover.brei.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Reiniciar
	this.brei.on('pointerdown', function(){
		
		gameover.scene.switch(offline);
	})


//////////////////////BOTON SALIR///////////////////////////////
	//cargar boton Salir
	this.bout = this.add.sprite(960, 950, 'out').setInteractive({ cursor: 'url(../Escape-Bandages/Sprites/cursor3.png), pointer' });
	this.bout.scaleX -= 0.3;
	this.bout.scaleY -= 0.3;
	//hacer boton visible
	this.bout.setAlpha(1);
	//accion al poner el cursor sobre el boton Salir
	this.bout.on('pointerover', function(){
		gameover.bout.scaleX += 0.15;
		gameover.bout.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Salir
	this.bout.on('pointerout', function(){
		gameover.bout.scaleX -= 0.15;
		gameover.bout.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Salir
	this.bout.on('pointerdown', function(){
		gameover.scene.switch(menu);
	})
}

gameover.update = function(){}