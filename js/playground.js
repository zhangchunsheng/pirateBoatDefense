function Playground() {
	this.initialize();
}
Playground.prototype = new GL.Container();
Playground.prototype.Container_initialize = Playground.prototype.initialize;
Playground.prototype.initialize = function() {
	this.Container_initialize();
	this.clocking = 0;
	GL.Ticker.addListener(this);
};
Playground.prototype.tick = function() {
	this.clocking += 1e3 / 60;
	if(this.clocking >= 300) {
		this.clocking = 0;
		this.sortChildren(function (a, b) {
			var tempY1 = a.y,
				tempY2 = b.y;
			if(tempY1 === tempY2)
				return a.y += .1;
			return tempY1 - tempY2;
		});
	}
}