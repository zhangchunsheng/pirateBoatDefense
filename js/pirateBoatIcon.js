function PirateBoatIcon(name, x, y) {
	this.initialize(name, x, y);
}
PirateBoatIcon.prototype = new GL.Container();
PirateBoatIcon.prototype.Container_initialize = PirateBoatIcon.prototype.initialize;
PirateBoatIcon.prototype.initialize = function (name, x, y) {
	this.Container_initialize();
	this.x = x * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
	this.y = y * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
	var bmp = Resource.getBitmap("choosePirate");
	bmp.regX = bmp.regY = 34;
	var p = new Resource.getBitmap(name);
	p.scaleX = .5;
	p.scaleY = .5;
	p.regX = gameMain.pirateBoatWidth / 2;
	p.regY = p.image.height / 2;
	p.sourceRect = new GL.Rectangle(0, 0, gameMain.pirateBoatWidth, p.image.height);
	this.addChild(bmp, p);
	this.scaleX = this.scaleY = 0;
	gameMain.buildAreaContainer.addChild(this);
	GL.Tween.get(this).to({
		alpha: 1,
		scaleX: 1,
		scaleY: 1
	}, 500, GL.Ease.backOut);
	this.onPress = function () {
		for (var i = 0; i < gameMain.iconArr.length; i++)
			gameMain.iconArr[i].parent.removeChild(gameMain.iconArr[i]);
		gameMain.iconArr.length = 0;
		var pirateBoat = new PirateBoat("pirateBoat1", {
			x: parseInt(gameMain.tgt.x / gameMain.pirateBoatWidth),
			y: parseInt(gameMain.tgt.y / gameMain.pirateBoatWidth)
		});
		//for (var i = 0; i < gameMain.cargoShipArray.length; i++) {
		//    gameMain.cargoShipArray[i].path = gameMain.astar.getPath(parseInt(gameMain.cargoShipArray[i].x / gameMain.cargoShipWidth), parseInt(gameMain.cargoShipArray[i].y / gameMain.cargoShipWidth), gameMain.cargoShipArray[i].exitPosition.x, gameMain.cargoShipArray[i].exitPosition.y);
		//    gameMain.cargoShipArray[i].path.shift()
		//}
		gameMain.pirateBoatArray.push(pirateBoat);
		gameMain.playGroundContainer.addChild(pirateBoat);
		gameMain.buildAreaContainer.removeChild(gameMain.tgt);
	}
}