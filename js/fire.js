var Fire = function () {
	var fire = new GL.SpriteSheet(Resource.getJSON("fire"));
	this.initialize(fire);
}

Fire.prototype = new GL.BitmapAnimation();
Fire.prototype.BitmapAnimation_initialize = Fire.prototype.initialize;
Fire.prototype.initialize = function (fire) {
	this.BitmapAnimation_initialize(fire);
	//this.gotoAndPlay("show");
}