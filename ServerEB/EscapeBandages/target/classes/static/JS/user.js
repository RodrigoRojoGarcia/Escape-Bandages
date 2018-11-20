function User(){
	this.Id=null;
	this.userName;
	this.character = null;
	this.ready;
	this.interval;
	that = this;
	this.create = function(){
		var user = {}
		createUser(user, function(userWithId){
			that.Id = userWithId.id;
		})
	}
	this.update = function(){
		this.interval = setInterval(that.getUpdater,500);
	}
	
	this.getUpdater = function(){
		if(that.Id != null){
			$.ajax({
				method: "GET",
				url:"http://192.168.1.17:8080/users/"+that.Id
			}).fail(function(){
				console.error("Has pwerdido la conexión con el servidor. UwU")
			})
		}
	}
	this.clearInter = function(){
		clearInterval(this.interval);
	}
	this.setUserName = function(userName){
		that.userName = userName
	}
	this.selectCharacter = function(character){
		if(that.character != null){
			console.log("Este usuario ya ha seleccionado un personaje")
		}else{
			var user = {"id":that.Id,"userName":that.userName, "character":character}
			that.character = character
			updateUser(user)
		}
	}
}