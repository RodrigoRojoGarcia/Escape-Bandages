function healthBar (maxHealth, x, y, width, height) {

///////////////////////////////////ATRIBUTOS///////////////////////////////////
	//Vida máxima
	this.maxHealth = maxHealth;
	//Vida restante
	this.health = maxHealth;

///////////////////////////////////MÉTODOS///////////////////////////////////
	//Quitamos vida
	this.damage = function(dmg){
		//Restamos a vida el daño
		this.health -= dmg;
	}
	//Destruimos
	this.destroy = function(){
		//Vacíamos graphics
		graphics.clear();
	}

///////////////////////////////////UPDATE///////////////////////////////////
	this.update = function(x,y,width,height){
		//Los gráficos que empiecen desde el centro del sprite que tenga la barra
		graphics.setPosition(x,y)
		//Inicio del dibujo del rectángulo (los sprites se miden desde su centro, los rectángulos desde la esquina superior izquierda)
		var xRec = -(width/2)
		var yRec = -(height/2)
		//Vaciamos los gráficos (para que no se queden antiguas barras de vida)
		graphics.clear();
		//Pintamos en Verde
		graphics.fillStyle(0x00ff00)
		//Pintamos la vida restante
		graphics.fillRect(xRec,yRec,width*(this.health/this.maxHealth),5);
		//Pintamos en rojo
		graphics.fillStyle(0xff0000)
		//Pintamos la vida que le queda
		graphics.fillRect(xRec+width*(this.health/this.maxHealth),yRec,width-width*(this.health/this.maxHealth),5);
	}

}