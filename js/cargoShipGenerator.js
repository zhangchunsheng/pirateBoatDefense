function CargoShipGenerator(mapID) {
	this.initialize(mapID);
}
CargoShipGenerator.prototype.initialize = function(mapID) {
	this.mapID = mapID;
	this.timer = 0;
	this.intervalTime = gameMain.currentMapInfo.Wave[0].CDTime;
	//this.mapEntranceAndExit = MapHelper.getMapEntranceAndExit(mapID);
	gameMain.mapPathInfo = MapHelper.getMapPathInfo(gameMain.currentMapInfo);
	this.enabled = false;
	this.currentMap = gameMain.currentMapInfo;
	this.currentWave = 1;
	this.waveTotal = this.currentMap.Wave.length;
	this.subWave = 1;
	this.updateWave();
	GL.Ticker.addListener(this);
};
CargoShipGenerator.prototype.tick = function () {
	if(!this.enabled) {
		this.timer += 30;
		if(this.timer > this.intervalTime) {
			this.timer = 0;
			this.enabled = true;
		}
	}
	if(gameMain.gameStart && this.enabled) {
		this.enabled = false;
		var currentWaveShipsId = this.getShipsIdByCurrentWave();
		this.subWave++;

		if(currentWaveShipsId) {
			for(var i = 0; i < currentWaveShipsId.length; i++) {
				/*var mapEntranceAndExit = MathHelper.randomItemFromArray(this.mapEntranceAndExit);
				var cargoShip = new Ship("cargoShip" + currentWaveShipsId[i], {
					x: mapEntranceAndExit.enx,
					y: mapEntranceAndExit.eny
				}, {
					x: mapEntranceAndExit.ex,
					y: mapEntranceAndExit.ey
				});*/
				var pathId = MathHelper.getRandomNumber(0, gameMain.mapPathInfo.length - 1);
				var exitPosition = gameMain.mapPathInfo[pathId][gameMain.mapPathInfo[pathId].length - 1];
				var cargoShip = new CargoShip("cargoShip" + currentWaveShipsId[i], pathId, 0, 1, exitPosition);
				gameMain.playGroundContainer.addChild(cargoShip);
				gameMain.cargoShipArray.push(cargoShip);
			}
		}

		if(gameMain.cargoShipArray.length == 0 && this.currentWave == this.waveTotal) {
			//成功
			gameMain.win();
			GL.Ticker.removeListener(this);
		}
	}
};

CargoShipGenerator.prototype.getShipsIdByCurrentWave = function () {
	var THIS = this,
		currentWaveShipsId;
	_(this.currentMap.Wave).each(function(item) {
		if(item.ID == THIS.currentWave) {
			var subWave = item.CargoShips.split("_")[THIS.subWave - 1];
			if(subWave) {
				currentWaveShipsId = item.CargoShips.split("_")[THIS.subWave - 1].split(",")
			} else {
				if (gameMain.cargoShipArray.length == 0 && THIS.currentWave < THIS.waveTotal) {
					THIS.subWave = 1;
					THIS.timer = 0;
					THIS.intervalTime = gameMain.currentMapInfo.Wave[THIS.currentWave].CDTime;
					THIS.enabled = false;
					THIS.currentWave++;
					THIS.updateWave();
					new GL.Tween().wait(4000).call(function () {
						THIS.getShipsIdByCurrentWave();
					});
				}
			}
		}
	});
	return currentWaveShipsId;
}

//updateWave
CargoShipGenerator.prototype.updateWave = function () {
	gameMain.waveInfoContainer.removeAllChildren();
	if(parseInt(this.currentWave) > 9) {
		var round_tenunit = Resource.getBitmap("round_" + parseInt(this.currentWave / 10).toString());
		round_tenunit.x = MapConfig.items.round_tenunit1.x;
		round_tenunit.y = MapConfig.items.round_tenunit1.y;
		var round = Resource.getBitmap("round_" + parseInt(this.currentWave % 10).toString());
		round.x = MapConfig.items.round1.x;
		round.y = MapConfig.items.round1.y;
		gameMain.waveInfoContainer.addChild(round_tenunit, round);
	} else {
		var round = Resource.getBitmap("round_" + this.currentWave);
		round.x = MapConfig.items.round1.x;
		round.y = MapConfig.items.round1.y;
		gameMain.waveInfoContainer.addChild(round);
	}
	
	if(parseInt(this.waveTotal) > 9) {
		var round_tenunit = Resource.getBitmap("round_" + parseInt(this.waveTotal / 10).toString());
		round_tenunit.x = MapConfig.items.round_tenunit2.x;
		round_tenunit.y = MapConfig.items.round_tenunit2.y;
		var round = Resource.getBitmap("round_" + parseInt(this.waveTotal % 10).toString());
		round.x = MapConfig.items.round_tenunit2.x;
		round.y = MapConfig.items.round_tenunit2.y;
		gameMain.waveInfoContainer.addChild(round_tenunit, round);
	} else {
		var round = Resource.getBitmap("round_" + this.waveTotal);
		round.x = MapConfig.items.round2.x;
		round.y = MapConfig.items.round2.y;
		gameMain.waveInfoContainer.addChild(round);
	}
	var round_split = Resource.getBitmap("round_-");
	round_split.x = MapConfig.items.round_split.x;
	round_split.y = MapConfig.items.round_split.y;
	gameMain.waveInfoContainer.addChild(round_split);
}