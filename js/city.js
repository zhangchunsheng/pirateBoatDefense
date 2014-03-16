function City(cityId, lock) {
	this.initialize(cityId, lock);
}

City.prototype = new GL.Container();
City.prototype.Container_initialize = City.prototype.initialize;

City.prototype.initialize = function (cityId, lock) {
	this.Container_initialize();
	if(lock) {
		var round = Resource.getBitmap("city_h");
	} else {
		var round = Resource.getBitmap("city");
	}
	cityIdText = new GL.Text(cityId, "bold 20px Arial", "yellow");
	this.addChild(round, cityIdText);
	if(!lock) {
		this.onPress = function () {
			gameMain.popupViewer.addPopup(new LevelPopup(cityId));
			gameMain.viewPopups(function(callbackParams) {
				
			});
		}
	}
};

(function (window) {
	LevelPopup.prototype = new Popup();
	
	function LevelPopup(cityId) {
		var THIS = this;
		THIS.super_initialize = LevelPopup.prototype.initialize;
		THIS.initialize = function (cityId) {
			THIS.super_initialize();

			THIS.createBg("popupBase");
			//背景色
			var popupBase_bg = Resource.getBitmap("popupBase_bg");
			popupBase_bg.x = -(popupBase_bg.image.width / 2);
			popupBase_bg.y = -(popupBase_bg.image.height / 2) + 50;
			THIS.addChildAt(popupBase_bg, 0);
			//城市背景
			var cityPic = Resource.getBitmap("city" + cityId + "-pic");
			cityPic.x = -(cityPic.image.width / 2);
			cityPic.y = -(cityPic.image.height / 2) + 50;
			THIS.addChildAt(cityPic, 1);
			//关闭按钮
			THIS.createCloseButton(220, -90);
			this.xButton.onPress = function (e) {
				THIS.buttonClickHandler(e, this);
			};
			//选择区域背景
			var chooseLevel_bg = Resource.getBitmap("chooseLevel_bg");
			chooseLevel_bg.x = -(popupBase_bg.image.width / 2) - MapConfig.items.chooseLevel_bg.x;
			chooseLevel_bg.y = (popupBase_bg.image.height / 2) - chooseLevel_bg.image.height / 2 - MapConfig.items.chooseLevel_bg.y;
			THIS.addChild(chooseLevel_bg);
			//城市名称
			THIS.addTitle("city" + cityId + "-name", 0, popupBase_bg.image.width / 2 - chooseLevel_bg.image.height - MapConfig.items.cityName.height);
			
			//导航按钮
			var btn_turnpage = Resource.getBitmap("btn_turnpage");
			btn_turnpage.x = -(popupBase_bg.image.width / 2) + 10;
			btn_turnpage.y = (popupBase_bg.image.height / 2) - btn_turnpage.image.height / 2;
			THIS.addChild(btn_turnpage);
			var btn_turnpageRight = btn_turnpage.clone();
			btn_turnpageRight.rotation = 180;
			btn_turnpageRight.x = (popupBase_bg.image.width / 2) - 10;
			btn_turnpageRight.y = (popupBase_bg.image.height / 2) + btn_turnpage.image.height / 2;
			THIS.addChild(btn_turnpageRight);

			var levelId = cityId;
			var chooseLevel = Resource.getBitmap("chooseLevel");
			var map = Resource.getBitmap(levelId + "-960");
			map.scaleX = 0.2;
			map.scaleY = 0.2;
			var rect = new GL.Rectangle(0, 0, (chooseLevel.image.width - 20) / map.scaleX, (chooseLevel.image.height - 20) / map.scaleY);
			map.sourceRect = rect;
			chooseLevel.x = btn_turnpage.x + btn_turnpage.image.width + 20;
			chooseLevel.y = (popupBase_bg.image.height / 2) - chooseLevel.image.height / 2;
			map.x = chooseLevel.x + 10;
			map.y = chooseLevel.y + 10;
			THIS.addChild(chooseLevel, map);
			map.onPress = chooseLevel.onPress = function (e) {
				gameMain.executePanelChange(function () {
					gameMain.currentCity = levelId;
					gameMain.gameStart = true;
					gameMain.initToolBar();
					gameMain.loadCityMap(levelId);
					gameMain.gamePanel.visible = true;
					gameMain.worldMapContainer.visible = false;
				});
				THIS.closeMe();
			};
			THIS.showMe();
		}
		THIS.initialize(cityId);
	}
	window.LevelPopup = LevelPopup;
}(window));