function LobbyObj(scene){
	this.id = null;
	this.scene = scene;
	var that = this;
	
	this.setScene = function(scene){
		this.scene = scene;
	}
	
	this.setId = function(id){
		that.id = id
	}
	
	this.getId = function(){
		return that.id;
	}
}