function Client(scene){
	this.scene = scene
	this.id = 0
	this.myJSON={};
	var that = this;
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
			
			for(var i =arr2.length-3;i<arr2.length;i++){
				myIP += arr2[i]
			}
		that.id = parseInt(myIP)
		
		console.log("Got IP! :" + that.id);
		postClient(that.id)
		    
		});
		
		
		
		
		
		that.scene.scene.switch(menu)
		myClient.update()
	}
	
	this.update = function(){
		this.interval = setInterval(that.getUpdater,500);
	}
	
	this.getUpdater = function(){
		if(!disconnected){
			if(that.id != null){
			$.ajax({
				method: "GET",
				url:"http://"+location.host+"/clients/"+that.id
			}).fail(function(){
				console.error("Has perdido la conexión con el servidor. UwU")
				disconnected=true;
				that.scene.add.text(600,350,'Disconnected from server',{font: '70px Power Clear', fill:'#ff0000'})
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



