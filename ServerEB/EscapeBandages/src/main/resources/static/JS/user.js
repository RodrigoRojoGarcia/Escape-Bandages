function User(scene){
	this.Id=null;
	this.userName;
	this.character = null;
	this.ready;
	this.interval;
	var that = this;
	this.scene = scene;
	
	this.setScene = function(scene){
		this.scene = scene;
	}
	
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
		if(!disconnected){
			if(that.Id != null){
			$.ajax({
				method: "GET",
				url:"http://"+location.host+"/users/"+that.Id
			}).fail(function(){
				console.error("Has perdido la conexión con el servidor. UwU")
				disconnected=true;
				that.scene.add.text(600,350,'Disconnected from server',{font: '70px Power Clear', fill:'#ff0000'})
			})
			}
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
			updateUserCharacter(user)
		}
	}
}