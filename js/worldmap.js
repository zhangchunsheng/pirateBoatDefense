function WorldMap() {
	this.initialize();
}

WorldMap.prototype = new GL.Container();
WorldMap.prototype.Container_initialize = WorldMap.prototype.initialize;

WorldMap.prototype.initialize = function () {
	this.Container_initialize();

	var worldMapContainer = new GL.Container();
	var mapArray = [
		["southEastAsia-1","southEastAsia-2"],
		["southEastAsia-3","southEastAsia-4"],
		["southEastAsia-5","southEastAsia-6"]
	];
	var worldMapImage = {};
	var x = 0;
	var y = 0;
	for(var i = 0 ; i < mapArray.length ; i++) {
		x = 0;
		for(var j = 0 ; j < mapArray[i].length ; j++) {
			worldMapImage = Resource.getBitmap(mapArray[i][j]);
			worldMapImage.x = x;
			worldMapImage.y = y;
			worldMapContainer.addChild(worldMapImage);
			x += worldMapImage.image.width;
		}
		y += worldMapImage.image.height;
	}
	shape = new createjs.Shape();
	// the mask's position will be relative to the parent of its target:
	shape.x = 0;
	shape.y = 0;
	// only the drawPolyStar call is needed for the mask to work:
	//shape.graphics.rect(0, 0, gameMain.stage.canvas.width, gameMain.stage.canvas.height);
	shape.graphics.beginRadialGradientFill(["#F00","#00F"], [0, 1], gameMain.stage.canvas.width / 2, gameMain.stage.canvas.height / 2, 0, gameMain.stage.canvas.width / 2, gameMain.stage.canvas.height / 2, 50).rect(0, 0, gameMain.stage.canvas.width, gameMain.stage.canvas.height);
	//worldMapContainer.mask = shape;
	//worldMapContainer.addChild(shape);
	worldMapContainer.width = x;
	worldMapContainer.height = y;
	this.addChild(worldMapContainer);
	
	/*var image_width = worldMapImage.image.width;
	var image_height = worldMapImage.image.height;
	worldMapImage.cache(0,0, image_width, image_height);
	worldMapImage.x = image_width;
	worldMapImage.snapToPixel = true;
	var value = 20;
	var i = 0;
	if (i%2) {
		worldMapImage.skewY = value;
	} else {
		worldMapImage.skewY = -1*value;
		worldMapImage.y = -(150) * Math.sin(worldMapImage.skewY/180*Math.PI)
	}
	worldMapImage.x = ((image_width - 1)*i) * Math.cos(worldMapImage.skewY/180*Math.PI);
	worldMapImage.filters = [getColorMatrixFilter(worldMapImage.skewY)];
	worldMapImage.snapToPixel = true;
	var _scale = (value > 0) ? 1/value * 20 : -1*(1/value * 20);
	worldMapContainer.rotation = (value > 0) ? value>>1 : - 1*value>>1;
	worldMapContainer.scaleX = worldMapContainer.scaleY = (_scale <= 1) ? _scale : 1;
	worldMapContainer.x = gameMain.stage.canvas.width - image_width >> 1;
	worldMapContainer.y = gameMain.stage.canvas.height - image_height >> 1;*/
	
	
	var city = {};
	for (var i = 0; i < gameMain.currentWorldMapData.Citys.length; i++) {
		if (i + 1 > gameMain.currentCity) {
			city = new City(i + 1, true);
		} else {
			city = new City(i + 1);
		}
		city.x = gameMain.currentWorldMapData.Citys[i].x;
		city.y = gameMain.currentWorldMapData.Citys[i].y;
		worldMapContainer.addChild(city);
	}
	
	//分数
	var gameScore = Resource.getBitmap("gameScore");
	gameScore.x = MapConfig.items.gameScore.x;
	gameScore.y = MapConfig.items.gameScore.y;
	this.addChild(gameScore);
	var scoreImg = Resource.getBitmap("score");
	scoreImg.x = MapConfig.items.scoreImg.x;
	scoreImg.y = MapConfig.items.scoreImg.y;
	scoreImg.scaleX = 0.4;
	scoreImg.scaleY = 0.4;
	this.addChild(scoreImg);
	var score = new GL.Text("0/60", "bold 20px Arial", "grey");
	score.x = MapConfig.items.score.x;
	score.y = MapConfig.items.score.y;
	this.addChild(score);
	
	var diamond = new GL.Text("0", "bold 20px Arial", "grey");
	diamond.x = MapConfig.items.diamond.x;
	diamond.y = MapConfig.items.diamond.y;
	this.addChild(diamond);
	
	//返回
	var btn_back = Resource.getBitmap("btn_back");
	btn_back.x = MapConfig.items.btn_back.x;
	btn_back.y = MapConfig.items.btn_back.y;
	this.addChild(btn_back);
	
	//商店
	var shop = Resource.getBitmap("shop");
	shop.x = MapConfig.items.shop.x;
	shop.y = MapConfig.items.shop.y;
	this.addChild(shop);
	
	//强化
	var strengthenBoat = Resource.getBitmap("strengthenBoat");
	strengthenBoat.x = MapConfig.items.strengthenBoat.x;
	strengthenBoat.y = MapConfig.items.strengthenBoat.y;
	this.addChild(strengthenBoat);
	
	//soundUtil.play("startGame", true);

	gameMain.stage.onMouseDown = WorldMap.onMouseDown;
	gameMain.stage.onMouseMove = WorldMap.onMouseMove;
	gameMain.stage.onMouseUp = WorldMap.onMouseUp;
};

WorldMap.onMouseDown = function (e) {
	gameMain.hasMouseDown = true;
	gameMain.startX = e.stageX;
	gameMain.startY = e.stageY;
};

WorldMap.onMouseMove = function (e) {
	if (gameMain.hasMouseDown) {
		var x = gameMain.startX - e.stageX;
		var y = gameMain.startY - e.stageY;
		gameMain.startX = e.stageX;
		gameMain.startY = e.stageY;
		var worldMap = gameMain.worldMapContainer.getChildAt(0);
		worldMap.x -= x;
		worldMap.y -= y;

		if (worldMap.x > 0) {
			worldMap.x = 0;
		}
		var width = (worldMap.width * gameMain.stage.scaleX - gameMain.stage.canvas.width);
		if (worldMap.x < -width) {
			worldMap.x = -width;
		}

		if (worldMap.y > 0) {
			worldMap.y = 0;
		}
		var height = (worldMap.height * gameMain.stage.scaleY - gameMain.stage.canvas.height);
		if (worldMap.y < -height) {
			worldMap.y = -height;
		}
	}
};

WorldMap.onMouseUp = function (e) {
	gameMain.hasMouseDown = false;
}

function getColorMatrixFilter(value) {
	var cm = new GL.ColorMatrix();
	cm.adjustBrightness(value*0.75);
	return new GL.ColorMatrixFilter(cm);
}