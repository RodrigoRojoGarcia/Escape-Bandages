var server = new Phaser.Scene('Server');

server.preload = function(){
	
}

server.create = function(){
	
	if(!SERVER){
		server.scene.switch(menu);
	}
}

server.update = function(){
	
}