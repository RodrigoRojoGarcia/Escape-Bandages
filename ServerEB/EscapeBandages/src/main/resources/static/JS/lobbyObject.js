function LobbyObj(scene){
	this.id = null;
	this.scene = scene;
	var that = this;
	
	this.setScene = function(scene){
		this.scene = scene;
	}
	
	this.create = function(){
		var lobby = {}
		createLobby(lobby, function(lobbyWithId){
			that.id = lobbyWithId;
		});
	}
	
	this.getId = function(){
		return that.id;
	}
}