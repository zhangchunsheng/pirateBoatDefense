function Util() {
	var THIS = this;
	THIS.TOKENS_CAP = null;
	THIS.INVITE_TOKENS_PRIZE = null;
	THIS.TOKENS_PER_CLAIM = null;
	THIS.CLAIM_TIME = null;
	THIS.LEVEL_UP_TOKENS_PRIZE = null;
	THIS.LEVEL_PRIZE_MULTI = null;
	THIS.GIFT_TOKENS = null;

	THIS.QUEUE_TWEEN_TIME = null; //time the main queue moves 
	THIS.WRONG_TIME = null; //hold time when wrong match
	THIS.MATCH_TWEEN_TIME = null;

	//scores:
	THIS.MAX_ROUND_XP = null;
	THIS.MIN_ROUND_XP = null;
	THIS.FIRST_LEVEL_XP = null
	THIS.NEXT_LEVEL_XP_MULTI = null;
	//THIS.COMBO_SCORE_MULTIPLIER = 10;
	THIS.LIVES_SCORE_BONUS = null;
	THIS.TIME_SCORE_MAX_BOUNS = null;
	THIS.MAX_BONUS_TIME_LEFT_PERCENT = null; //the timeLeft out of totalTime percent needed to get the max time bonus.
	//comboCircle:
	THIS.COMBO_STREAK_KILL_TIME = null; // when to reset combo streak when playing slow
	THIS.COMBO_STREAK_WARN_TIME = null;
	THIS.COMBO_MIN_SPEED_MATCH = null; // when a mathc is faster than this warningCounter is reset.
	THIS.COMBO_CIRCLE_TIME = null; //time circle goes down by multiplier level 
	THIS.COMBO_CIRCLE_MATCHES = null; //matches to go to next multiplier 
	THIS.COMBO_MAX_MULTI = null; // maximum multiplier
	THIS.COMBO_CIRCLE_RELAXED_TIME = null; //rest after multiplier changes

	THIS.EXP_BAR_TWEEN_TIME = null;

	THIS.CLOCK_POWERUP_BONUS = null; // added secs for clock power-up

	THIS.BASE_MATCH_SCORE = null; // base score per match

	THIS.lobbyWorldsOrder = null;

	THIS.GENERAL_FPS = null;
	THIS.TOUCH_FPS = null;

	THIS.MAX_NAME_LENGTH = null; //for highscore lists

	THIS.ICONS_PER_WORLD = null;

	//Main:
	THIS.GOTO_LOBBY = "EVT_GOTO_LOBBY";
	THIS.GOTO_ACHIEVEMENTS = "EVT_GOTO_ACHIEVEMENTS";
	THIS.GOTO_INVITE = "EVT_GOTO_INVITE";
	THIS.GOTO_SHOP = "EVT_GOTO_SHOP";
	THIS.GOTO_WORLD = "EVT_GOTO_WORLD";
	THIS.VIEW_POPUPS = "EVT_VIEW_POPUPS";
	THIS.GOTO_GAME = "EVT_GOTO_GAME";
	THIS.GOTO_LOGIN = "EVT_GOTO_LOGIN";
	THIS.GOTO_INVITES = "EVT_GOTO_INVITES";
	THIS.SAVE_INVITES = "EVT_SAVE_INVITES";
	THIS.LOADING_START = "EVT_LOADING_START";
	THIS.LOADING_COMPLETE = "EVT_LOADING_COMPLETE";
	THIS.UPDATE_XP_BAR = "EVT_UPDATE_XP_BAR";
	THIS.PRODUCT_BOUGHT = "EVT_PRODUCT_BOUGHT";
	THIS.PRODUCT_NOT_BOUGHT = "EVT_PRODUCT_NOT_BOUGHT";
	THIS.CLAIM = "EVT_CLAIM";
	THIS.UPDATE_ROUND_DATA = "EVT_UPDATE_ROUND_DATA";
	THIS.GOTO_SEND_GIFTS = "EVT_GOTO_SEND_GIFTS";
	THIS.GOTO_RECEIVE_GIFTS = "EVT_GOTO_RECEIVE_GIFTS";
	THIS.SAVE_GIFTS = "EVT_SAVE_GIFTS";
	THIS.CLAIM_GIFT = "EVT_CLAIM_GIFT";
	THIS.PLAY_SOUND = "EVT_PLAY_SOUND";
	THIS.MUTE_BUTTON_CLICKED = "EVT_MUTE_BUTTON_CLICKED";
	THIS.GOTO_FB_SHOP = "EVT_GOTO_FB_SHOP";
	THIS.GET_GLOBAL_ALL_TIME = "EVT_GET_GLOBAL_ALL_TIME";
	THIS.GET_GLOBAL_WEEKLY = "EVT_GET_GLOBAL_WEEKLY";
	THIS.GET_GLOBAL_WEEKLY = "EVT_GET_GLOBAL_WEEKLY";
	THIS.BUY_WORLD = "EVT_BUY_WORLD";

	//GameRound:
	THIS.GAME_ROUND = "GAME_ROUND";
	THIS.KILL_SCORE_CLIP = THIS.GAME_ROUND + ".KILL_SCORE_CLIP";
	THIS.FRIENDS_BEATEN = THIS.GAME_ROUND + ".FRIEND_BEATEN";
	THIS.COMBO_MULTI_CHANGE = THIS.GAME_ROUND + ".COMBO_MULTI_CHANGE";
	//Lobby:
	THIS.LOBBY_EVT = "LOBBY_EVT";
	THIS.CLOSE_GLOBAL_SCORES = THIS.LOBBY_EVT + ".CLOSE_GLOBAL_SCORES";
	THIS.LOBBY_LEADERS_DATA_READY = THIS.LOBBY_EVT + ".LEADERS_DATA_READY";
	THIS.USER_TOKENS_CHANGED = THIS.LOBBY_EVT + ".USER_TOKENS_CHANGE";
	//WorldScreen:
	THIS.WORLD_SCREEN = "WORLD_SCREEN";
	//GIFTS POPUP:
	THIS.GIFT_BOX_BUTTON_CLICK = "EVT_GIFT_BOX_BUTTON_CLICK";
	//popups
	THIS.POPUP = "popup";
	THIS.ROUND_DATA_UPDATE_COMPLETE = THIS.POPUP + ".ROUND_DATA_UPDATE_COMPLETE";

	//worlds:
	THIS.LOOPY_FRUITS = 1;
	THIS.NOAHS_SPEEDBOAT = 2;
	THIS.NOT_SO_WILD_WEST = 3;
	THIS.SHOPPING_TIME = 4;
	THIS.ASIAN_STYLE = 5;
	THIS.LAZY_SUNDAY = 6;
	THIS.EGYPTIAN_OLDIES = 7;

	//States:
	THIS.GAME = "STATE_GAME";
	THIS.LOBBY = "STATE_LOBBY";
	THIS.WORLD = "STATE_WORLD";
	THIS.POPUP = "STATE_POPUP";

	//MessageCodes:
	THIS.MESSAGE_INVITES = 1;
	THIS.MESSAGE_MEDALS_WON = 2;

	//gift status:
	THIS.GIFT_UNCLAIMED = 1;
	THIS.GIFT_CLAIMED = 2;
	THIS.GIFT_DONE = 3;

	THIS.KEYCODE_SPACE = 32; //usefull keycode
	THIS.KEYCODE_ENTER = 13;
	THIS.KEYCODE_LEFT = 37; //usefull keycode
	THIS.KEYCODE_RIGHT = 39; //usefull keycode
	THIS.KEYCODE_ESCAPE = 27;
	THIS.KEYCODE_UP = 38;
	THIS.KEYCODE_DOWN = 40;
	THIS.ICON_WIDTH = 150;

	THIS.ASSETS_SMALL = "small_";
	THIS.GENERAL_FONT1 = "18px Bowlby One SC";
	THIS.GENERAL_FONT_FAMILY = 'Bowlby One SC';

	THIS.MAX_USER_NAME_LENGTH = 13;
	THIS.worldsXml = null;
	THIS.screensXml = null;
	THIS.soundsXml = null;
	THIS.userData = null;
	THIS.currentWorld = null;
	THIS.isSoundOn = true; // sounds mute/on
	THIS.curWorldAllTime = null;
	THIS.curWorldWeekly = null;
	THIS.soundsData = null;
	THIS.randMulti = null;

	//Sounds:
	THIS.SOUND_PATH = "assets/sounds/";
	//THIS.soundFileType = null;

	THIS.parseSettingsXml = function (settingsXml) {
		$(settingsXml).find("set").each(function () {
			var val = $(this).attr("val");
			var name = $(this).attr("name");
			if (val.indexOf("arrayData") != -1) {
				THIS[name] = JSON.parse(val).arrayData;
				for (var i = 0; i < THIS[name].length; i++) {
					if (!isNaN(THIS[name][i])) {
						THIS[name][i] = Number(THIS[name][i]);
					}
				}
			} else {
				if (isNaN(val)) {
					THIS[name] = val;
				} else {
					THIS[name] = Number(val);
				}
			}
		});
	}

	THIS.getSoundType = function () {
		if(THIS.soundFileType == null) {
			agent = navigator.userAgent.toLowerCase();
			// adjust for browser
			if (agent.indexOf("chrome") > -1) {
				THIS.soundFileType = ".mp3";
			} else if (agent.indexOf("opera") > -1) {
				THIS.soundFileType = ".ogg";
			} else if (agent.indexOf("firefox") > -1) {
				THIS.soundFileType = ".ogg";
			} else if (agent.indexOf("safari") > -1) {
				THIS.soundFileType = ".mp3";
			} else if (agent.indexOf("msie") > -1) {
				THIS.soundFileType = ".mp3";
			}
		}
		return THIS.soundFileType;
	}

	THIS.getExpLevelData = function (totalExperience) {
		var result = {};
		var expCount = 0;
		var levelXp = THIS.FIRST_LEVEL_XP;
		for(var i = 1; i < 999999; i++) {
			if(expCount + levelXp > totalExperience) {
				result.level = i;
				result.goal = levelXp;
				result.expThisLevel = totalExperience - expCount;
				return result;
			}
			expCount += levelXp;
			levelXp = Math.ceil(levelXp * (THIS.NEXT_LEVEL_XP_MULTI / 100));
		}
	}

	THIS.getScreenUrls = function () {
		var urlsArray = [];
		$(THIS.screensXml).find("asset").each(function () {
			urlsArray.push(THIS.getScreensUrlPrefix() + $(this).attr("url"));
		});
		return urlsArray;
	}

	THIS.addVersionToUrl = function () {
		return "?v=" + GameVersion;
	}

	THIS.getInitAssetsUrls = function () {
		var urlsArray = [];
		urlsArray.push(THIS.getScreensUrlPrefix() + "mainLoading_bg.png");
		urlsArray.push(THIS.getScreensUrlPrefix() + "mainLoading_logo.png");
		urlsArray.push(THIS.getIconUrlPrefix(1) + "w1_icon1.png");
		urlsArray.push(THIS.getIconUrlPrefix(2) + "w2_icon1.png");
		urlsArray.push(THIS.getIconUrlPrefix(3) + "w3_icon1.png");
		urlsArray.push(THIS.getIconUrlPrefix(4) + "w4_icon1.png");
		urlsArray.push(THIS.getIconUrlPrefix(5) + "w5_icon1.png");
		urlsArray.push(THIS.getIconUrlPrefix(6) + "w6_icon1.png");
		urlsArray.push(THIS.getIconUrlPrefix(7) + "w7_icon1.png");
		//login popup
		urlsArray.push(THIS.getScreensUrlPrefix() + "pop_login_top.png");
		urlsArray.push(THIS.getScreensUrlPrefix() + "pop_btn_login.png");
		urlsArray.push(THIS.getScreensUrlPrefix() + "pop_window_base.png");
		return urlsArray;

	}

	THIS.getWorldsLobbyUrls = function () {
		var worldUrls = [];
		var prefix;
		$(THIS.worldsXml).find("world").each(function () {
			if ($(this).attr("status") != "off") {
				worldId = $(this).attr("worldId");
				worldUrls.push(THIS.getWorldLobbyBg(worldId));
				worldUrls.push(THIS.getWorldLogo(worldId));
				// TODO:taking first icon - need to change if we use diff image per unlocked.
				worldUrls.push(util.getWorldIconUrls(worldId)[0].replace(".png", "_lobby.png"));
			}
		});
		return worldUrls;

	}

	THIS.getWorldLobbyBg = function (worldId) {
		return THIS.getWorldUrlPrefix(worldId) + "w" + worldId + "_bg.png";
	}

	THIS.getWorldIconUrls = function (worldId) {
		var urlsArray = [];
		for(var i = 1; i <= util.ICONS_PER_WORLD; i++)
			urlsArray.push(THIS.getIconUrlPrefix(worldId) + "w" + worldId + "_icon" + i + ".png");
		return urlsArray;
	}

	THIS.getWorldStartIcons = function (worldId) {
		var array = [];
		var startWith = $(THIS.getWorldById(worldId)).find("icons").attr("startWith");
		for(var i = 1; i <= startWith; i++)
			array.push(i);
		return array;
	}

	THIS.getWorldById = function (worldId) {
		var worldData;
		$(THIS.worldsXml).find("world").each(function () {
			if(worldId == $(this).attr("worldId")) {
				worldData = this;
			}
		});
		return worldData;
	}

	THIS.getWorldUrlPrefix = function (worldId) {
		return ("assets/worlds/world" + worldId + "/" + mgMain.assetsType);
	}

	THIS.getIconUrlPrefix = function (worldId) {
		return (THIS.getWorldUrlPrefix(worldId) + "icons_on/");
	}

	THIS.getScreensUrlPrefix = function () {
		return "assets/screens/" + mgMain.assetsType;
	}

	THIS.getWorldColors = function (worldId) {
		var colors;
		$(THIS.worldsXml).find("world").each(function () {
			if (worldId == $(this).attr("worldId")) {
				colors = {
					"frameColor": $(this).attr("frameColor"),
					"color": $(this).attr("color")
				};
			}
		});
		return colors;
	}

	THIS.getWorldLogo = function (worldId) {
		return THIS.getWorldUrlPrefix(worldId) + "w" + worldId + "_logo.png";
	}

	THIS.getWorldBgUrl = function (worldId) {
		var bgUrl;
		$(THIS.worldsXml).find("world").each(function () {
			if (worldId == $(this).attr("worldId")) {
				bgUrl = THIS.getWorldUrlPrefix(worldId) + $(this).find("worldBg").attr("url");
			}
		});
		return bgUrl;
	}

	THIS.getNumWorlds = function (includeSoon) {
		var worldStatus;
		var n = 0;
		$(THIS.worldsXml).find("world").each(function () {
			worldStatus = $(this).attr("status");
			if (worldStatus == "on") n++;
			else if (worldStatus == "soon" && includeSoon) n++
		});
		return n;
	}

	THIS.getWorldTokensPrice = function (worldId) {
		var price;
		$(THIS.worldsXml).find("world").each(function () {
			if (worldId == $(this).attr("worldId")) {
				price = $(this).find("tokensPrice").attr("price");
			}
		});
		return Number(price);
	}

	THIS.getLevelData = function (worldId, level) {
		var levelData;
		$(THIS.worldsXml).find("world").each(function () {
			if (worldId == $(this).attr("worldId")) {
				levelData = $(this).find("level")[level];
			}
		});
		return levelData;
	}

	THIS.calcWorldTotalTime = function (worldId) {
		var totalTime = 0;
		var worldData = THIS.getWorldById(worldId);
		$(worldData).find("levels").find("level").each(function () {
			if ($(this).attr("time")) {
				totalTime += Number($(this).attr("time"));
			}
		});
		return totalTime;
	}

	// returns an array of currently unlocked world icons
	THIS.getUnlockedArray = function (worldId) {
		var unlocked = [];
		for (var i = 0; i < THIS.userData.worlds.length; i++) {
			if (THIS.userData.worlds[i].worldId == worldId) {
				for (var j = 0; j < THIS.userData.worlds[i].iconsData.length; j++) {
					if (THIS.userData.worlds[i].iconsData[j].isUnlocked == true) unlocked.push(j);
				}
				break;
			}
		}
		return unlocked;
	}

	THIS.getUserWorldById = function(worldId) {
		var val;
		$.each(THIS.userData.worlds, function (index, item) {
			if (item.worldId == worldId) {
				val = item;
				return;
			}
		});

		return val;
	}

	THIS.saveUserWorldData = function(worldData) {
		for (var i = 0; i < THIS.userData.worlds.length; i++) {
			if (THIS.userData.worlds[i].worldId == worldData.worldId) {
				THIS.userData.worlds[i] = worldData;
				return;
			}
		}
	}

	THIS.pW = function(percent) {
		// return mgMain.initWidth / 100 * percent;
		return 960 / 100 * percent;
	}

	THIS.pH = function(percent) {
		// return mgMain.initHeight / 100 * percent;
		return 640 / 100 * percent;
	}

	THIS.isLandscape = function() {
		if(window.orientation == undefined)
			return true;
		return (Math.abs(window.orientation) % 180 == 90);
	}

	THIS.canvasToBitmap = function(type, colorToChange) {
		var canvas = document.createElement("canvas");
		//var c = new type(canvas);
		new window[type](canvas, colorToChange);
		return new Bitmap(canvas);
	}

	THIS.loadXml = function (url, callback) {
		$.ajax({
			type: "GET",
			url: "config/" + url + THIS.addVersionToUrl(),
			dataType: "xml",
			success: callback
		});
	}

	THIS.applyGreyScale = function (displayObject, width, height) {
		var greyScaleFilter = new ColorMatrixFilter([
			0.33, 0.33, 0.33, 0, 0, // red
			0.33, 0.33, 0.33, 0, 0, // green
			0.33, 0.33, 0.33, 0, 0, // blue
			0, 0, 0, 1, 0 // alpha
		]);

		displayObject.filters = [greyScaleFilter];
		displayObject.cache(0, 0, width, height);
	}

	THIS.applyColor = function (displayObject, width, height, rgba) {
		var colorFilter = new ColorFilter(rgba[0], rgba[1], rgba[2], rgba[3]);

		displayObject.filters = [colorFilter];
		displayObject.cache(0, 0, width, height);
	}

	THIS.getFont = function(size) {
		return size.toString() + 'px ' + THIS.GENERAL_FONT_FAMILY;
	}

	THIS.addChildAtPos = function(container, child, xPos, yPos) {
		child.x = Number(xPos);
		child.y = Number(yPos);
		container.addChild(child);
	}

	THIS.seperateThousands = function (n) {
		var nStr = n.toString() + '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

	THIS.makeGeneralButton = function (assetType, hasDisabled) {
		var disabled = null;
		var enabled = Resource.getBitmap(assetType, true);
		var overDown = enabled.clone();
		overDown.scaleX = overDown.scaleY = 1.07;
		if(hasDisabled) {
			disabled = enabled.clone();
			disabled.alpha = 0.5;
		}
		return new CanvasBtn(enabled, disabled, overDown);
	}

	THIS.calcXpToAdd = function (finishStatus) {
		var xpToAdd = THIS.getWorldTokensPrice(THIS.currentWorld) * THIS.XP_PER_NRG;
		if (finishStatus == "endless") {
			xpToAdd *= THIS.XP_ENDLESS_PERCENT / 100;
		} else if (finishStatus == "loose") {
			xpToAdd *= THIS.XP_LOOSE_PERCENT / 100;
		}
		return Math.ceil(xpToAdd);
	}

	THIS.getQueryStringParam = function (key, default_) {
		if(default_ == null)
			default_ = "";
		key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
		var qs = regex.exec(window.location.href);
		if(qs == null)
			return default_;
		else
			return qs[1];
	}

	THIS.getUnixTimeStamp = function () {
		return Math.round((new Date()).getTime() / 1000);
	}

	THIS.shortenName = function (nameStr, maxLength) {
		if(!maxLength)
			maxLength = THIS.MAX_USER_NAME_LENGTH
		if(nameStr.length > maxLength) {
			var namesArray = nameStr.split(" ");
			nameStr = namesArray[0];
			if(namesArray.length > 1 && namesArray[0].length <= maxLength) {
				for(var i = 1; i < namesArray.length; i++) {
					if(nameStr.length < maxLength - 1)
						nameStr = nameStr.concat(" " + namesArray[i].slice(0, 1) + ".");
				}
			} else {
				nameStr = nameStr.slice(0, maxLength - 3);
				nameStr = nameStr.concat("...");
			}
		}
		return nameStr;
	}

	THIS.getMyGlobalScore = function () {
		var highscore = 0;
		$.each(THIS.userData.worlds, function (index, item) {
			highscore += Number(item.allTime);
		});
		return highscore;
	}

	THIS.getSoundUrls = function () {
		THIS.soundsData = {};
		var urlsArray = [];
		var url;
		var data;
		$(THIS.soundsXml).find("sound").each(function () {
			data = $(this).attr("max") ? $(this).attr("max") : 5;
			url = $(this).attr("url");
			//putting data to object for further faster use:
			THIS.soundsData[$(this).attr("soundId")] = {
				url: url,
				vol: $(this).attr("vol") ? $(this).attr("vol") : 1,
				max: data
			};
			urlsArray.push({
				src: THIS.SOUND_PATH + "MP3/" + url + ".mp3|" + THIS.SOUND_PATH + "OGG/" + url + ".ogg",
				id: $(this).attr("soundId"),
				data: data
			});
		});
		return urlsArray;
	}

	THIS.playSound = function (soundId) {
		$(document).trigger(THIS.PLAY_SOUND, soundId);
	}

	THIS.getSoundVolume = function (soundId) {
		return Number(THIS.soundsData[soundId].vol);
	}

	THIS.calcLevelUpTokens = function (level) {
		return Math.ceil(level / THIS.LEVEL_PRIZE_MULTI) * THIS.LEVEL_UP_TOKENS_PRIZE;
	}

	THIS.buildScoreString = function(score) {
		var string = "";
		score = (score + THIS.randMulti) * THIS.randMulti;
		var n1 = Math.ceil(Math.random() * 999999);
		string += n1.toString();
		string += score.toString();
		var n2 = Math.ceil(Math.random() * 99999999999) + 19548716523;
		string += n2.toString();
		string += THIS.randMulti.toString();
		string += THIS.randMulti.toString().length.toString();
		string += score.toString().length.toString();
		string += n1.toString().length.toString();
		return string;
	}

	THIS.setUserTokens = function (tokensToAdd) {
		THIS.userData.tokens = THIS.userData.tokens + tokensToAdd;
		$(document).trigger(THIS.USER_TOKENS_CHANGED);
	}

	THIS.getOrderValue = function (id) {
		switch (id.toString()) {
		case "1":
			return {
				tokens: 20
			};
			break;

		case "2":
			return {
				tokens: 50
			};
			break;
		case "101":
			return {
				world: 6
			};
		}
	}
}

Array.prototype.shuffle = function () {
	var len = this.length;
	var i = len;
	while (i--) {
		var p = parseInt(Math.random() * len);
		var t = this[i];
		this[i] = this[p];
		this[p] = t;
	}
};