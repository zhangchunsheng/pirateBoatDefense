function Bullet(currentPosition, targetPosition, target) {
	this.initialize(currentPosition, targetPosition, target);
}
Bullet.prototype = new GL.Container();
Bullet.prototype.Container_initialize = Bullet.prototype.initialize;
Bullet.prototype.initialize = function(currentPosition, targetPosition, target) {
	this.Container_initialize();
	this.bitmap = Resource.getBitmap("bullet");
	this.x = currentPosition.x * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
	this.y = currentPosition.y * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
	this.speedValue = 8;
	this.speed = {
		x: 0,
		y: 0
	};
	this.gravity = .2;
	this.addChild(this.bitmap);
	this.targetPosition = targetPosition;
	this.target = target;
	GL.Ticker.addListener(this);
};
Bullet.prototype.tick = function () {
	this.x += this.speed.x;
	this.y += this.speed.y;
	this.speed.y += this.gravity;
	if((new Vector2(this.x, this.y)).distanceToSquared({
		x: this.targetPosition.x,
		y: this.targetPosition.y
	}) <= 1600) {
		var spriteSheet = new GL.SpriteSheet(Resource.getJSON("explode1")),
			bulletAnimation = new GL.BitmapAnimation(spriteSheet);

		bulletAnimation.gotoAndPlay("show");

		this.target.showFire();
		this.target.addChild(bulletAnimation);
		var THIS = this;
		THIS.target.subHP(MathHelper.getRandomNumber(800, 1200));
		bulletAnimation.onAnimationEnd = function() {
			THIS.target.removeChild(bulletAnimation);
		};
		soundUtil.play("explosion");
		this.destroy();
	}
};
Bullet.prototype.destroy = function () {
	this.removeAllChildren();
	this.parent.removeChild(this);
	GL.Ticker.removeListener(this);
}