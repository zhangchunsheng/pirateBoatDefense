/**
 * 胜利或再来一次提示
 * 作者：张春生
 * 日期：2012-12-02
 */
BTG = BTG || {};
(function (BTG) {
	BTG.Popup = function(type) {
		var THIS = this;
		THIS.super_initialize = BTG.Popup.prototype.initialize;
		THIS.initialize = function (type) {
			THIS.super_initialize();

			THIS.createBg("popupBase1");
			if(type == "win") {
				//标题
				THIS.addTitle("win", MapConfig.items.win.x, MapConfig.items.win.y);
				//分数
				var score = Resource.getBitmap("scoreNum");
				score.x = -this.titleBitMap.image.width / 2;
				score.y = 0;
				var scoreNum = new GL.Text(100, "bold 26px Arial", "grey");
				scoreNum.x = 0;
				scoreNum.y = 10;
				//印章
				var badge = Resource.getBitmap("badge");
				badge.x = this.titleBitMap.image.width / 2;
				badge.y = -score.image.height / 2;
				THIS.addChild(score, scoreNum, badge);
			} else if(type == "lose") {
				//标题
				THIS.addTitle("lose", MapConfig.items.lose.x, MapConfig.items.lose.y);
			}
			//分数
			var scoreImg = Resource.getBitmap("score");
			var score_hImg = Resource.getBitmap("score_h");
			var _scoreImg;
			var _score_hImg;
			var showArray = [1,1,0];
			var positions = [-scoreImg.image.width, 0, scoreImg.image.width];
			var y = score.y + this.titleBitMap.image.height / 2 + 20;
			for(var i = 0 ; i < showArray.length ; i++) {
				if(showArray[i] == 1) {
					_scoreImg = scoreImg.clone();
					_scoreImg.x = positions[i] - scoreImg.image.width / 2;
					_scoreImg.y = y;
					THIS.addChild(_scoreImg);
				} else {
					_score_hImg = score_hImg.clone();
					_score_hImg.x = positions[i] - scoreImg.image.width / 2;
					_score_hImg.y = y;
					THIS.addChild(_score_hImg);
				}
			}
			var popupBtn1_bg = Resource.getBitmap("popupBtn1_bg");
			var btnArray = [];
			positions = [];
			var margin = 10;
			y += scoreImg.image.height + margin;
			if(type == "win") {
				btnArray = [
					"pauseExitButton",//返回菜单
					"pauseRestartButton",//重新开始
					"pausePlayButton"//继续游戏
				];
				positions = [-popupBtn1_bg.image.width - margin, 0, popupBtn1_bg.image.width + margin];
			} else if(type == "lose") {
				btnArray = [
					"pauseExitButton",//返回菜单
					"pauseRestartButton"//重新开始
				];
				positions = [-popupBtn1_bg.image.width - margin, popupBtn1_bg.image.width + margin];
			}
			var callbackParamsObject = {
				"pauseExitButton": "quit",
				"pauseRestartButton": "restart",
				"pausePlayButton": "resume"
			};
			var popupBtn;
			for(var i = 0 ; i < btnArray.length ; i++) {
				popupBtn = popupBtn1_bg.clone();
				popupBtn.x = positions[i] - popupBtn1_bg.image.width / 2;
				popupBtn.y = y;
				THIS.addChild(popupBtn);
				
				THIS.button[i] = util.makeGeneralButton(btnArray[i]);
				util.addChildAtPos(THIS, THIS.button[i], popupBtn.x + popupBtn1_bg.image.width / 2, y + popupBtn1_bg.image.height / 2);
				(function(i) {
					THIS.button[i].onPress = function(e) {
						THIS.parent.callbackParams = callbackParamsObject[btnArray[i]];
						THIS.closeMe();
					}
				})(i);
				THIS.allButtons.push(THIS.button[i]);
			}
			THIS.showMe();
		}
		THIS.initialize(type);
	}
	BTG.Popup.prototype = new Popup();
}(BTG));