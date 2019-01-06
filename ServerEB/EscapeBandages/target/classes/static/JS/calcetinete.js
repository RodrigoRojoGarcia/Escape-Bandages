var conn;
var connPharaoh;

function letsConnect(){
	conn = new WebSocket('ws://'+location.host+'/calcetineteMummy')
	connPharaoh = new WebSocket('ws://'+location.host+'/calcetinetePharaoh')
	
	connBoxesMummy = new WebSocket('ws://'+location.host+'/calcetineteBoxesMummy')
	connBoxesPharaoh = new WebSocket('ws://'+location.host+'/calcetineteBoxesPharaoh')
	
	
	connRestart = new WebSocket('ws://'+location.host+'/calcetineteRestart')

	conn.onerror = function(e){
		console.log(e);
	}
	conn.onmessage = function(mesg){
		if(!m.dead){
			var parse = JSON.parse(mesg.data)
			
			
			if(myUser.character == 2){
				m.mummy.x = parse.x;
				m.mummy.y = parse.y;
				m.forceWS = parse.forceX;
				m.jumpWS = parse.jump;
				m.attackWS = parse.attacking;
				m.health.life = parse.life;
				for(var i = 0; i < 4; i++){
					enemies[i].healthBar.health = parse.arrHealth[i];
				}
				for(var i = 0; i < m.shackle.length; i++){
					m.shackle[i].x = parse.posx[i];
					m.shackle[i].y = parse.posy[i];
				}
				onlineG.mummyVictory = parse.vic;
			}
			
		
		}
		
	}


	conn.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}

	connPharaoh.onerror = function(e){
		console.log(e);
	}
	connPharaoh.onmessage = function(mesg){
		if(!p.dead){
			var parse = JSON.parse(mesg.data);
			if(myUser.character == 1){
				p.pharaoh.x = parse.x;
				p.pharaoh.y = parse.y;
				p.forceWS = parse.forceX;
				p.jumpWS = parse.jump;
				p.attackWS = parse.attacking;
				p.health.life = parse.life;
				onlineG.clickWS = parse.click;
				box[0].purpleBox.y = parse.bY1;
				box[1].purpleBox.y = parse.bY2;
				onlineG.pharaohVictory = parse.vic;
			}
			

		}
		
	}
	connPharaoh.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}

	

	connBoxesMummy.onerror = function(e){
		console.log(e);
	}
	connBoxesMummy.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		if(myUser.character == 2){
			utilBoxes[parse.id].box.x = parse.X;
			utilBoxes[parse.id].box.y = parse.Y;
			utilBoxes[parse.id].box.angle = parse.Ang;
		}
		
		console.log("cajasMomia");
		
	}
	connBoxesMummy.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}

	connBoxesPharaoh.onerror = function(e){
		console.log(e);
	}
	connBoxesPharaoh.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		if(myUser.character == 1){
			utilBoxes[parse.id].box.x = parse.X;
			utilBoxes[parse.id].box.y = parse.Y;
			utilBoxes[parse.id].box.angle = parse.Ang;
		}
		
		console.log("cajasFaraon");
	}
	connBoxesPharaoh.onclose = function(mes){
		console.log("Cerrado el calcetín");
		letsConnect()
	}

	
	
	
	
	connRestart.onerror = function(e){
		console.log(e);
	}
	connRestart.onmessage = function(mesg){
		var parse = JSON.parse(mesg.data)
		onOut = parse.clickOut;
		onRestart = parse.click
	}
	connRestart.onclose = function(mes){
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

	function sendMummy(posX, posY, lifes, force, jumping, space, ropeX, ropeY, arrayHealth, victory){
		var obj = {
			id: 0,
			x: posX,
			y: posY,
			forceX: force,
			jump: jumping,
			attacking: space,
			life: lifes,
			posx: ropeX,
			posy: ropeY,
			arrHealth: arrayHealth,
			vic: victory
		}
		conn.send(JSON.stringify(obj))
	}
	function sendPharaoh(posX, posY, lifes, force, jumping, space, clic, boxY1, boxY2, victory){
		var obj = {
			id: 1,
			x: posX,
			y: posY,
			forceX: force,
			jump: jumping,
			attacking: space,
			life: lifes,
			click: clic,
			bY1: boxY1,
			bY2: boxY2, 
			vic: victory
		}
		connPharaoh.send(JSON.stringify(obj))
	}

	

	function sendBoxesMummy(idN, posX, posY, angle, posXM, posYM, posXP, posYP){
		var obj = {
			id: idN,
			X: posX,
			Y: posY,
			Ang: angle,
			xMummy: posXM,
			yMummy: posYM,
			xPharaoh: posXP,
			yPharaoh: posYP
		}
		connBoxesMummy.send(JSON.stringify(obj));
	}

	function sendBoxesPharaoh(idN, posX, posY, angle, posXM, posYM, posXP, posYP){
		var obj = {
			id: idN,
			X: posX,
			Y: posY,
			Ang: angle,
			xPharaoh: posXP,
			yPharaoh: posYP,
			xMummy: posXM,
			yMummy: posYM,
		}
		connBoxesPharaoh.send(JSON.stringify(obj));
	}

	function sendRope(arrayX, arrayY){
		var obj = {
			id: 3,
			posx: arrayX,
			posy: arrayY
		}
		connRope.send(JSON.stringify(obj))
	}
	
	
	
	function sendRestart(onClick, onClick2){
		var obj = {
			id: 5,
			click: onClick,
			clickOut: onClick2
		}
		connRestart.send(JSON.stringify(obj))
	}
