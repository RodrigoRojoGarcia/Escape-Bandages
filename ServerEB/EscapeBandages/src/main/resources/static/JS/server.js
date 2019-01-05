var server = new Phaser.Scene('Server');

server.preload = function(){
	
}

server.create = function(){
	
	if(!SERVER){
		server.scene.start(menu);
	}
}

server.update = function(){
	
}