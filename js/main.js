var gameMain = {};
var util = new Util();
var GameVersion = 1.0;

function GameMain() {
	var THIS = this;
	THIS.canvas = {};
	THIS.stage = {};
	THIS.loader = {};
	THIS.manifest = [];
	THIS.fpsLabel = {};
	THIS.assetsXML = {};
	THIS.worldMapContainer = new GL.Container();
	THIS.mapContainer = new GL.Container();
	THIS.buildTargetContainer = new GL.Container();
	THIS.playGroundContainer = new Playground();
	THIS.buildAreaContainer = new GL.Container();
	THIS.blockContainer = new GL.Container();
	THIS.waveInfoContainer = new GL.Container();
	THIS.toolBarContainer = new GL.Container();
	THIS.cargoShipInfo = {};
	THIS.pirateBoatArray = [];
	THIS.cargoShipArray = [];
	THIS.gameStart = false;
	THIS.isInitLoad = true;
	THIS.popupViewer = new PopupViewer();
	THIS.gamePanel = new GL.Container();
	THIS.choosePirateBoat = ["pirateBoat1", "pirateBoat2", "pirateBoat3", "pirateBoat4", "pirateBoat5", "pirateBoat6", "pirateBoat7", "pirateBoat8"];
	THIS.currentChoosePirateBoat = null;
	THIS.hasMouseDown = false;
	THIS.startX = 0;
	THIS.startY = 0;
	THIS.pirateBoatCoordinate = [];
	THIS.pirateBoatWidth = MapConfig.items.pirateBoat.width;
	THIS.cargoShipWidth = MapConfig.items.cargoShip.width;
	THIS.hasSelectPirateBoat = false;
	THIS.selectPirateBoat = null;
	THIS.attackScopeShape = null;//显示船攻击范围
	THIS.getBuildPosition = null;
	THIS.hasPirateBoat = {};//已建造船的位置
	THIS.cargoShipsInfo = {};
	THIS.pirateBoatsInfo = {};
	THIS.hasShowAttackScope = false;
	THIS.worldMapId = 1;
	THIS.worldMapData = {};//地图数据
	THIS.currentWorldMapData = {};
	THIS.currentCity = BTG.GameData.getCurrentCity();
	THIS.currentLevel = BTG.GameData.getCurrentLevel();
	
	//分数
	THIS.lostCargoShipNum = 0;//已通过货船数
	THIS.needCargoShipNum = 20;//需要货船数量
	THIS.earnedMoney = 0;//获得金币数量
	
	THIS.init = function () {
		window.addEventListener('resize', THIS.resizeGame, false);
		THIS.gameArea = document.getElementById('gameArea');

		window.onBlur = function () {
			if(!THIS.pauseing && THIS.gameStart) {
				THIS.pauseGame();
			}
		};

		THIS.canvas = document.getElementById("gameCanvas");
		THIS.stage = new GL.Stage(THIS.canvas);
		THIS.resizeGame();

		GL.Touch.enable(THIS.stage);
		// enabled mouse over / out events
		THIS.stage.enableMouseOver(10);

		//加载资源文件
		THIS.initLoader();
		THIS.addToLoaderQueue("map", "ship", "other", "menu", "worldmap", "num");
		//加载世界地图数据
		THIS.getWorldMapData();
		THIS.currentWorldMapData = THIS.worldMapData["worldMap" + THIS.worldMapId];
		//加载船数据
		THIS.getCargoShipsInfo();
		THIS.getPirateBoatsInfo();

		THIS.stage.addChild(THIS.gamePanel);

		THIS.gamePanel.addChild(THIS.mapContainer, THIS.buildTargetContainer, THIS.playGroundContainer, THIS.buildAreaContainer, THIS.blockContainer, THIS.toolBarContainer);
		
		//Loading
		THIS.messageField = new GL.Text("Loading", "bold 24px Arial", "#FFFFFF");
		THIS.messageField.maxWidth = 1e3;
		THIS.messageField.textAlign = "center";
		THIS.messageField.x = THIS.canvas.width / 2 / THIS.stage.scaleX;
		THIS.messageField.y = THIS.canvas.height / 2 / THIS.stage.scaleY;
		THIS.stage.addChild(THIS.messageField);
		//FPS
		THIS.fpsLabel = new GL.Text("-- FPS", "bold 24px Arial", "#fff");
		THIS.fpsLabel.x = 840;
		THIS.fpsLabel.y = 20;
		THIS.fpsLabel.alpha = .8;
		THIS.stage.addChild(THIS.fpsLabel);

		var g = new GL.Graphics();
		g.setStrokeStyle(1);
		g.beginStroke(GL.Graphics.getRGB(0, 0, 0));
		g.beginFill(GL.Graphics.getRGB(0, 0, 0));
		g.drawRect(0, 0, util.pW(100), util.pH(100));
		THIS.blocker = new GL.Shape(g);
		THIS.blocker.alpha = 0;
		THIS.stage.addChild(THIS.blocker);
		GL.Ticker.setFPS(60);
		GL.Ticker.useRAF = true;
		GL.Ticker.addListener(THIS);
	};
	THIS.initLoader = function () {
		THIS.manifest.length = 0;
		THIS.loader = new GL.PreloadJS(false);
		THIS.loader.onComplete = THIS.handleComplete;
		THIS.loader.onFileLoad = THIS.handleFileLoaded;
		THIS.loader.onError = THIS.handleFileError;
	};

	//工具栏
	THIS.initToolBar = function initToolBar() {
		//左上工具栏
		var bg = new GL.Container();
		bg.x = MapConfig.items.toolBarBg.x;
		bg.y = MapConfig.items.toolBarBg.y;
		var bgImg = Resource.getBitmap("bg");
		bg.addChild(bgImg);
		
		//需要货船数量
		/*var boatImg = Resource.getBitmap("boat");
		boatImg.x = MapConfig.items.boatImg.x;
		boatImg.y = MapConfig.items.boatImg.y;*/
		THIS.boat = new GL.Text(THIS.needCargoShipNum, "bold 20px Arial", "red");
		THIS.boat.x = MapConfig.items.boat.x;
		THIS.boat.y = MapConfig.items.boat.y;

		//金币
		/*var moneyImg = Resource.getBitmap("money");
		moneyImg.x = MapConfig.items.moneyImg.x;
		moneyImg.y = MapConfig.items.moneyImg.y;*/
		THIS.money = new GL.Text(THIS.earnedMoney, "bold 20px Arial", "yellow");
		THIS.money.x = MapConfig.items.money.x;
		THIS.money.y = MapConfig.items.money.y;
		bg.addChild(THIS.boat, THIS.money);
		//技能
		var skillImg;
		for(var i = 0 ; i < 3 ; i++) {
			skillImg = Resource.getBitmap("skill");
			skillImg.x = MapConfig.items["skill" + (i + 1) + "Img"].x;
			skillImg.y = MapConfig.items["skill" + (i + 1) + "Img"].y;
			bg.addChild(skillImg);
		}
		THIS.toolBarContainer.addChild(bg);
		//怒气值
		numImgTile = Resource.getBitmap("num");
		numImgTile.x = MapConfig.items.numImgTile.x;
		numImgTile.y = MapConfig.items.numImgTile.y;
		numImgTile.scaleX = MapConfig.items.numImgTile.scaleX;
		THIS.toolBarContainer.addChild(numImgTile);
		/*var numImg;
		for(var i = 0 ; i < 136 ; i++) {
			numImg = numImgTile.clone();
			numImg.x = 165 + (i * 1);//numImg.x = 145 + (i * 1);
			numImg.y = 60;//numImg.y = 50;
			THIS.toolBarContainer.addChild(numImg);
		}*/

		//修理
		var hammerbg_box = new CanvasBtn(Resource.getBitmap("bg_box"));
		hammerbg_box.x = MapConfig.items.hammerbg_box.x;
		hammerbg_box.y = MapConfig.items.hammerbg_box.y;
		hammerbg_box.onPress = function () {
			
		};
		var hammerButton = Resource.getBitmap("hammer");
		hammerButton.x = MapConfig.items.hammerButton.x;
		hammerButton.y = MapConfig.items.hammerButton.y;
		hammerbg_box.addChild(hammerButton);
		//暂停
		var bg_box = new CanvasBtn(Resource.getBitmap("bg_box"));;
		bg_box.x = MapConfig.items.bg_box.x;
		bg_box.y = MapConfig.items.bg_box.y;
		bg_box.onPress = function () {
			THIS.pauseGame();
		};
		var pauseButton = Resource.getBitmap("pause");
		pauseButton.x = MapConfig.items.pauseButton.x;
		pauseButton.y = MapConfig.items.pauseButton.y;
		bg_box.addChild(pauseButton);
		THIS.toolBarContainer.addChild(hammerbg_box, bg_box);
		
		var playButton = new CanvasBtn(Resource.getBitmap("start"));
		playButton.x = MapConfig.items.playButton.x;
		playButton.y = MapConfig.items.playButton.y;
		playButton.onPress = function () {
			THIS.cargoShipGenerator.timer = THIS.cargoShipGenerator.intervalTime - 100;
		};
		THIS.toolBarContainer.addChild(playButton);
		
		THIS.toolBarContainer.addChild(THIS.waveInfoContainer);
		
		//选择工具栏
		THIS.choosePirate = new ChoosePirate();
		THIS.toolBarContainer.addChild(THIS.choosePirate);
	};

	THIS.pauseGame = function () {
		THIS.pauseing = true;
		// THIS.stage.update();
		THIS.blockContainer.removeAllChildren();
		THIS.blockContainer.visible = true;
		for(var i = 0; i < THIS.playGroundContainer.children.length; i++) {
			GL.Ticker.removeListener(THIS.playGroundContainer.children[i]);
		}
		GL.Ticker.removeListener(THIS.cargoShipGenerator);
		GL.Ticker.removeListener(THIS.playGroundContainer);
		THIS.popupViewer.addPopup(new PausePopup());
		THIS.viewPopups(THIS.viewPopupCallBack);
	};
	
	THIS.win = function () {
		THIS.pauseing = true;
		// THIS.stage.update();
		THIS.blockContainer.removeAllChildren();
		THIS.blockContainer.visible = true;
		for(var i = 0; i < THIS.playGroundContainer.children.length; i++) {
			GL.Ticker.removeListener(THIS.playGroundContainer.children[i]);
		}
		GL.Ticker.removeListener(THIS.cargoShipGenerator);
		GL.Ticker.removeListener(THIS.playGroundContainer);
		THIS.popupViewer.addPopup(new BTG.Popup("win"));
		THIS.viewPopups(THIS.viewPopupCallBack);
	};
	
	THIS.lose = function () {
		THIS.pauseing = true;
		// THIS.stage.update();
		THIS.blockContainer.removeAllChildren();
		THIS.blockContainer.visible = true;
		for(var i = 0; i < THIS.playGroundContainer.children.length; i++) {
			GL.Ticker.removeListener(THIS.playGroundContainer.children[i]);
		}
		GL.Ticker.removeListener(THIS.cargoShipGenerator);
		GL.Ticker.removeListener(THIS.playGroundContainer);
		THIS.popupViewer.addPopup(new BTG.Popup("lose"));
		THIS.viewPopups(THIS.viewPopupCallBack);
	};
	
	THIS.viewPopupCallBack = function(callbackParams) {
		if(callbackParams == "resume") {
			for(var i = 0; i < THIS.playGroundContainer.children.length; i++) {
				GL.Ticker.addListener(THIS.playGroundContainer.children[i]);
			}
			THIS.pauseing = false;
			GL.Ticker.addListener(THIS.cargoShipGenerator);
			GL.Ticker.addListener(THIS.playGroundContainer);
		} else if (callbackParams == "restart") {
			THIS.pauseing = false;
			THIS.loadCityMap(THIS.currentCity);
		} else if (callbackParams == "quit") {
			for(var i = 0; i < THIS.playGroundContainer.children.length; i++) {
				GL.Ticker.removeListener(THIS.playGroundContainer.children[i]);
			}
			THIS.pauseing = false;
			GL.Ticker.removeListener(THIS.cargoShipGenerator);
			GL.Ticker.removeListener(THIS.playGroundContainer);
			THIS.gotoLevelPanel();
		}
	}

	//加载数据
	THIS.addToLoaderQueue = function() {
		for (var l = arguments.length, i = 0; i < l; i++) {
			var currentNodeNames = arguments[i];
			for(var j = 0; j < AssetConfig[currentNodeNames].asset.length; j++) {
				THIS.manifest.push({
					src: "assets/" + currentNodeNames + "/" + AssetConfig[currentNodeNames].asset[j].url,
					id: AssetConfig[currentNodeNames].asset[j].id
				});
			}
			THIS.loader.loadManifest(THIS.manifest);
			THIS.manifest = [];
		}
	};
	
	THIS.initLevelData = function() {
		THIS.currentChoosePirateBoat = null;
		THIS.hasMouseDown = false;
		THIS.hasSelectPirateBoat = false;
		THIS.selectPirateBoat = null;
		THIS.attackScopeShape = null;
		THIS.getBuildPosition = null;
		THIS.hasPirateBoat = {};
		THIS.hasShowAttackScope = false;
		
		//分数
		THIS.lostCargoShipNum = 0;
		THIS.needCargoShipNum = 20;
		THIS.earnedMoney = 0;
		
		THIS.boat.text = THIS.needCargoShipNum;
		THIS.money.text = 0;
	}

	THIS.loadCityMap = function(mapId) {
		THIS.stage.onMouseDown = null;
		THIS.stage.onMouseMove = null;
		THIS.stage.onMouseUp = null;
		THIS.initLevelData();
		
		THIS.currentMapInfo = MapHelper.getCurrentMap(THIS.currentCity);
		if(THIS.pirateBoatCoordinate.length == 0)
			THIS.pirateBoatCoordinate = MapHelper.getPirateBoatCoordinate(THIS.currentMapInfo.PirateBoatCoordinate);
		THIS.pirateBoatArray.length = 0;
		THIS.cargoShipArray.length = 0;
		THIS.playGroundContainer.removeAllChildren();
		THIS.buildAreaContainer.removeAllChildren();
		GL.Ticker.addListener(THIS.playGroundContainer);
		//var map = Resource.getBitmap("map" + mapId);
		var map = Resource.getBitmap(mapId + "-960");
		THIS.mapContainer.addChild(map);
		
		THIS.buildArea = [];
		for(var i = 0 ; i < THIS.pirateBoatCoordinate.length ; i++) {
			THIS.buildArea.push(Math.round(THIS.pirateBoatCoordinate[i].x / THIS.pirateBoatWidth) + "_" + Math.round(THIS.pirateBoatCoordinate[i].y / THIS.pirateBoatWidth));
		}
		
		//THIS.initBuildTarget();
		//THIS.getRect();
		THIS.cargoShipGenerator = new CargoShipGenerator(mapId);
	}

	THIS.handleComplete = function () {
		THIS.messageField.visible = false;
		THIS.worldMapContainer = new WorldMap();
		THIS.stage.addChild(THIS.worldMapContainer);
	};
	
	THIS.handleFileError = function (e) {
		Resource.addRes(e.id, SpriteConfig[e.id.replace("JSON", "")]);
		THIS.messageField.text = "Loading " + (THIS.loader.progress * 100 | 0) + "%";
	};

	THIS.getCargoShipInfoByID = function (id) {
		if(THIS.cargoShipInfo[id])
			return THIS.cargoShipInfo[id];
		_(MapConfig.CargoShips).each(function(item) {
			if(item.ID == id) {
				THIS.cargoShipInfo[id] = item;
			}
		});
		return THIS.cargoShipInfo[id];
	};
	THIS.getCargoShipsInfo = function() {
		var id = 1;
		_(MapConfig.CargoShips).each(function(item) {
			id = "cargoShip" + item.ID;
			THIS.cargoShipsInfo[id] = item;
		});
		return THIS.cargoShipsInfo;
	};
	THIS.getPirateBoatsInfo = function() {
		var id = 1;
		_(MapConfig.PirateBoats).each(function(item) {
			id = "pirateBoat" + item.ID;
			THIS.pirateBoatsInfo[id] = item;
		});
		return THIS.pirateBoatsInfo;
	};
	THIS.getWorldMapData = function() {
		var id = 1;
		_(MapConfig.WorldMap).each(function(item) {
			id = "worldMap" + item.ID;
			THIS.worldMapData[id] = item;
		});
		return THIS.worldMapData;
	}
	THIS.handleFileLoaded = function (event) {
		event.type !== "sound" && Resource.addRes(event.id, event.result);
		THIS.messageField.text = "Loading " + (THIS.loader.progress * 100 | 0) + "%";
	};
	THIS.initBuildTarget = function () {
		THIS.buildTargetContainer.alpha = 0;
		THIS.buildTargetContainer.removeAllChildren();
		var shape = null;
		for (var i = 0; i < THIS.buildArea.length; i++) {
			shape = new GL.Shape();
			shape.regX = shape.regY = THIS.pirateBoatWidth / 2;
			shape.graphics.setStrokeStyle(1).beginStroke("white").drawRoundRect(THIS.buildArea[i].split("_")[0] * THIS.pirateBoatWidth + THIS.pirateBoatWidth / 2, THIS.buildArea[i].split("_")[1] * THIS.pirateBoatWidth + THIS.pirateBoatWidth / 2, THIS.pirateBoatWidth, THIS.pirateBoatWidth, 10);
			THIS.buildTargetContainer.addChild(shape);
		}
	};
	THIS.getRect = function() {
		THIS.buildTargetContainer.alpha = 1;
		THIS.buildTargetContainer.removeAllChildren();
		var width = 960;
		var height = 640;
		var horizontalLength = Math.round(width / THIS.cargoShipWidth);
		var verticalLength = Math.round(height / THIS.cargoShipWidth);
		var x = 0;
		var y = 0;
		var shape = null;
		for(var i = 0 ; i < horizontalLength; i++) {
			x = Math.round(i * THIS.cargoShipWidth / THIS.cargoShipWidth);
			for(var j = 0 ; j < verticalLength ; j++) {
				y = Math.round(j * THIS.cargoShipWidth / THIS.cargoShipWidth);
				shape = new GL.Shape();
				shape.regX = shape.regY = THIS.cargoShipWidth / 2;
				shape.graphics.setStrokeStyle(1).beginStroke("white").drawRoundRect(x * THIS.cargoShipWidth + THIS.cargoShipWidth / 2, y * THIS.cargoShipWidth + THIS.cargoShipWidth / 2, THIS.cargoShipWidth, THIS.cargoShipWidth, 10);
				THIS.buildTargetContainer.addChild(shape);
			}
		}
	}
	THIS.hiddenBuildTarget = function () {
		THIS.buildTargetContainer.removeAllChildren()
	};
	THIS.showBuildTarget = function () {
		THIS.buildTargetContainer.alpha === 0 && GL.Tween.get(THIS.buildTargetContainer).to({
			alpha: 1
		}, 500).wait(1e3).to({
			alpha: 0
		}, 500);
	};
	THIS.showWin = function () {
		GL.Tween.get(THIS.winPP).to({
			scaleX: 1,
			scaleY: 1
		},
		600, GL.Ease.backOut);
	};
	THIS.showLose = function () {
		GL.Tween.get(THIS.losePP).to({
			scaleX: 1,
			scaleY: 1
		},
		600, GL.Ease.backOut);
	};

	THIS.viewPopups = function(viewPopupsCallback) {
		if(THIS.popupViewer.hasPopups()) {
			THIS.changeState(util.POPUP);
			THIS.stage.addChild(THIS.popupViewer);
			THIS.popupViewer.startViewing(viewPopupsCallback);
		} else if (viewPopupsCallback) {
			viewPopupsCallback();
		}
	};

	THIS.endPopupView = function(viewPopupsCallback, callbackParams) {
		THIS.changeState(THIS.prevState);
		THIS.stage.removeChild(THIS.popupViewer);
		if(viewPopupsCallback)
			viewPopupsCallback(callbackParams);
	};

	THIS.tick = function () {
		THIS.fpsLabel.text = Math.round(GL.Ticker.getMeasuredFPS()) + " FPS";
		THIS.stage.addChild(gameMain.fpsLabel);
		THIS.stage.update();
	};

	THIS.isCellInObstruction = function (x, y) {
		return _.include(THIS.obstruction, x + "_" + y);
	};
	THIS.hasPirateBoatInPosition = function (x, y) {
		for(var i = 0; i < THIS.pirateBoatArray.length; i++) {
			if(THIS.pirateBoatArray[i].currentPosition.x == x && THIS.pirateBoatArray[i].currentPosition.y == y) {
				return true;
			}
		}
		return false;
	};

	THIS.executePanelChange = function (callback) {
		THIS.stage.addChild(THIS.blocker);
		GL.Tween.get(THIS.blocker).to({
			alpha: 1
		}, 500).call(function () {
			if(callback)
				callback();
		}).to({
			alpha: 0
		}, 500);
	};

	THIS.changeState = function (newState) {
		var stateHasChanged;
		if (THIS.curState != newState) {
			THIS.prevState = THIS.curState;
			THIS.curState = newState;
			stateHasChanged = true;
			THIS.handleStateChange();
		} else {
			stateHasChanged = false;
		}
		return stateHasChanged;
	};

	THIS.handleStateChange = function () {
		THIS.curContent = null;
		var toFPS = util.GENERAL_FPS;
		switch (THIS.curState) {
			case util.LOBBY:
				var toFPS = util.LOBBY_FPS;
				THIS.topBar.show();
				THIS.enableOverEvents(true)
				THIS.curContent = "lobby";
				break;
			case util.WORLD:
				THIS.topBar.show();
				THIS.enableOverEvents(true)
				THIS.curContent = "worldScreen";
				break;
			case util.GAME:
				if(THIS.prevState == util.WORLD) {
					THIS.removeWorldScreen();
					THIS.gameRound = new GameRound(util.currentWorld, util.getUnlockedArray(util.currentWorld), util.getUserWorldById(util.currentWorld).allTime);
					THIS.contentLayer.addChild(THIS.gameRound);
				}
				THIS.topBar.hide();
				THIS.muteButton.hide();
				THIS.enableOverEvents(false)
				THIS.curContent = "gameRound";
				break;
			case util.POPUP:
				if(THIS.topBar)
					THIS.topBar.show();
				THIS.enableOverEvents(true)
				THIS.curContent = "popupViewer";
				break;
		}
		//Ticker.setFPS(toFPS);
	};

	THIS.enableOverEvents = function (isEnabled) {
		if(!GL.Touch.isSupported()) {
			if(isEnabled)
				THIS.stage.enableMouseOver(50);
			else
				THIS.stage.enableMouseOver(0);
		}
	};

	THIS.showLoading = function () {
		if(THIS.initLoadingDone) {
			if(!THIS.loading) {
				THIS.loading = new Loading();
				THIS.stage.addChild(THIS.loading);
			}
		} else {
			THIS.loading = new InitLoadingScreen();
			THIS.stage.addChild(THIS.loading);
		}
	};

	THIS.hideLoading = function () {
		if(THIS.loading) {
			THIS.loading.fadeOut();
			Tween.get(THIS).wait(250).call(THIS.killLoading);
		}
	};

	THIS.killLoading = function () {
		if(THIS.loading) {
			THIS.stage.removeChild(THIS.loading);
			THIS.loading = null;
		}
	};

	THIS.gotoShop = function () {
		THIS.addShopPopup();
		THIS.viewPopups(null);
	};

	THIS.addShopPopup = function () {
		// check if on FB
		if(isOnFacebook)
			THIS.popupViewer.addPopup(new BuyPopup());
		else
			THIS.popupViewer.addPopup(new BuyOnFacebookPopup("true"));
	};

	THIS.gotoLevelPanel = function () {
		THIS.gameStart = false;
		THIS.executePanelChange(function () {
			THIS.gamePanel.visible = false;
			THIS.worldMapContainer.visible = true;
			THIS.stage.onMouseDown = WorldMap.onMouseDown;
			THIS.stage.onMouseMove = WorldMap.onMouseMove;
			THIS.stage.onMouseUp = WorldMap.onMouseUp;
		});
	};

	THIS.resizeGame = function () {
		var widthToHeight = 96 / 64;
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;
		var newWidthToHeight = newWidth / newHeight;

		if(newWidthToHeight > widthToHeight) {
			newWidth = newHeight * widthToHeight;
		} else {
			newHeight = newWidth / widthToHeight;
		}

		if(newWidth > 960 || newHeight > 640) {
			newWidth = 960;
			newHeight = 640;
		}
		THIS.gameArea.style.width = newWidth + 'px';
		THIS.gameArea.style.height = newHeight + 'px';

		THIS.gameArea.style.marginTop = (-newHeight / 2) + 'px';
		THIS.gameArea.style.marginLeft = (-newWidth / 2) + 'px';

		var scaleTo;
		if(!THIS.isInitLoad) {
			scaleTo = newWidth / THIS.canvas.width;
			THIS.stage.scaleX = THIS.stage.scaleX * scaleTo;
			THIS.stage.scaleY = THIS.stage.scaleY * scaleTo;
		} else {
			scaleTo = newWidth / 960;
			THIS.stage.scaleX = THIS.stage.scaleX * scaleTo;
			THIS.stage.scaleY = THIS.stage.scaleY * scaleTo;
			THIS.isInitLoad = false;
		}
		THIS.canvas.width = newWidth;
		THIS.canvas.height = newHeight;

		if(THIS.initWidth == 0) {
			THIS.initWidth = THIS.canvas.width;
			THIS.initHeight = THIS.canvas.height;
		}
	};
}
gameMain = new GameMain();
gameMain.init();