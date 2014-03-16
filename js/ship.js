function Ship(name, currentCell, exitCell) {
	this.initialize(name, currentCell, exitCell);
}
Ship.prototype = new GL.Container();
Ship.prototype.Container_initialize = Ship.prototype.initialize;
Ship.prototype.initialize = function(name, currentCell, exitCell) {
	this.Container_initialize();
	var spriteSheet = new GL.SpriteSheet(Resource.getJSON(name));
	//GL.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
	this.shipAnimation = new GL.BitmapAnimation(spriteSheet);
	this.shipAnimation.gotoAndPlay("run");
	this.HP = gameMain.cargoShipsInfo[name].HP;
	this.totalHP = gameMain.cargoShipsInfo[name].HP;
	this.height = gameMain.cargoShipWidth + 10;
	this.currentCell = currentCell;
	this.x = currentCell.x * gameMain.cargoShipWidth + gameMain.cargoShipWidth / 2;
	this.y = currentCell.y * gameMain.cargoShipWidth + gameMain.cargoShipWidth / 2;
	this.exitCell = exitCell;
	this.preTargetCell = {
		x: -1,
		y: -1
	};
	this.speed = gameMain.cargoShipsInfo[name].Speed / 10;
	this.addChild(this.shipAnimation);
	this.path = [];
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
Ship.prototype.tick = function () {
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
		this.destroy();
	}

	if(this.targetCell) {
		this.moveTo();
	} else {
		this.targetCell = this.getTargetCell();
	}
};
Ship.prototype.showFire = function () {
	var THIS = this;
	if(this.fire.currentAnimation != "show") {
		THIS.fire.visible = true;
		this.fire.gotoAndPlay("show");
	}
};
Ship.prototype.moveTo = function () {
	var targetPosition = new Vector2(this.targetCell.x * gameMain.cargoShipWidth + gameMain.cargoShipWidth / 2,
		this.targetCell.y * gameMain.cargoShipWidth + gameMain.cargoShipWidth / 2);
	if(this.preTargetCell.x != this.targetCell.x
		|| this.preTargetCell.y != this.targetCell.y) {
		this.step = targetPosition.sub(new Vector2(this.x, this.y)).setLength(this.speed);
		this.setDirection();
		this.run();
		this.preTargetCell = {
			x: this.targetCell.x,
			y: this.targetCell.y
		};
	}
	this.x += this.step.x;
	this.y += this.step.y;
	this.currentCell = new Vector2(parseInt(this.x / gameMain.cargoShipWidth),
		parseInt(this.y / gameMain.cargoShipWidth));
	if(new Vector2(this.x, this.y).distanceToSquared(targetPosition) < 25
		|| this.step.x === 0 && this.step.y === 0) {
		if(this.currentCell.x == this.exitCell.x && this.currentCell.y == this.exitCell.y) {
			this.destroy();
		}
		this.targetCell = null;
	}
};
Ship.prototype.getTargetCell = function () {
	var THIS = this;
	var roundCells = MathHelper.getCellSurround(this.currentCell);
	for(var i = 0; i < roundCells.length; i++) {
		if(gameMain.isCellInObstruction(roundCells[i].x, roundCells[i].y)) {
			roundCells.splice(i--, 1);
		}
	}
	for(var i = 0; i < roundCells.length; i++) {
		if(gameMain.hasPirateBoatInPosition(roundCells[i].x, roundCells[i].y)) {
			roundCells.splice(i--, 1);
		}
	}

	//var targetRoundCells = MathHelper.getCellSurround(this.exitCell);
	//for (var i = 0; i < targetRoundCells.length; i++) {
	//    if (gameMain.isCellInObstruction(targetRoundCells[i].x, targetRoundCells[i].y)) {
	//        targetRoundCells.splice(i--, 1);
	//    }
	//}

	var positionArray = [];
	for (var i = 0; i < roundCells.length; i++) {
		//if(targetRoundCells.length === 0) {
		//    positionArray.push({ position: roundCells[i], distanceSquared: this.target.currentCell.distanceToSquared(roundCells[i]) });
		//} else {
		//	var tempCell = MathHelper.randomItemFromArray(this.exitCell);
		positionArray.push({
			position: roundCells[i],
			distanceSquared: new Vector2(this.exitCell.x, this.exitCell.y).distanceToSquared(roundCells[i])
		});
		// }
	}
	if(positionArray.length > 0) {
		var nextPosition = _.chain(positionArray).sortBy(function(item) {
			return item.distanceSquared;
		}).first().value();
		if(nextPosition)
			return nextPosition.position;
	}
	return null;
};
Ship.prototype.setDirection = function () {
	var stepX = this.targetCell.x - this.currentCell.x;
	if(stepX > 0)
		this.direction = 2;
	if(stepX < 0)
		this.direction = 4;
};
Ship.prototype.run = function () {
	var fn = this.getFrameName();
	this.shipAnimation.currentAnimation != "run" + fn
		&& this.shipAnimation.gotoAndPlay("run" + fn);
}
Ship.prototype.stand = function () {
	this.shipAnimation.currentAnimation != "stand" + this.getFrameName()
		&& this.shipAnimation.gotoAndPlay("stand" + this.getFrameName());
};
Ship.prototype.win = function () {
	this.shipAnimation.currentAnimation != "win"
		&& this.shipAnimation.gotoAndPlay("win");
};
Ship.prototype.getFrameName = function () {
	if(this.direction == 2)
		return "_h";
	if(this.direction == 4)
		return "";
};
Ship.prototype.attack = function () {
	this.shipAnimation.currentAnimation != "attack" + this.getFrameName()
		&& this.shipAnimation.gotoAndPlay("attack" + this.getFrameName());
};
Ship.prototype.destroy = function () {
	gameMain.cargoShipArray.splice(gameMain.cargoShipArray.indexOf(this), 1);
	this.removeAllChildren();
	this.parent.removeChild(this);
	GL.Ticker.removeListener(this);
};
Ship.prototype.subHP = function (value) {
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