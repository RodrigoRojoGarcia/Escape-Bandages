var conn;
var connPharaoh;

function letsConnect(){
	conn = new WebSocket('ws://'+location.host+'/calcetineteMummy')
	connPharaoh = new WebSocket('ws://'+location.host+'/calcetinetePharaoh')
	conn.onerror = function(e){
		console.log(e);
	}
	conn.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		m.mummy.x = parse.x;
		m.mummy.y = parse.y;
		m.forceWS = parse.forceX;
		m.jumpWS = parse.jump;
		m.attackWS = parse.attacking;
		m.health.life = parse.life;
		
	}


	/*conn.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}*/

	connPharaoh.onerror = function(e){
		console.log(e);
	}
	connPharaoh.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data);
		p.pharaoh.x = parse.x;
		p.pharaoh.y = parse.y;
		p.forceWS = parse.forceX;
		p.jumpWS = parse.jump;
		p.attackWS = parse.attacking;
		p.health.life = parse.life;
		onlineG.clickWS = parse.click;

	}
	/*connPharaoh.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}*/
}
	
	
	function sendMessage(message){
		var obj = {
				id: 0,
				x: posX,
				y: posY,
				atk: shooting,
				hp: health
		}
		conn.send(JSON.stringify(obj))
	}

	function sendMummy(posX, posY, lifes, force, jumping, space){
		var obj = {
			id: 0,
			x: posX,
			y: posY,
			forceX: force,
			jump: jumping,
			attacking: space,
			life: lifes
		}
		conn.send(JSON.stringify(obj))
	}
	function sendPharaoh(posX, posY, lifes, force, jumping, space, clic){
		var obj = {
			id: 1,
			x: posX,
			y: posY,
			forceX: force,
			jump: jumping,
			attacking: space,
			life: lifes,
			click: clic
		}
		connPharaoh.send(JSON.stringify(obj))
	}
