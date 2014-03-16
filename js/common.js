/**
 * 作者：张春生
 * 日期：2012-11-22
 * 说明：通用方法，如：工具栏、商店等
 */
function ChoosePirate() {
	this.initialize();
}

ChoosePirate.prototype = new GL.Container();
ChoosePirate.prototype.Container_initialize = ChoosePirate.prototype.initialize;

ChoosePirate.prototype.initialize = function() {
	this.Container_initialize();
	
	var x = MapConfig.items.choosePirateCircle.x;
	var y = MapConfig.items.choosePirateCircle.y;
	var width = MapConfig.items.choosePirateCircle.width + MapConfig.items.choosePirateCircle.spacing;
	for(var i = 0 ; i < 8 ; i++) {
		var choosePirateCircle = Resource.getBitmap("bg_boatbox");
		choosePirateCircle.x = x + i * width + 10;
		choosePirateCircle.y = y;
		choosePirateCircle.onPress = function(e) {
			if(gameMain.pirateBoatArray.length == gameMain.buildArea.length) {
				return;
			}
			gameMain.currentChoosePirateBoat = e.target.shipName;
			gameMain.hasMouseDown = true;
			gameMain.hasSelectPirateBoat = true;
			if(gameMain.attackScopeShape)
				return;
			var pirateBoatCoordinate = gameMain.pirateBoatCoordinate;
			for(var i = 0 ; i < pirateBoatCoordinate.length ; i++) {
				if(gameMain.hasPirateBoat[i]) {
					continue;
				}
				var target = Resource.getBitmap("target");
				target.x = Math.round(pirateBoatCoordinate[i].x / gameMain.pirateBoatWidth) * gameMain.pirateBoatWidth;
				target.y = Math.round(pirateBoatCoordinate[i].y / gameMain.pirateBoatWidth) * gameMain.pirateBoatWidth;
				gameMain.buildAreaContainer.addChild(target);
				GL.Tween.get(target, {loop: true}).to({
					alpha: 0
				}, 1000).to({
					alpha: 1
				}, 1000);
			}
			gameMain.selectPirateBoat = Resource.getBitmap(gameMain.currentChoosePirateBoat);
			var x = gameMain.stage.mouseX / gameMain.stage.scaleX;
			var y = gameMain.stage.mouseY / gameMain.stage.scaleY;
			gameMain.selectPirateBoat.x = x;
			gameMain.selectPirateBoat.y = y;
			gameMain.selectPirateBoat.regX = gameMain.pirateBoatWidth / 2;
			gameMain.selectPirateBoat.regY = gameMain.pirateBoatWidth / 2;
			gameMain.buildAreaContainer.addChild(gameMain.selectPirateBoat);
			gameMain.attackScopeShape = new GL.Shape();
			gameMain.buildAreaContainer.addChild(gameMain.attackScopeShape);
			var g = gameMain.attackScopeShape.graphics;
			gameMain.attackScopeShape.x = x;
			gameMain.attackScopeShape.y = y;
			g.setStrokeStyle(1);
			g.beginStroke(GL.Graphics.getRGB(0, 0, 0));
			g.beginFill(GL.Graphics.getRGB(55, 55, 55));
			g.drawCircle(0, 0, gameMain.pirateBoatsInfo[gameMain.currentChoosePirateBoat].AttackScope);
			gameMain.attackScopeShape.alpha = 0.2;
			
			e.onMouseMove = function(e) {
				THIS = gameMain;
				if(!THIS.hasMouseDown)
					return;
				var x = e.stageX / THIS.stage.scaleX;
				var y = e.stageY / THIS.stage.scaleY;
				THIS.selectPirateBoat.x = x;
				THIS.selectPirateBoat.y = y;
				THIS.attackScopeShape.x = x;
				THIS.attackScopeShape.y = y;
				if(THIS.currentChoosePirateBoat == null)
					return;
				var x = parseInt((THIS.stage.mouseX / THIS.pirateBoatWidth) / THIS.stage.scaleX),
					y = parseInt((THIS.stage.mouseY / THIS.pirateBoatWidth) / THIS.stage.scaleY);
				if(_.include(THIS.buildArea, x + "_" + y) && !THIS.hasPirateBoatInPosition(x, y)) {
					var index = _.indexOf(THIS.buildArea, x + "_" + y);
					var position = THIS.pirateBoatCoordinate[index];
					THIS.getBuildPosition = position;
					THIS.getBuildPosition.buildAreaIndex = index;
					if(THIS.buildAreaShape)
						return;
					THIS.buildAreaShape = new GL.Shape();
					THIS.buildAreaContainer.addChild(THIS.buildAreaShape);
					var g = THIS.buildAreaShape.graphics;
					THIS.buildAreaShape.x = position.x;
					THIS.buildAreaShape.y = position.y;
					g.setStrokeStyle(0);
					g.beginFill(GL.Graphics.getRGB(122, 67, 231));
					g.drawRoundRect(0, 0, THIS.cargoShipWidth, THIS.cargoShipWidth, 10);
					THIS.buildAreaShape.alpha = 0.1;
				} else {
					if(THIS.buildAreaShape) {
						THIS.buildAreaContainer.removeChild(THIS.buildAreaShape);
					}
					THIS.buildAreaShape = null;
				}
			}
			e.onMouseUp = function(e) {
				THIS = gameMain;
				if(!THIS.hasMouseDown) {
					return;
				}
				if(THIS.getBuildPosition) {
					THIS.hasPirateBoat[THIS.getBuildPosition.buildAreaIndex] = true;
					var pirateBoat = new PirateBoat(THIS.currentChoosePirateBoat, {
						x: parseInt((Math.round(THIS.getBuildPosition.x / THIS.pirateBoatWidth) * THIS.pirateBoatWidth + THIS.pirateBoatWidth / 2) / THIS.pirateBoatWidth),
						y: parseInt((Math.round(THIS.getBuildPosition.y / THIS.pirateBoatWidth) * THIS.pirateBoatWidth + THIS.pirateBoatWidth / 2) / THIS.pirateBoatWidth)
					});
					THIS.pirateBoatArray.push(pirateBoat);
					THIS.playGroundContainer.addChild(pirateBoat);
					THIS.currentChoosePirateBoat = null;
					THIS.getBuildPosition = null;
				}
				THIS.hasMouseDown = false;
				THIS.hasSelectPirateBoat = false;
				THIS.selectPirateBoat = null;
				THIS.attackScopeShape = null;
				THIS.buildAreaContainer.removeAllChildren();
			}
		}
		var ship = Resource.getBitmap(gameMain.choosePirateBoat[i]);
		choosePirateCircle.shipName = gameMain.choosePirateBoat[i];
		ship.scaleX = MapConfig.items.pirateBoat.choosePirateBoatWidth / gameMain.pirateBoatWidth;
		ship.scaleY = MapConfig.items.pirateBoat.choosePirateBoatWidth / gameMain.pirateBoatWidth;
		ship.x = (x + i * width + 10) + (MapConfig.items.choosePirateCircle.width - MapConfig.items.pirateBoat.choosePirateBoatWidth) / 2;
		ship.y = y + (MapConfig.items.choosePirateCircle.width - MapConfig.items.pirateBoat.choosePirateBoatWidth) / 2 - 10;
		this.addChild(choosePirateCircle, ship);
	}
}