function update(time, delta){
    const keys = this.keys;
    /////////////////////////////////PHARAOH////////////////////////////////
	this.pharaoh.update();
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
