
	var conn = new WebSocket('ws://'+location.host+'/calcetinete')
	var connPharaoh = new WebSocket('ws://'+location.host+'/calcetinetePharaoh')
	conn.onerror = function(e){
		console.log(e);
	}
	conn.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		console.log(parse.id);
		m.mummy.x = parse.x;
		m.mummy.y = parse.y;
		m.onHit = parse.attacking;
		m.health.life = parse.life;
	}
	conn.onclose = function(mes){
		console.log("Cerrado el calcetín");
	}

	connPharaoh.onerror = function(e){
		console.log(e);
	}
	connPharaoh.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		console.log(parse.id);
		p.pharaoh.x = parse.x;
		p.pharaoh.y = parse.y;
		p.onHit = parse.attacking;
		p.health.life = parse.life;
	}
	connPharaoh.onclose = function(mes){
		console.log("Cerrado el calcetín");
	}
	
	function sendMessage(message){
		var obj = {
				UwU: message
		}
		conn.send(JSON.stringify(obj))
	}

	function sendMummy(posX, posY, attack, lifes){
		var obj = {
			id: 0,
			x: posX,
			y: posY,
			attacking: attack,
			life: lifes
		}
		conn.send(JSON.stringify(obj))
	}
	function sendPharaoh(posX, posY, attack, lifes){
		var obj = {
			id: 1,
			x: posX,
			y: posY,
			attacking: attack,
			life: lifes
		}
		connPharaoh.send(JSON.stringify(obj))
	}
