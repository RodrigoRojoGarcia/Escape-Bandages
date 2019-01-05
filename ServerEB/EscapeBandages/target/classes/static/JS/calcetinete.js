var conn;
var connPharaoh;

function letsConnect(){
	conn = new WebSocket('ws://'+location.host+'/calcetineteMummy')
	connPharaoh = new WebSocket('ws://'+location.host+'/calcetinetePharaoh')
	connBox = new WebSocket('ws://'+location.host+'/calcetineteBox')
	connRope = new WebSocket('ws://'+location.host+'/calcetineteRope')

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

	connBox.onerror = function(e){
		console.log(e);
	}
	connBox.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		box[0].purpleBox.y = parse.y0;
		box[1].purpleBox.y = parse.y1;
	}
	
	connRope.onerror = function(e){
		console.log(e);
	}
	connRope.onmessage = function(mesg){
		if(myUser.character == 2){
			var parse = JSON.parse(mesg.data)
			for(var i = 0; i < m.shackle.length; i++){
				m.shackle[i].x = parse.posx[i];
				m.shackle[i].y = parse.posy[i];
			}
		}
	}

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

	function sendBox(yBox0, yBox1){
		var obj = {
			id: 2,
			y0: yBox0,
			y1: yBox1
		}
		connBox.send(JSON.stringify(obj))
	}

	function sendRope(arrayX, arrayY){
		var obj = {
			id: 3,
			posx: arrayX,
			posy: arrayY
		}
		connRope.send(JSON.stringify(obj))
	}
