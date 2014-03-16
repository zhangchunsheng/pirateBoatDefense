(function(window) {
	PausePopup.prototype = new Popup();
	
	function PausePopup() {
		var THIS = this;
		THIS.super_initialize = PausePopup.prototype.initialize; //unique to avoid overiding base class
		
		//public properties:
		THIS.returnToGameButton = null;
		THIS.exitButton = null;
		THIS.restartButton = null;
		THIS.soundButton = null;

		//constructor:
		THIS.initialize = function () {
			THIS.super_initialize();

			THIS.createBg("popupBase1");
			
			var x = MapConfig.items.popupBtn_bg.x;
			var y = MapConfig.items.popupBtn_bg.y;
			var popupBtn_bgArray = [
				["popupBtn_bg","popupBtn_bg"],
				["popupBtn_bg","popupBtn_bg"]
			];
			var margin = 10;
			var positions = [];
			var popupBtn_bg = Resource.getBitmap("popupBtn_bg");
			var _popupBtn_bg = {};
			for(var i = 0 ; i < popupBtn_bgArray.length ; i++) {
				x = MapConfig.items.popupBtn_bg.x;
				positions[i] = [];
				for(var j = 0 ; j < popupBtn_bgArray[i].length ; j++) {
					_popupBtn_bg = popupBtn_bg.clone();
					_popupBtn_bg.x = x;
					_popupBtn_bg.y = y;
					THIS.addChild(_popupBtn_bg);
					x += popupBtn_bg.image.width + margin;
					positions[i][j] = {};
					positions[i][j].x = x;
					positions[i][j].y = y;
				}
				y += popupBtn_bg.image.height + margin;
			}

			//继续游戏
			THIS.returnToGameButton = util.makeGeneralButton("pausePlayButton");
			util.addChildAtPos(THIS, THIS.returnToGameButton, positions[0][0].x - popupBtn_bg.image.width / 2 - 10, positions[0][0].y + popupBtn_bg.image.height / 2);
			THIS.returnToGameButton.onPress = function (e) {
				THIS.parent.callbackParams = "resume";
				THIS.closeMe();
			};
			THIS.allButtons.push(THIS.returnToGameButton);
			
			//游戏攻略
			THIS.strategyButton = util.makeGeneralButton("strategy");
			util.addChildAtPos(THIS, THIS.strategyButton, positions[0][1].x - popupBtn_bg.image.width / 2 - 10, positions[0][1].y + popupBtn_bg.image.height / 2);
			THIS.strategyButton.onPress = function (e) {
				
			};
			THIS.allButtons.push(THIS.strategyButton);
			
			//返回菜单
			THIS.exitButton = util.makeGeneralButton("pauseExitButton");
			util.addChildAtPos(THIS, THIS.exitButton, positions[1][0].x - popupBtn_bg.image.width / 2 - 10, positions[1][0].y + popupBtn_bg.image.height / 2);
			THIS.exitButton.onPress = function (e) {
				THIS.parent.callbackParams = "quit";
				THIS.closeMe();
			};
			THIS.allButtons.push(THIS.exitButton);

			//重新开始
			THIS.restartButton = util.makeGeneralButton("pauseRestartButton", true);
			//if no energy disable restart (maybe add notice?)
			//if (Number(util.userData.tokens) < util.getWorldTokensPrice(util.currentWorld)) {
			//    THIS.restartButton.setEnabled(false);
			//}
			util.addChildAtPos(THIS, THIS.restartButton, positions[1][1].x - popupBtn_bg.image.width / 2 - 10, positions[1][1].y + popupBtn_bg.image.height / 2);
			THIS.restartButton.onPress = function (e) {
				THIS.parent.callbackParams = "restart";
				THIS.closeMe();
			};
			THIS.allButtons.push(THIS.restartButton);

			if(GL.SoundJS.activePlugin) {
				THIS.updateSoundButton();
			}

			THIS.showMe();
		}

		THIS.updateSoundButton = function () {
			if(THIS.soundButton) {
				THIS.removeChild(THIS.soundButton);
				THIS.soundButton = null;
			}
			var btnContainer = new Container();
			var btnContent;
			var muteBg = Resource.getBitmap("pauseMuteBg", true);
			btnContainer.addChild(muteBg);
			if (util.isSoundOn) {
				btnContent = Resource.getBitmap("pauseMute", true);
			} else {
				btnContent = Resource.getBitmap("pauseUnmute", true);
			}
			btnContainer.addChild(btnContent);
			var overDown = btnContainer.clone(true);
			overDown.scaleX = overDown.scaleY = 1.07;
			THIS.soundButton = new MGButton(null, btnContainer, overDown);
			util.addChildAtPos(THIS, THIS.soundButton, -315, -183);
			THIS.soundButton.onPress = function (e) {
				$(document).trigger(util.MUTE_BUTTON_CLICKED);
				THIS.updateSoundButton();
			}
		}

		// public methods:
		THIS.initialize();
	}
	window.PausePopup = PausePopup;
}(window));