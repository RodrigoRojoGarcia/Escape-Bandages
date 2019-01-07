var disconnect = new Phaser.Scene('disconnect');

disconnect.preload = function(){
    this.load.bitmapFont('font1', 'Fonts/font.png', 'Fonts/font.fnt');
    this.load.bitmapFont('font2', 'Fonts/font2.png', 'Fonts/font2.fnt');
    this.load.image('shade','Sprites/shade.png');
}

disconnect.create = function(){
    console.log("Escena cargada");
    this.add.image(1920/2,1080/2,'shade');
    this.add.dynamicBitmapText(600, 350, 'font2', 'DESCONECTADO DEL SERVIDOR', 70);
}

disconnect.update = function(){

}