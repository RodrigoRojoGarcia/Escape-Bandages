function update(time, delta){
	if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
        facingRight = false;
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
        facingRight = true;

    }else if(facingRight){
    	player.setVelocityX(0);

        player.anims.play('stayRight');	
    }else{
    	player.setVelocityX(0);

        player.anims.play('stayLeft');
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}