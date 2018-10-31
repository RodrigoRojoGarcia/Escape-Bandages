

function update(){
    const keys = this.keys;
   
	p.update(keys); //Update of the pharaoh
    m.update(keys); 	 //Update of the mummy
    //e.update();
    p.resetColliding();
    m.resetColliding();
    if(keys.space.isDown){
    	
    	m.steady = false;
    	
    	this.sayBastet.setVisible(false);
    }

    //e.resetColliding();
}

