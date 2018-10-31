

function update(){
    const keys = this.keys;
   
	p.update(keys); //Update of the pharaoh
    m.update(keys); 	 //Update of the mummy
    //e.update();
    p.resetColliding();
    m.resetColliding();
    //e.resetColliding();
    for(var i = 0; i < buttons.length; i++){
        buttons[i].update();
        buttons[i].resetColliding();
    }
}

