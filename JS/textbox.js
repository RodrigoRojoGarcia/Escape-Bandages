function textBox(bitMapText,text,x,y,siz,s) {
	this.scene = s;
	this.x = x;
	this.y = y;
	this.siz = siz;
	this.bitMap = bitMapText;
	this.parr = text;
	this.textB = scene.add.bitmapText(this.x,this.y,this.bitMap,this.parr,this.siz);
	this.create = function(){

	};
	this.update = function(){

	};
}