
	var conn = new WebSocket('ws://'+location.host+'/calcetinete')
	conn.onerror = function(e){
		console.log(e);
	}
	conn.onmessage = function(m){
		console.log(m.data)
	}
	function sendMessage(message){
		var obj = {
				UwU: message
		}
		conn.send(JSON.stringify(obj))
	}
