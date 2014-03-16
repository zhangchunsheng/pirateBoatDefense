function CargoShip(name, pathId, currentPositionIndex, nextPositionIndex, exitPosition) {
	this.initialize(name, pathId, currentPositionIndex, nextPositionIndex, exitPosition);
}
CargoShip.prototype = new GL.Container();
CargoShip.prototype.Container_initialize = CargoShip.prototype.initialize;
CargoShip.prototype.initialize = function(name, pathId, currentPositionIndex, nextPositionIndex, exitPosition) {
	this.Container_initialize();
	var spriteSheet = new GL.SpriteSheet(Resource.getJSON(name));
	this.shipAnimation = new GL.BitmapAnimation(spriteSheet);
	this.shipAnimation.gotoAndPlay("run");
	this.HP = gameMain.cargoShipsInfo[name].HP;
	this.totalHP = gameMain.cargoShipsInfo[name].HP;
	this.height = 50;
	this.pathId = pathId;
	this.currentPositionIndex = currentPositionIndex;
	this.nextPositionIndex = nextPositionIndex;
	this.exitPosition = exitPosition;
	this.mapPathInfo = gameMain.mapPathInfo;
	this.currentPosition = this.mapPathInfo[pathId][currentPositionIndex];
	//this.x = this.currentPosition.x;
	//this.y = this.currentPosition.y;
	this.x = this.currentPosition.x * gameMain.cargoShipWidth + gameMain.cargoShipWidth / 2;
	this.y = this.currentPosition.y * gameMain.cargoShipWidth + gameMain.cargoShipWidth / 2;
	//this.speed = MathHelper.getRandomNumber(1, 2);
	this.speed = gameMain.cargoShipsInfo[name].Speed / 10;
	this.prePosition = {
		x: -1,
		y: -1
	};
	this.addChild(this.shipAnimation);
	GL.Ticker.addListener(this);
	this.headHPBar = new HeadHPBar(this, gameMain.cargoShipWidth, 2);
	this.addChild(this.headHPBar);

	this.fire = new Fire();
	var THIS = this;
	this.fire.onAnimationEnd = function () {
		THIS.fire.visible = false;
		this.currentAnimation = null;
	}
	this.addChild(this.fire);
};
CargoShip.prototype.tick = function () {
	if(this.HP <= 0) {
		var coin = new Coin();
		coin.x = this.x;
		coin.y = this.y;
		gameMain.playGroundContainer.addChild(coin);
		GL.Tween.get(coin).to({
			x: MapConfig.items.coin.x,
			y: MapConfig.items.coin.y
		}, 1000).call(function () {
			this.parent.removeChild(this);
		});

		var spriteSheet = new GL.SpriteSheet(Resource.getJSON("explode2"));
		var explodeAnimation = new GL.BitmapAnimation(spriteSheet);
		explodeAnimation.x = this.x;
		explodeAnimation.y = this.y;
		gameMain.playGroundContainer.addChild(explodeAnimation);

		explodeAnimation.gotoAndPlay("show");
		explodeAnimation.onAnimationEnd = function () {
			this.parent.removeChild(this);
		}
		this.getMoney();
	}

	if(this.nextPosition) {
		this.moveTo();
	} else {
		this.nextPosition = this.getNextPosition();
	}
};
CargoShip.prototype.showFire = function () {
	var THIS = this;
	if(this.fire.currentAnimation != "show") {
		THIS.fire.visible = true;
		this.fire.gotoAndPlay("show");
	}
};
CargoShip.prototype.moveTo = function () {
	//var targetPosition = new Vector2(this.nextPosition.x, this.nextPosition.y);
	var targetPosition = new Vector2(this.nextPosition.x * gameMain.cargoShipWidth + gameMain.cargoShipWidth / 2,
		this.nextPosition.y * gameMain.cargoShipWidth + gameMain.cargoShipWidth / 2);
	if(this.prePosition.x != this.nextPosition.x
		|| this.prePosition.y != this.nextPosition.y) {
		this.step = targetPosition.sub(new Vector2(this.x, this.y)).setLength(this.speed);
		this.setDirection();
		this.run();
		this.prePosition = {
			x: this.nextPosition.x,
			y: this.nextPosition.y
		};
	}
	this.x += this.step.x;
	this.y += this.step.y;
	//this.currentPosition = new Vector2(this.x, this.y);
	this.currentPosition = new Vector2(parseInt(this.x / gameMain.cargoShipWidth),
		parseInt(this.y / gameMain.cargoShipWidth));
	if(new Vector2(this.x, this.y).distanceToSquared(targetPosition) < 25
		|| this.step.x === 0 && this.step.y === 0) {
		if(this.currentPosition.x == this.exitPosition.x && this.currentPosition.y == this.exitPosition.y) {
			this.lostCargoShip();
		}
		this.currentPositionIndex = this.nextPositionIndex;
		this.nextPositionIndex++;
		this.nextPosition = null;
	}
};
CargoShip.prototype.getNextPosition = function () {
	var THIS = this;
	if(this.nextPositionIndex <= this.mapPathInfo[this.pathId].length) {
		return this.mapPathInfo[this.pathId][this.nextPositionIndex];
	}
	return null;
};
CargoShip.prototype.setDirection = function () {
	var stepX = this.nextPosition.x - this.currentPosition.x;
	if(stepX > 0)
		this.direction = 2;
	if(stepX < 0)
		this.direction = 4;
};
CargoShip.prototype.run = function () {
	var fn = this.getFrameName();
	this.shipAnimation.currentAnimation != "run" + fn
		&& this.shipAnimation.gotoAndPlay("run" + fn);
}
CargoShip.prototype.stand = function () {
	this.shipAnimation.currentAnimation != "stand" + this.getFrameName()
		&& this.shipAnimation.gotoAndPlay("stand" + this.getFrameName());
};
CargoShip.prototype.win = function () {
	this.shipAnimation.currentAnimation != "win"
		&& this.shipAnimation.gotoAndPlay("win");
};
CargoShip.prototype.getFrameName = function () {
	if(this.direction == 2)
		return "_h";
	if(this.direction == 4)
		return "";
};
CargoShip.prototype.attack = function () {
	this.shipAnimation.currentAnimation != "attack" + this.getFrameName()
		&& this.shipAnimation.gotoAndPlay("attack" + this.getFrameName());
};
CargoShip.prototype.getMoney = function() {
	gameMain.earnedMoney += 100;
	gameMain.money.text = gameMain.earnedMoney;
	this.removeCargoShipFromMap();
}
CargoShip.prototype.lostCargoShip = function() {
	gameMain.lostCargoShipNum++;
	var haveCargoShipNum = gameMain.needCargoShipNum - gameMain.lostCargoShipNum;
	if(haveCargoShipNum < 0)
		haveCargoShipNum = 0;
	gameMain.boat.text = haveCargoShipNum;
	if(haveCargoShipNum <= 0) {
		gameMain.lose();
	}
	this.removeCargoShipFromMap();
}
CargoShip.prototype.removeCargoShipFromMap = function () {
	gameMain.cargoShipArray.splice(gameMain.cargoShipArray.indexOf(this), 1);
	this.removeAllChildren();
	this.parent.removeChild(this);
	GL.Ticker.removeListener(this);
};
CargoShip.prototype.subHP = function (value) {
	this.HP -= value;
	if(this.HP < 0)
		this.HP = 0;
	this.headHPBar.setHP(this.HP);
	var subHPMeg = new GL.Text;
	
	if(value < 10)
		subHPMeg.regX = 17;
	if(value >= 10 && value < 100)
		subHPMeg.regX = 25;
	if(value >= 100)
		subHPMeg.regX = 35;
	
	subHPMeg.y = -this.height;
	subHPMeg.color = "red";
	subHPMeg.font = "bold 20pt Calibri ";
	subHPMeg.text = "-" + value;
	this.addChild(subHPMeg);
	GL.Tween.get(subHPMeg).to({
		alpha: .5,
		y: subHPMeg.y - gameMain.cargoShipWidth
	}, 1e3).call(function () {
		this.parent && this.parent.removeChild(this);
	});
};