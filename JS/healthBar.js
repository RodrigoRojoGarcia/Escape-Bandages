function healthBar (maxHealth, x, y, width, height) {

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Vida máxima
	this.maxHealth = maxHealth;
	//Vida restante
	this.health = maxHealth;
	//Los gráficos dónde dibujamos las barras de vida
	this.graphics = scene.add.graphics({ x: map.widthInPixels, y: map.heightInPixels });
///////////////////////////////////MÉTODOS///////////////////////////////////
	//Quitamos vida
	this.damage = function(dmg){
		//Restamos a vida el daño
		this.health -= dmg;
	}
	//Destruimos
	this.destroy = function(){
		//Vacíamos graphics
		this.graphics.clear();
	}

///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(x,y,width,height){
		//Los gráficos que empiecen desde el centro del sprite que tenga la barra
		this.graphics.setPosition(x,y)
		//Inicio del dibujo del rectángulo (los sprites se miden desde su centro, los rectángulos desde la esquina superior izquierda)
		var xRec = -(width/2)
		var yRec = -(height/2)
		 //Vaciamos los gráficos (para que no se queden antiguas barras de vida)
    	this.graphics.clear();
		//Pintamos en Verde
		this.graphics.fillStyle(0x00ff00)
		//Pintamos la vida restante
		this.graphics.fillRect(xRec,yRec,width*(this.health/this.maxHealth),5);
		//Pintamos en rojo
		this.graphics.fillStyle(0xff0000)
		//Pintamos la vida que le queda
		this.graphics.fillRect(xRec+width*(this.health/this.maxHealth),yRec,width-width*(this.health/this.maxHealth),5);
	}

}