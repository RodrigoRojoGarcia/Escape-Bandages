function update(time, delta){
    /////////////////////////////////PHARAOH////////////////////////////////
	if (cursors.left.isDown)
    {
        pharaoh.setVelocityX(-160);

        pharaoh.anims.play('left', true);
        facingRight = false;
    }
    else if (cursors.right.isDown)
    {
        pharaoh.setVelocityX(160);

        pharaoh.anims.play('right', true);
        facingRight = true;

    }else if(facingRight){
    	pharaoh.setVelocityX(0);

        pharaoh.anims.play('stayRight');	
    }else{
    	pharaoh.setVelocityX(0);

        pharaoh.anims.play('stayLeft');
    }
    if (cursors.up.isDown && pharaoh.body.onFloor())
    {
        pharaoh.setVelocityY(-330);
    }
    //////////////////////////////MUMMY/////////////////////////////////
        if (cursors.a.isDown)
    {
        mummy.setVelocityX(-160);

        mummy.anims.play('left', true);
        facingRight = false;
    }
    else if (cursors.d.isDown)
    {
        mummy.setVelocityX(160);

        mummy.anims.play('right', true);
        facingRight = true;

    }else if(facingRight){
        mummy.setVelocityX(0);

        mummy.anims.play('stayRight'); 
    }else{
        mummy.setVelocityX(0);

        mummy.anims.play('stayLeft');
    }
    if (cursors.w.isDown && mummy.body.onFloor())
    {
        mummy.setVelocityY(-330);
    }
}