export default class Mummy{
	constructor(scene, x, y){
		this.scene = scene;


		var facingRight = false;
		//ANIMATIONS
		const anims = scene.anims;
		anims.create({
			key: 'left',
			frames: anims.generateFrameNumbers('Mummy', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		});

		anims.create({
			key: 'right',
			frames: anims.generateFrameNumbers('Mummy', {start: 4, end: 7}),
			framRate: 10,
			repeat: -1
		});

		anims.create({
			key: 'stayLeft',
			frames: [{key: 'Mummy', frame: 0}],
			frameRate: 20
		});

		anims.create({
			key: 'stayRight',
			frames: [{key: 'Mummy', frame: 7}],
			frameRate: 20
		});

		this.mummy = scene.physics.add.sprite(x,y,'Mummy');


		const {W, A, D} = Phaser.Input.Keyboard.KeyCodes;

		this.keys = scene.input.keyboard.addKeys({
			w: W,
			a: A,
			d: D
		});


		update(){
			if (keys.a.isDown){
		        mummy.setVelocityX(-160);

		        mummy.anims.play('left', true);
		        facingRight = false;
		    }
		    else if (keys.d.isDown){
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
		    if (keys.w.isDown && mummy.body.onFloor()){
		        pharaoh.setVelocityY(-330);
		    }
		}
	}
}