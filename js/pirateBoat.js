function PirateBoat(name, currentPosition) {
	this.initialize(name, currentPosition);
}
PirateBoat.prototype = new GL.Container();
PirateBoat.prototype.Container_initialize = PirateBoat.prototype.initialize;
PirateBoat.prototype.initialize = function (name, currentPosition) {
	this.Container_initialize();
	
	var spriteSheet = new GL.SpriteSheet(Resource.getJSON(name));
	//GL.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
	this.pirateAnimation = new GL.BitmapAnimation(spriteSheet);
	this.pirateAnimation.gotoAndPlay("level1");
	this.HP = gameMain.pirateBoatsInfo[name].HP;
	this.totalHP = gameMain.pirateBoatsInfo[name].HP;
	this.level = 1;
	this.height = gameMain.pirateBoatWidth + 10;
	this.currentPosition = currentPosition;
	this.x = currentPosition.x * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
	this.y = currentPosition.y * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
	this.addChild(this.pirateAnimation);
	this.headHPBar = new HeadHPBar(this, gameMain.pirateBoatWidth, 2);
	this.addChild(this.headHPBar);
	this.attackCD = true;
	GL.Ticker.addListener(this);
	this.timer = 0;
	this.fireCDTime = gameMain.pirateBoatsInfo[name].FireCDTime;
	this.attackScope = gameMain.pirateBoatsInfo[name].AttackScope;
	var THIS = this;
	this.pirateAnimation.onPress = function (e) {
		gameMain.hasShowAttackScope = true;
		gameMain.buildAreaContainer.removeAllChildren();
		var attackScope = new GL.Shape();

		gameMain.buildAreaContainer.addChild(attackScope);
		var g = attackScope.graphics;
		attackScope.x = currentPosition.x * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
		attackScope.y = currentPosition.y * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
		g.setStrokeStyle(1);
		g.beginStroke(GL.Graphics.getRGB(0, 0, 0));
		g.beginFill(GL.Graphics.getRGB(55, 55, 55));
		g.drawCircle(0, 0, this.parent.attackScope);
		attackScope.alpha = 0.2;
		attackScope.onPress = function () {
			gameMain.hasShowAttackScope = false;
			gameMain.buildAreaContainer.removeAllChildren();
		};
		gameMain.stage.onPress = function () {
			gameMain.hasShowAttackScope = false;
			gameMain.buildAreaContainer.removeAllChildren();
			gameMain.stage.onPress = null;
		};

		//修理
		/*var repairPirateBoat = Resource.getBitmap("repairPirateBoat");
		repairPirateBoat.regX = repairPirateBoat.image.width / 2;
		repairPirateBoat.regY = repairPirateBoat.image.height / 2;
		//gameMain.buildAreaContainer.addChild(repairPirateBoat);
		repairPirateBoat.x = (currentPosition.x - 1) * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
		repairPirateBoat.y = currentPosition.y * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
		
		//升级
		var upgradePirateBoat = Resource.getBitmap("upgradePirateBoat");
		upgradePirateBoat.regX = upgradePirateBoat.image.width / 2;
		upgradePirateBoat.regY = upgradePirateBoat.image.height / 2;
		//gameMain.buildAreaContainer.addChild(upgradePirateBoat);
		upgradePirateBoat.x = (currentPosition.x + 1) * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
		upgradePirateBoat.y = currentPosition.y * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
		upgradePirateBoat.onPress = function () {
			THIS.level++;
			THIS.updatePirate();
			gameMain.buildAreaContainer.removeAllChildren();
		}
		
		//出售
		var sellPirateBoat = Resource.getBitmap("sellPirateBoat");
		sellPirateBoat.regX = sellPirateBoat.image.width / 2;
		sellPirateBoat.regY = sellPirateBoat.image.height / 2;
		//gameMain.buildAreaContainer.addChild(sellPirateBoat);
		sellPirateBoat.x = currentPosition.x * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;
		sellPirateBoat.y = currentPosition.y * gameMain.pirateBoatWidth + gameMain.pirateBoatWidth + gameMain.pirateBoatWidth / 2;*/
	};
	/*this.pirateAnimation.onMouseOut = function(e) {
		gameMain.hasShowAttackScope = false;
		gameMain.buildAreaContainer.removeAllChildren();
	}*/
};

PirateBoat.prototype.updatePirate = function () {
	this.pirateAnimation.gotoAndPlay("level" + this.level);
}

PirateBoat.prototype.tick = function () {
	if(!this.attackCD) {
		this.timer += 30;
		if(this.timer > this.fireCDTime) {
			this.timer = 0;
			this.attackCD = true
		}
	}
	if(this.attackCD) {
		for (var i = 0; i < gameMain.cargoShipArray.length; i++) {
			var currentShip = gameMain.cargoShipArray[i],
				shipPosition = new Vector2(currentShip.x, currentShip.y);
			if(shipPosition.distanceToSquared({x: this.x, y: this.y}) < Math.pow(this.attackScope, 2)) {
				this.attackCD = false;
				var bullet = new Bullet(this.currentPosition, shipPosition, currentShip);
				bullet.speed = shipPosition.sub({
					x: this.x,
					y: this.y
				}).setLength(bullet.speedValue);
				bullet.speed.y -= 2;
				gameMain.playGroundContainer.addChild(bullet);
				break;
			}
		}
	}
};
PirateBoat.prototype.setDirection = function (targetPosition) {
	var stepX = targetPosition.x - this.currentPosition.x,
		stepY = targetPosition.y - this.currentPosition.y;
	if(stepX === 0 && stepY < 0)
		this.direction = 1;
	if(stepX > 0 && stepY === 0)
		this.direction = 2;
	if(stepX === 0 && stepY > 0)
		this.direction = 3;
	if(stepX < 0 && stepY === 0)
		this.direction = 4;
};
PirateBoat.prototype.walk = function () {
	this.pirateAnimation.currentAnimation != "walk" + this.getFrameName()
		&& this.pirateAnimation.gotoAndPlay("walk" + this.getFrameName());
};
PirateBoat.prototype.stand = function () {
	this.pirateAnimation.currentAnimation != "stand" + this.getFrameName()
		&& this.pirateAnimation.gotoAndPlay("stand" + this.getFrameName());
};
PirateBoat.prototype.win = function () {
	this.pirateAnimation.currentAnimation != "win"
		&& this.pirateAnimation.gotoAndPlay("win");
};
PirateBoat.prototype.lose = function () {
	this.pirateAnimation.currentAnimation != "lose"
		&& this.pirateAnimation.gotoAndPlay("lose");
};
PirateBoat.prototype.fire = function () {
	var bullet = new Bullet(this.currentPosition);
	gameMain.playGroundContainer.addChild(bullet);
};
PirateBoat.prototype.getFrameName = function () {
	if(this.direction == 1)
		return "1";
	if(this.direction == 2)
		return "4_h";
	if(this.direction == 3)
		return "3";
	if(this.direction == 4)
		return "4";
}