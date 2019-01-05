var conn;
var connPharaoh;

function letsConnect(){
	conn = new WebSocket('ws://'+location.host+'/calcetineteMummy')
	connPharaoh = new WebSocket('ws://'+location.host+'/calcetinetePharaoh')
	connBox = new WebSocket('ws://'+location.host+'/calcetineteBox')
	connRope = new WebSocket('ws://'+location.host+'/calcetineteRope')
	connShek = new WebSocket('ws://'+location.host+'/calcetineteShek')

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


	conn.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}

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
	connPharaoh.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}

	connBox.onerror = function(e){
		console.log(e);
	}
	connBox.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		box[0].purpleBox.y = parse.y0;
		box[1].purpleBox.y = parse.y1;
	}
	connBox.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
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
	connRope.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}
	connShek.onerror = function(e){
		console.log(e);
	}
	connShek.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		enemies[0].healthBar.health = parse.healthEnemy0;
		enemies[1].healthBar.health = parse.healthEnemy1;
		enemies[2].healthBar.health = parse.healthEnemy2;
		enemies[3].healthBar.health = parse.healthEnemy3;
	}
	connShek.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
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
	
	function sendShek(health0, health1, health2, health3){
		var obj = {
			id: 4,
			healthEnemy0: health0,
			healthEnemy1: health1,
			healthEnemy2: health2,
			healthEnemy3: health3
		}
		connShek.send(JSON.stringify(obj))
	}
