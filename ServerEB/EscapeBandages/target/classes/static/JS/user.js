function User(scene){
	this.userName;
	this.ready;
	var that = this;
	this.scene = scene;
	this.character;
	
	this.setUserName = function(userName){
		that.userName = userName
	}
	this.getUserName = function(){
		return this.userName;
	}
	this.setReady = function(ready){
		this.ready=ready;
	}
	this.getReady = function(){
		return this.ready;
	}
}