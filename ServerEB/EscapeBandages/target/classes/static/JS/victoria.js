var victoria = new Phaser.Scene('Victoria');

victoria.preload = function(){
	//carga sprites mummy
	this.load.image('bgV','Sprites/bgmenu.png');
    this.load.spritesheet('Mummyv','Sprites/mummySprites2.png', {frameWidth: 100, frameHeight: 150});
    this.load.spritesheet("Pharaohv","Sprites/pharaohsprites.png", {frameWidth: 100, frameHeight: 150});
    this.load.image('victoria','Sprites/victoria.png');
	this.load.image('backI','Sprites/back.png');
	this.load.image('reinicio','Sprites/reiniciar.png');
}

victoria.create = function(){
	
	//background
	var bgV = this.add.image(0, 0, 'bgV').setOrigin(0);
	//letras victoria
	var vic = this.add.sprite(960, 540, 'victoria');

////////////////////Victoria Mummy//////////////////////////////////
	var mumV = this.add.sprite(1300, 400,'Mummyv');
	//Animación salto victoria
    this.anims.create({
        key: 'mvAnim',
        frames: this.anims.generateFrameNumbers('Mummyv',{start: 13, end: 15}),
        frameRate: 5,
        repeat: -1
    });
    mumV.anims.play('mvAnim');

////////////////////Victoria Pharaoh//////////////////////////////////
	var pV = this.add.sprite(640, 400,'Pharaohv');
	//Animación salto victoria
    this.anims.create({
        key: 'pvAnim',
        frames: this.anims.generateFrameNumbers('Pharaohv',{start: 8, end: 10}),
        frameRate: 3,
        repeat: -1
    });
    pV.anims.play('pvAnim');

//////////////////////BOTON REINICIAR///////////////////////////
	//cargar boton Reiniciar
	this.brei = this.add.sprite(960, 800, 'reinicio').setInteractive({ cursor: 'url(Sprites/cursor3.png), pointer' });
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
		if(gameState == 1){
			gameover.scene.start(offline);
			gameover.scene.launch(heart, offline);
		}else if(gameState == 2){
			
			onRestart = true;
		}
	})
/////////////////BOTON VOLVER//////////////////
	//cargar boton Volver
	this.binit = this.add.sprite(960, 950, 'backI').setInteractive();
	this.binit.scaleX -= 0.4;
	this.binit.scaleY -= 0.4;
	//hacer boton invisible
	this.binit.setAlpha(1);
	//accion al poner el cursor sobre el boton Back
	this.binit.on('pointerover', function(){
		victoria.binit.scaleX += 0.15;
		victoria.binit.scaleY += 0.15;
	})
	//accion al quitar el cursor del boton Back
	this.binit.on('pointerout', function(){
		victoria.binit.scaleX -= 0.15;
		victoria.binit.scaleY -= 0.15;
	})
	//accion al hacer click sobre el boton Back
	this.binit.on('pointerdown', function(){
		//cambio de escena a menu
		gameState = 0;
		onOut = true;
	})
}

victoria.update = function(){
	if(onRestart){
		if(myUser.character == 1){
			sendRestart(onRestart, onOut);
		}
		
		victoria.scene.start(onlineG);
		victoria.scene.launch(heart, onlineG);
		
	}
	if(onOut){
		if(myUser.character == 1){
			sendRestart(onRestart, onOut);
		}
		returnToLobby(myLobby.getId(), function(id){
			victoria.scene.start(characterSelection);
			victoria.scene.stop(chatOnline);
		})
		
		
	}
}