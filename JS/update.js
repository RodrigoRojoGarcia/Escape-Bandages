

function update(){
    const keys = this.keys;
   
	p.update(keys); //Update of the pharaoh
    m.update(keys); 	 //Update of the mummy
    //e.update();
    p.resetColliding();
    m.resetColliding();

    if(Phaser.Input.Keyboard.JustDown(keys.space)){
            if(this.bastetText === 1){
                this.sayBastet1.setVisible(false);
                this.sayBastet2.setVisible(true);
                this.bastetText = 2;
            }else if(this.bastetText === 2){
                this.sayBastet2.setVisible(false);
                m.steady = false;
            }
        
        }
    //e.resetColliding();
    for(var i = 0; i < buttons.length; i++){
        buttons[i].update();
        buttons[i].resetColliding();
    }

    updateButtons();
}

