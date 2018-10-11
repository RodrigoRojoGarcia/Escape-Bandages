function update(time, delta){
	
    if (cursors.left.isDown && player.body.onFloor() && !onAir)
    {
        player.setVelocityX(-160);
        player.anims.play('right', true);
        player.flipX = true;
        //facingRight = false;
    }
    else if (cursors.right.isDown && player.body.onFloor() && !onAir)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
        player.flipX = false;
        //facingRight = true;

    }else{
        if(player.body.onFloor() && !onAir){
            if(facingRight){
                player.setVelocityX(0);
                player.anims.play('stayRight'); 
            }else{
                player.setVelocityX(0);
                player.anims.play('stayLeft');
            } 
        }
        
    }

    if (cursors.left.isDown && !(player.body.onFloor()))
    {
        player.setVelocityX(-160);
        player.flipX = true;
        //facingRight = false;
    }
    else if (cursors.right.isDown && !(player.body.onFloor()))
    {
        player.setVelocityX(160);
        player.flipX = false;
        //facingRight = true;

    }

    if (cursors.up.isDown && player.body.onFloor())
    {   
        onAir = true;
        player.anims.play('jumpRight', true);
        this.time.addEvent({
            delay: 60,
            callback: jump,
            callbackScope: this
        });
        
    } 

    
    
        
} 
function jump(){
    player.setVelocityY(-330);
    onAir = false;
} 


   
    
    /*if (cursors.up.isDown && player.body.onFloor() && !facingRight)
    {
        player.anims.play('jumpLeft');
        player.setVelocityY(-330);
    }*/
