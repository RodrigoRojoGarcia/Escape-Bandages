function update(time, delta){
    const keys = this.keys;
    /////////////////////////////////PHARAOH////////////////////////////////
	if (keys.left.isDown)
    {
        pharaoh.setVelocityX(-160);

        pharaoh.anims.play('leftP', true);
        facingRightP = false;
    }
    else if (keys.right.isDown)
    {
        pharaoh.setVelocityX(160);

        pharaoh.anims.play('rightP', true);
        facingRightP = true;

    }else if(facingRightP){
    	pharaoh.setVelocityX(0);

        pharaoh.anims.play('stayRightP');	
    }else{
    	pharaoh.setVelocityX(0);

        pharaoh.anims.play('stayLeftP');
    }
    if (keys.up.isDown && pharaoh.body.onFloor())
    {
        pharaoh.setVelocityY(-330);
    }
    //////////////////////////////MUMMY/////////////////////////////////
        if (keys.a.isDown)
    {
        mummy.setVelocityX(-160);

        mummy.anims.play('leftM', true);
        facingRightM = false;
    }
    else if (keys.d.isDown)
    {
        mummy.setVelocityX(160);

        mummy.anims.play('rightM', true);
        facingRightM = true;

    }else if(facingRightM){
        mummy.setVelocityX(0);

        mummy.anims.play('stayRightM'); 
    }else{
        mummy.setVelocityX(0);

        mummy.anims.play('stayLeftM');
    }
    if (keys.w.isDown && mummy.body.onFloor())
    {
        mummy.setVelocityY(-330);
    }
}
