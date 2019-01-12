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

	this.destroy = function(){
		this.god.destroy();
	}

	if(sprite === "Anubis"){
		//K obtiene el valor del sprite de Anubis
		k = 'god1';
	}
	//Si el sprite es Bastet
	if(sprite === "Bastet"){
		//K obtiene el valor del sprite de Bastet
		k = 'god2';
	}


///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(){
		var player;
		//Si somos Anubis, miramos al faraón
		if(sprite === "Anubis"){
			//Si el faraón no está muerto, claro
			if(!this.scene.p.dead){
				player = this.scene.p.getX();	
			}
			
		}
		//Si somos Bastet, miramos a la momia
		if(sprite === "Bastet"){
			//Si la momia no está muerta, claro
			if(!this.scene.m.dead){
				player = this.scene.m.getX();
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