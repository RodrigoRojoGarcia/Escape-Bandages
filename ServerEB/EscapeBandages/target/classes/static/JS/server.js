var server = new Phaser.Scene('Server');

server.preload = function(){
	
}

server.create = function(){
	myUser.setScene(this)
	if(!SERVER){
		server.scene.switch(menu);
	}
}

server.update = function(){
	
}