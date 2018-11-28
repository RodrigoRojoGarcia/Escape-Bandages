function User(scene){
	this.userName;
	this.ready;
	var that = this;
	this.scene = scene;
	
	this.setUserName = function(userName){
		that.userName = userName
	}
	this.getUserName = function(){
		return this.userName;
	}
}