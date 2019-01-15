var disconnect = new Phaser.Scene('disconnect');

disconnect.preload = function(){

}

disconnect.create = function(){
    console.log("Escena cargada");
    this.add.image(1920/2,1080/2,'shade');
    this.add.dynamicBitmapText(600, 350, 'font2', 'DESCONECTADO DEL SERVIDOR', 70);
}

disconnect.update = function(){

}