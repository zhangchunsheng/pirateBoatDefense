var gameMain = {};
var util = new Util();
var GameVersion = 1;
function GameMain() {
    var THIS = this;
    THIS.canvas = {};
    THIS.stage = {};
    THIS.loader = {};
    THIS.manifest = [];
    THIS.fpsLabel = {};
    THIS.assetsXML = {};
    THIS.resCache = [];
    THIS.enemys = [];
    THIS.MapCTT = new GL.Container;
    THIS.BuildTargetCTT = new GL.Container;
    THIS.PlayGroundCTT = new Playground;
    THIS.BuildMenuCTT = new GL.Container;
    THIS.BlockCTT = new GL.Container;
    THIS.WaveCTT = new GL.Container;
    THIS.ToolBarCTT = new GL.Container;
    THIS.shipInfo = {};
    THIS.pirateArr = [];
    THIS.shipArr = [];
    THIS.iconArr = [];
    THIS.gameStart = false;
    THIS.isInitLoad = true;
    THIS.popupViewer = null;
    THIS.popupViewer = new PopupViewer();
    THIS.gamePanel =  new GL.Container;
    THIS.init = function () {

        window.addEventListener('resize', THIS.resizeGame, false);
     
       // THIS.gameArea = document.getElementById('gameArea');
       
        window.onBlur = function () {
            if (!THIS.pauseing && THIS.gameStart) {
                THIS.pauseGame();
            }
        }
       

        THIS.canvas = document.createElement("canvas");
        document.body.appendChild(THIS.canvas)
        THIS.stage = new GL.Stage(THIS.canvas);
        THIS.resizeGame();

        GL.Touch.enable(THIS.stage);
        // enabled mouse over / out events
        THIS.stage.enableMouseOver(10);

        THIS.initLoader();
        THIS.addToLoaderQueue("map", "ship", "other", "menu", "levelPanel", "num")

   
        THIS.stage.addChild(THIS.gamePanel);
        
        THIS.gamePanel.addChild(THIS.MapCTT, THIS.BuildTargetCTT, THIS.PlayGroundCTT, THIS.BuildMenuCTT, THIS.BlockCTT, THIS.ToolBarCTT);
        THIS.messageField = new GL.Text("Loading", "bold 24px Arial", "#FFFFFF");
        THIS.messageField.maxWidth = 1e3;
        THIS.messageField.textAlign = "center";
        THIS.messageField.x = THIS.canvas.width / 2;
        THIS.messageField.y = THIS.canvas.height / 2;
        THIS.stage.addChild(THIS.messageField);
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
        GL.Ticker.addListener(THIS)
    };
    THIS.initLoader = function () {
        THIS.manifest.length = 0;
        THIS.loader = new GL.PreloadJS(false);
        THIS.loader.onComplete = THIS.handleComplete;
        THIS.loader.onFileLoad = THIS.handleFileLoaded;
        THIS.loader.onError = THIS.handleFileError
    };
 
  
    THIS.initToolBar = function () {
        var gold_bg = Resource.getBitmap("gold_bg"),
        diamond_bg = Resource.getBitmap("diamond_bg"),
        number_bg = Resource.getBitmap("number_bg"),
        number_bg2 = Resource.getBitmap("number_bg"),
        paBtn = new CanvasBtn(Resource.getBitmap("pause"));
        paBtn.x = 816;
        paBtn.y = 27;
        var plBtn = new CanvasBtn(Resource.getBitmap("play"));
        plBtn.visible = false;
        plBtn.x = 816;
        plBtn.y = 25;
        paBtn.onPress = function () {
         
            THIS.pauseGame();

         
            //var xx = new WordPopup("PAUSE", function () {
            //    GL.Ticker.setPaused(true)
            //    self.visible = false;
            //    plBtn.visible = true;
            //});
            //THIS.BlockCTT.addChild(xx);

        };
        plBtn.onPress = function () {
            THIS.BlockCTT.visible = false;
            this.visible = false;
            paBtn.visible = true;
            
            GL.Ticker.setPaused(false)
        };
        THIS.ToolBarCTT.addChild(THIS.WaveCTT);
        THIS.ToolBarCTT.addChild(paBtn);
        THIS.ToolBarCTT.addChild(plBtn);
        number_bg.x = 20;
        number_bg.y = 20;
        number_bg2.x = 200;
        number_bg2.y = 20;
        THIS.ToolBarCTT.addChild(number_bg, number_bg2);
        THIS.ToolBarCTT.addChild(gold_bg, diamond_bg);
        gold_bg.x = 10;
        gold_bg.y = 10;
        diamond_bg.x = 190;
        diamond_bg.y = 10;
        var setBtn = new CanvasBtn(Resource.getBitmap("set"));
        setBtn.x = 890;
        setBtn.y = 23;
        THIS.ToolBarCTT.addChild(setBtn)

        THIS.goldCoin = new GL.Text("000000", "bold 20px Arial", "#E6E53B");
        THIS.goldCoin.x = 80;
        THIS.goldCoin.y = 31;

        THIS.diamond = new GL.Text("000000", "bold 20px Arial", "#3A5DEF");
        THIS.diamond.x = 260;
        THIS.diamond.y = 31;
        THIS.ToolBarCTT.addChild(THIS.goldCoin, THIS.diamond)
    };

    THIS.pauseGame = function () {

        THIS.pauseing = true;
        // THIS.stage.update();
        THIS.BlockCTT.removeAllChildren();
        THIS.BlockCTT.visible = true;
        for (var i = 0; i < THIS.PlayGroundCTT.children.length; i++) {
            GL.Ticker.removeListener(THIS.PlayGroundCTT.children[i]);
        }
        GL.Ticker.removeListener(THIS.shipGenerator);
        GL.Ticker.removeListener(THIS.PlayGroundCTT);
        THIS.popupViewer.addPopup(new PausePopup());
        THIS.viewPopups(function (callbackParams) {
            if (callbackParams == "resume") {
                for (var i = 0; i < THIS.PlayGroundCTT.children.length; i++) {
                    GL.Ticker.addListener(THIS.PlayGroundCTT.children[i]);
                }
                THIS.pauseing = false;
                GL.Ticker.addListener(THIS.shipGenerator);
                GL.Ticker.addListener(THIS.PlayGroundCTT);
            } else if (callbackParams == "restart") {
                THIS.pauseing = false;
                THIS.loadLevel(THIS.currentLevel);
            } else if (callbackParams == "quit") {
                for (var i = 0; i < THIS.PlayGroundCTT.children.length; i++) {
                    GL.Ticker.removeListener(THIS.PlayGroundCTT.children[i]);
                }
                THIS.pauseing = false;
                GL.Ticker.removeListener(THIS.shipGenerator);
                GL.Ticker.removeListener(THIS.PlayGroundCTT);

                THIS.gotoLevelPanel();

            }

        });
    }
    THIS.addToLoaderQueue = function () {
        for (var l = arguments.length, i = 0; i < l; i++) {
            var currentNodeNames = arguments[i];

            console.log(currentNodeNames)
            console.log(AssetConfig[currentNodeNames].asset.length)

            for (var j= 0; j < AssetConfig[currentNodeNames].asset.length; j++)
            {
             
                THIS.manifest.push({
                    src: "assets/" + currentNodeNames + "/" + AssetConfig[currentNodeNames].asset[j].url,
                    id: AssetConfig[currentNodeNames].asset[j].id
                });
            }
       
            THIS.loader.loadManifest(THIS.manifest);
            THIS.manifest = []
        }
    };

    THIS.loadLevel = function (id) {
       
        THIS.pirateArr.length = 0;
        THIS.shipArr.length = 0;
        THIS.PlayGroundCTT.removeAllChildren();
        THIS.BuildMenuCTT.removeAllChildren();
        GL.Ticker.addListener(THIS.PlayGroundCTT);
        var bitmap = Resource.getBitmap("map"+id);
        THIS.MapCTT.addChild(bitmap);
        bitmap.onClick = function () {
            THIS.BuildTargetCTT.addChild();
            THIS.showBuildTarget(1, 1)
        };
        THIS.obstruction = "";
        THIS.buildArea = "";
        var transport = "",
        enemy = "",
        horizontalCount,
        verticalCount;
        //alert(MapConfig.Ships[0].ID);       
        _(MapConfig.Map).each(function (item) {
            if (item.ID == id)
            {
                THIS.obstruction = item.Obstruction.split(",");
                THIS.buildArea = item.BuildArea.split(",");
                horizontalCount =item.HorizontalCount;
                verticalCount = item.VerticalCount;
            }
        })

        for (THIS.mapData = [], j = 0; j < horizontalCount; j++) {
            for (var tempArray = [], k = 0; k < verticalCount; k++) if (!_.include(THIS.obstruction, j + "_" + k)) tempArray.push(0);
            else tempArray.push(1);
            THIS.mapData.push(tempArray)
        }

        THIS.MapCTT.onClick = function () {
        var x = parseInt((THIS.stage.mouseX / 80) / THIS.stage.scaleX), y = parseInt((THIS.stage.mouseY / 80) / THIS.stage.scaleY);
            //  for (var i = 0; i < gameMain.iconArr.length; i++)
            //     gameMain.iconArr[i].parent.removeChild(gameMain.iconArr[i]);
            gameMain.iconArr.length = 0;
            gameMain.BuildMenuCTT.removeAllChildren();
            //gameMain.BuildMenuCTT.removeChild(gameMain.tgt);
            if (_.include(THIS.buildArea, x + "_" + y) && !THIS.isCellInPirateArr(x, y)) {
                THIS.tgt = Resource.getBitmap("target");
                THIS.tgt.regX = THIS.tgt.regY = 40;
                THIS.tgt.alpha = .5;
                THIS.tgt.scaleX = THIS.tgt.scaleY = 0;
                THIS.tgt.x = x * 80 + 40;
                THIS.tgt.y = y * 80 + 40;
                THIS.BuildMenuCTT.addChild(THIS.tgt);
                GL.Tween.get(THIS.tgt).to({
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1
                },
                500, GL.Ease.backOut);
                var pc1 = new PirateIcon("pirate1", x, y - 1),
                pc2 = new PirateIcon("pirate1", x - 1, y - 1),
                pc3 = new PirateIcon("pirate1", x + 1, y - 1);
                THIS.iconArr.push(pc1);
                THIS.iconArr.push(pc2);
                THIS.iconArr.push(pc3)
            } else {
                var bmp = Resource.getBitmap("warn");
                THIS.showBuildTarget();
                bmp.x = x * 80;
                bmp.y = y * 80;
                THIS.PlayGroundCTT.addChild(bmp);
                GL.Tween.get(bmp).to({
                    alpha: 0
                },
                1e3).call(function () {
                    this.parent.removeChild(this)
                })
            }
        };
        THIS.initBuildTarget();
        THIS.shipGenerator = new ShipGenerator(id);
  
        //THIS.getShipInfoByID(1);
        //THIS.getShipInfoByID(1)
    }

    THIS.handleComplete = function () {
        THIS.messageField.visible = false;
        THIS.levelPanel = new LevelPanel;
        THIS.stage.addChild(THIS.levelPanel)

       
     
    };
    THIS.getShipInfoByID = function (id) {
        if (THIS.shipInfo[id]) return THIS.shipInfo[id];
        $(Resource.getRes("mapConfig")).find("Ships").each(function () {
            $(this).find("Ship").each(function () {
                if ($(this).attr("ID") == id) THIS.shipInfo[id] = $(this)
            })
        });
        return THIS.shipInfo[id]
    };
    THIS.handleFileLoaded = function (event) {
        event.type !== "sound" && Resource.addRes(event.id, event.result);
        THIS.messageField.text = "Loading " + (THIS.loader.progress * 100 | 0) + "%"
    };
    THIS.initBuildTarget = function () {
        THIS.BuildTargetCTT.alpha = 0;
        THIS.BuildTargetCTT.removeAllChildren();
        for (var i = 0; i < THIS.buildArea.length; i++)  {
            var shape = new GL.Shape;
            shape.regX = shape.regY = 40;
            shape.graphics.setStrokeStyle(1).beginStroke("white").drawRoundRect(THIS.buildArea[i].split("_")[0] * 80 + 40, THIS.buildArea[i].split("_")[1] * 80 + 40, 80, 80, 10);
            THIS.BuildTargetCTT.addChild(shape)
        }
    };
    THIS.hiddenBuildTarget = function () {
        THIS.BuildTargetCTT.removeAllChildren()
    };
    THIS.showBuildTarget = function () {
        THIS.BuildTargetCTT.alpha === 0 && GL.Tween.get(THIS.BuildTargetCTT).to({
            alpha: 1
        },
        500).wait(1e3).to({
            alpha: 0
        },
        500)
    };
    THIS.showWin = function () {
        GL.Tween.get(THIS.winPP).to({
            scaleX: 1,
            scaleY: 1
        },
        600, GL.Ease.backOut)
    };
    THIS.showLose = function () {
        GL.Tween.get(THIS.losePP).to({
            scaleX: 1,
            scaleY: 1
        },
        600, GL.Ease.backOut)
    };

    THIS.viewPopups = function (viewPopupsCallback) {
        if (THIS.popupViewer.hasPopups()) {
            trace("viewing popups");
            THIS.changeState(util.POPUP);
            THIS.stage.addChild(THIS.popupViewer);
            THIS.popupViewer.startViewing(viewPopupsCallback);
        }
        else if (viewPopupsCallback) {
            viewPopupsCallback();
        }
    }

    THIS.endPopupView = function (viewPopupsCallback, callbackParams) {
        THIS.changeState(THIS.prevState);
        THIS.stage.removeChild(THIS.popupViewer);
        if (viewPopupsCallback)
            viewPopupsCallback(callbackParams);
    }

    THIS.tick = function () {
        THIS.fpsLabel.text = Math.round(GL.Ticker.getMeasuredFPS()) + " FPS";
        THIS.stage.addChild(gameMain.fpsLabel);
        THIS.stage.update()
    };
    
    THIS.isCellInObstruction = function (x, y) {

        return _.include(THIS.obstruction, x + "_" + y);
    }
    THIS.isCellInPirateArr = function (x, y) {
        for (var i = 0; i < THIS.pirateArr.length; i++)
        {
            if (THIS.pirateArr[i].currentCell.x == x && THIS.pirateArr[i].currentCell.y == y)
            {
                return true;
            }
        }
        return false;
    }

    THIS.executePanelChange = function (callback) {
        THIS.stage.addChild(THIS.blocker);
        GL.Tween.get(THIS.blocker).to({ alpha: 1 }, 500).call(function () {

            if (callback) callback();
        }).to({ alpha: 0 }, 500)
    }


    THIS.changeState = function (newState) {
        var stateHasChanged;
        if (THIS.curState != newState) {
            THIS.prevState = THIS.curState;
            THIS.curState = newState;
            trace("state changed from " + THIS.prevState + " to: " + newState);
            stateHasChanged = true;
            THIS.handleStateChange();
        }
        else {
            trace("state repeated : " + newState);
            stateHasChanged = false;
        }
        return stateHasChanged;
    }

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
                if (THIS.prevState == util.WORLD) {
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
                if (THIS.topBar)
                    THIS.topBar.show();
                THIS.enableOverEvents(true)
                THIS.curContent = "popupViewer";
                break;
        }
        //Ticker.setFPS(toFPS);
    }

    THIS.enableOverEvents = function (isEnabled) {
        if (!GL.Touch.isSupported()) {
            if (isEnabled)
                THIS.stage.enableMouseOver(50);
            else
                THIS.stage.enableMouseOver(0);
        }
    }

    THIS.showLoading = function () {
        if (THIS.initLoadingDone) {
            if (!THIS.loading) {
                THIS.loading = new Loading();
                THIS.stage.addChild(THIS.loading);
            }
        }
        else {
            THIS.loading = new InitLoadingScreen();
            THIS.stage.addChild(THIS.loading);
        }
    }

    THIS.hideLoading = function () {
        if (THIS.loading) {
            THIS.loading.fadeOut();
            Tween.get(THIS).wait(250).call(THIS.killLoading);
        }
    }

    THIS.killLoading = function () {
        if (THIS.loading) {
            THIS.stage.removeChild(THIS.loading);
            THIS.loading = null;
        }
    }

    THIS.gotoShop = function () {
        THIS.addShopPopup();
        THIS.viewPopups(null);
    }

    THIS.addShopPopup = function () {
        // check if on FB
        if (isOnFacebook)
            THIS.popupViewer.addPopup(new BuyPopup());
        else
            THIS.popupViewer.addPopup(new BuyOnFacebookPopup("true"));
    }

    THIS.gotoLevelPanel = function () {
        THIS.gameStart = false;
        THIS.executePanelChange(function () {

            THIS.gamePanel.visible = false;
            THIS.levelPanel.visible = true;
        });
    }

    THIS.handleFileError = function (e) {
        Resource.addRes(e.id, SpriteConfig[e.id.replace("JSON","")]);
        THIS.messageField.text = "Loading " + (THIS.loader.progress * 100 | 0) + "%"
       
    }

    THIS.resizeGame = function () {
        var widthToHeight = 96 / 64;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        if (newWidth > 960 || newHeight > 640) {
            newWidth = 960;
            newHeight = 640;
        }
        //THIS.gameArea.style.width = newWidth + 'px';
        //THIS.gameArea.style.height = newHeight + 'px';

        //THIS.gameArea.style.marginTop = (-newHeight / 2) + 'px';
        //THIS.gameArea.style.marginLeft = (-newWidth / 2) + 'px';


        var scaleTo;
        if (!THIS.isInitLoad) {
            scaleTo = newWidth / THIS.canvas.width;
            trace("newWidth: " + newWidth + " newHeight: " + newHeight + " scaleStage: " + scaleTo);
            THIS.stage.scaleX = THIS.stage.scaleX * scaleTo;
            THIS.stage.scaleY = THIS.stage.scaleY * scaleTo;
        }
        else {
            scaleTo = newWidth / 960;
            trace("newWidth: " + newWidth + " newHeight: " + newHeight + " scaleStage: " + scaleTo);
            THIS.stage.scaleX = THIS.stage.scaleX * scaleTo;
            THIS.stage.scaleY = THIS.stage.scaleY * scaleTo;
            THIS.isInitLoad = false;
        }
        THIS.canvas.width = newWidth;
        THIS.canvas.height = newHeight;

        if (THIS.initWidth == 0) {
            THIS.initWidth = THIS.canvas.width;
            THIS.initHeight = THIS.canvas.height;
        }
    }

}
gameMain = new GameMain;
gameMain.init()