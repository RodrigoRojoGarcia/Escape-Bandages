
	var conn = new WebSocket('ws://'+location.host+'/calcetinete')
	conn.onerror = function(e){
		console.log(e);
	}
	conn.onmessage = function(m){
		console.log(m.data)
	}
	function sendMummy(posX, posY, shooting, health){
		var obj = {
				id: 0,
				x: posX,
				y: posY,
				atk: shooting,
				hp: health
		}
		conn.send(JSON.stringify(obj))
	}
