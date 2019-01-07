function Client(scene){
	this.scene = scene
	this.id = 0
	this.myJSON={};
	var that = this;
	var newScene = scene;
	this.create = function(){
		
		getIP(function(data){
			myClient.myJSON = data;
			
		})
		
		this.scene.time.addEvent({
        delay: 1000,
        callback: that.gIP,
        callbackScope: that
		});
		
		
		
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
			}).fail(function(){
				if(!disconnected){
					newScene.time.addEvent({
						delay: 500,
						callback: ()=>(newScene.scene.start(disconnect)),
						callbackScope: that
					});
					
					console.error("Has perdido la conexión con el servidor. UwU")
				
					clearInterval(that.interval);
				}
				disconnected=true;
				
				
				
			})
			}
		}
		
	}
}

function getIP(callback){
	$.ajax({
		url:'https://ipapi.co/json/'
	}).done(function(data){
		callback(data)
		
	})
}



