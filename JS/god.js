function God(scene, x, y, sprite){
	this.scene = scene;
	

///////////////////////////////////CREACIÓN///////////////////////////////////
	//Sprite
	this.god = scene.add.sprite(x,y,sprite);

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Al fondo
	this.god.depth = 0
	//Qué Dios es
	var k;

///////////////////////////////////MÉTODOS///////////////////////////////////
	//Devuelve el sprite
	this.getSprite = function(){
		return this.god;
	}

///////////////////////////////////CREATE///////////////////////////////////
	this.create = function(){
		//Si el sprite es Anubis
		if(sprite === "Anubis"){
			//K obtiene el valor del sprite de Anubis
			k = 'god1';
		}
		//Si el sprite es Bastet
		if(sprite === "Bastet"){
			//K obtiene el valor del sprite de Bastet
			k = 'god2';
		}

///////////////////////////////////ANIMATIONS///////////////////////////////////
		const anims = scene.anims;
		//Quieto mirando a la derecha
		anims.create({
			key: k,
			frames: anims.generateFrameNumbers(sprite, {start: 0, end: 3}),
			frameRate: 5,
			repeat: -1
		});
	}//FIN CREATE

///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(){
		var player;
		//Si somos Anubis, miramos al faraón
		if(sprite === "Anubis"){
			if(!p.dead){
				player = p.getX();	
			}
			
		}
		//Si somos Bastet, miramos a la momia
		if(sprite === "Bastet"){
			if(!m.dead){
				player = m.getX();
			}
		}
		//Distancia al jugador
		var distance = this.god.x - player;
		//Fuerza que se va a añadir para hacer el movimiento más fluido (y permitir que mueva cosas)
		var movingForce = 0.1;
		//Si estamos a la izquierda y la distancia es menor a 1000
	    if (player < this.god.x && distance > 0 && distance < 1000)
	    {
	    	//Miramos a la izquierda
	        this.god.flipX = true;
	    }
	    //Si estamos a la derecha y la distancia es menor a 1000
	    else if (player > this.god.x  && distance < 0 && distance > -1000)
	    {	
	    	//Miramos a la derecha
	        this.god.flipX = false;
	    }

	    //Reproducimos animación de estar quieto
		this.god.anims.play(k, true);
	}  //FIN UPDATE


}