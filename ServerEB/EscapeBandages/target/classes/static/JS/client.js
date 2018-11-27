function Client(scene){
	this.scene = scene
	this.id = 0
	this.myJSON={};
	var that = this;
	this.create = function(){
		
		getIP(function(data){
			myClient.myJSON = data;
			console.log(data.ip)
			
		})
		
		this.scene.time.addEvent({
        delay: 1000,
        callback: that.gIP,
        callbackScope: that
		});
		
		
		
	}
	this.gIP =function () {
console.log(that.myJSON.ip)
	var arr = that.myJSON.ip.split(".")
		var myIP = ""
		for(var i =0;i<arr.length;i++){
			myIP += arr[i]
		}
	
	that.id = parseInt(myIP)
	}
}

function getIP(callback){
	$.ajax({
		url:'https://ipapi.co/json/'
	}).done(function(data){
		console.log(JSON.stringify(data))
		callback(data)
		
	})
}
