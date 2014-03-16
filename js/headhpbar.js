var HeadHPBar = function (livingThing, width, height) {
	this.initialize(livingThing, width, height);
};
HeadHPBar.prototype = new GL.Container();
HeadHPBar.prototype.Container_initialize = HeadHPBar.prototype.initialize;
HeadHPBar.prototype.initialize = function (livingThing, width, height) {
	this.Container_initialize();
	this.livingThing = livingThing;
	this.width = width;
	this.height = height;
	
	this.bgShape = new GL.Shape();
	this.bgShape.graphics.beginFill("black").drawRect(-1, -1, width + 2, height + 2);
	this.bgShape.regX = width / 2;
	this.bgShape.regY = livingThing.height / 2;
	this.addChild(this.bgShape);
	
	this.HPShape = new GL.Shape();
	this.setHP(livingThing.HP);
	this.HPShape.regX = width / 2;
	this.HPShape.regY = livingThing.height / 2;
	this.addChild(this.HPShape);
};
HeadHPBar.prototype.setHP = function (value) {
	if(value > this.livingThing.totalHP)
		return;
	this.HPShape.graphics.clear();
	var pct = value / this.livingThing.totalHP;
	this.HPShape.graphics.beginFill(this.getFillColor(pct)).drawRect(0, 0, this.width * pct, this.height);
};
HeadHPBar.prototype.getFillColor = function (percentage) {
	if(percentage >= .75)
		return "green";
	if(percentage >= .5)
		return "#55920D";
	if(percentage >= .3)
		return "#9FA40D";
	if(percentage >= 0)
		return "#952108";
}