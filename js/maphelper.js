var MapHelper = {};
MapHelper.getMapEntranceAndExit = function(mapID) {
	var entranceAndExitPoint = [];
	for(var entranceAndExitArray = MapHelper.getCurrentMap(mapID).entranceAndExit.split("*"), i = 0; i < entranceAndExitArray.length; i++) {
		for(var entranceAndExit = entranceAndExitArray[i].split("|"), j = 0; j < entranceAndExit[0].split(",").length; j++) {
			var entranceArray = entranceAndExit[0].split(",")[j].split("_");
			entranceAndExitPoint.push({
				enx: parseInt(entranceArray[0]),//entranceX
				eny: parseInt(entranceArray[1]),//entranceY
				ex: parseInt(entranceAndExit[1].split("_")[0]),//exitX
				ey: parseInt(entranceAndExit[1].split("_")[1])//exitY
			});
		}
	}
	return entranceAndExitPoint;
};

MapHelper.getMapPathInfo = function(currentMapInfo) {
	var mapPathInfo = [];
	var pathInfo = [];
	pathInfoArray = currentMapInfo.pathInfo;
	for(var i = 0 ; i < pathInfoArray.length ; i++) {
		mapPathInfo[i] = [];
		pathInfo = pathInfoArray[i].split(",");
		for(var j = 0 ; j < pathInfo.length ; j++) {
			mapPathInfo[i].push({
				x: Math.round(pathInfo[j].split("_")[0] / gameMain.cargoShipWidth),
				y: Math.round(pathInfo[j].split("_")[1] / gameMain.cargoShipWidth)
			});
		}
	}
	return mapPathInfo;
};

MapHelper.getCurrentMap = function(mapID) {
	var currentMap;
	_(MapConfig.Map).each(function(item) {
		if(item.ID == mapID) {
			currentMap = item;
		}
	});
	return currentMap;
};

MapHelper.getPirateBoatCoordinate = function(pirateBoatCoordinate) {
	var coordinates = pirateBoatCoordinate.split(",");
	var coordinateInfo = [];
	var coordinate = [];
	for(var i = 0 ; i < coordinates.length ; i++) {
		coordinate = coordinates[i].split("_");
		coordinateInfo.push({
			x: coordinate[0],
			y: coordinate[1]
		});
	}
	return coordinateInfo;
};