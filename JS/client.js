function Client(scene){
	this.scene = scene
	this.id = 0
	this.myJSON={};
	var that = this;
	var newScene = scene;
	var timeDisconnected = 0;
	this.create = function(){
		
		getIP(function(data){
			myClient.myJSON = data;
			that.gIP();
		})
		
	}
	this.gIP =function () {
		var arr = that.myJSON.ip.split(".")
		var myIP = ""
		for(var i =0;i<arr.length;i++){
			myIP += arr[i]
		}
		
		
		getUserIP(function(ip){
			var arr2 = ip.split(".")
			
			for(var i =arr2.length-2;i<arr2.length;i++){
				myIP += arr2[i]
			}
		
		
		
			postClient(parseInt(myIP), function(data){
				
				that.id = data.id;
				
				console.log("Got IP! :" + that.id);
			})
		    
		});
		
		
		
		
		
		that.scene.scene.start(menu)
		myClient.update()
	}
	
	this.update = function(){
		
		this.interval = setInterval(that.getUpdater,500);
	}

	this.setScene = function(sceneNew){
		newScene = sceneNew;
	}
	
	this.getUpdater = function(){
		if(!disconnected){
			if(that.id != null){
			$.ajax({
				method: "GET",
				url:"http://"+location.host+"/clients/"+that.id
			}).done(function(){
				timeDisconnected = 0;
			}).fail(function(){
				if(timeDisconnected >= 16){
					if(!disconnected){
						newScene.time.addEvent({
							delay: 500,
							callback: that.disconnectScenes,
							callbackScope: that
						});
						
						console.error("Has perdido la conexión con el servidor. UwU")
					
						clearInterval(that.interval);
						
					}
					disconnected = true;
				}else{
					timeDisconnected++;
				}		
			})
			}
		}
		
	}
	this.disconnectScenes = function(){
		onlineG.scene.stop(chatOnline)
		newScene.scene.start(disconnect)
	}
}

function getIP(callback){
	$.ajax({
		url:'https://ipapi.co/json/'
	}).done(function(data){
		callback(data)
		
	})
}



