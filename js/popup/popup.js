(function (window) {
	function Popup() {
		this.initialize()
	}
	Popup.prototype = new GL.Container,
	Popup.prototype.xButton = null,
	Popup.prototype.shareButton = null,
	Popup.prototype.okButton = null,
	Popup.prototype.gotoWorldButton = null,
	Popup.prototype.lowButtons = null,
	Popup.prototype.worldId = null,
	Popup.prototype.selectedButtonIndex = null,
	Popup.prototype.allButtons = null,
	Popup.prototype.nextButton = null,
	Popup.prototype.backButton = null,
	Popup.prototype.curPage = null,
	Popup.prototype.itemsInPage = null,
	Popup.prototype.listData = null,
	Popup.prototype.pageIndexText = null,
	Popup.prototype.button = [],
	Popup.prototype.pageIndexStrokes = [{
		color: "#76c8fa"
	}, {
		color: "#146fa6",
		lineWidth: 5
	}], Popup.prototype.Container_initialize = Popup.prototype.initialize,
	Popup.prototype.initialize = function() {
		this.Container_initialize(),
			this.curPage = 1,
			this.listData = [],
			this.lowButtons = [],
			this.allButtons = [],
			this.scaleX = .1,
			this.scaleY = .1;
	}, Popup.prototype.showMe = function() {
		GL.Tween.get(this).to({
			scaleX: 1,
			scaleY: 1
		}, 600, GL.Ease.backOut).wait(150).call(this.showTweenComplete);
	}, Popup.prototype.showTweenComplete = function() {
		
	}, Popup.prototype.createBg = function(bgImgName) {
		this.x = util.pW(50),this.y = util.pH(50);
		var popupBase = Resource.getBitmap(bgImgName, !0);
		this.addChildAt(popupBase, 0);
	}, Popup.prototype.addTitle = function(title, x, y) {
		this.titleBitMap = Resource.getBitmap(title, !0);
		util.addChildAtPos(this, this.titleBitMap, x, y);
	}, Popup.prototype.createCloseButton = function(x, y) {
		var THIS = this;
		THIS.xButton = util.makeGeneralButton("xButton", !0),
			util.addChildAtPos(this, this.xButton, x, y),
			this.xButton.onClick = function(e) {
				THIS.buttonClickHandler(e, this);
			};
	}, Popup.prototype.createShareButton = function() {
		var THIS = this;
		this.shareButton = util.makeGeneralButton("shareButton", !0),
			this.shareButton.name = "shareButton",
			this.shareButton.visible = !1,
			this.lowButtons.push(this.shareButton),
			this.allButtons.push(this.shareButton);
	}, Popup.prototype.createOkButton = function(name) {
		this.okButton = util.makeGeneralButton(name, !0),
			this.okButton.name = name,
			this.lowButtons.push(this.okButton),
			this.allButtons.push(this.okButton);
	}, Popup.prototype.createGotoWorldButton = function() {
		this.gotoWorldButton = util.makeGeneralButton("gotoWorldButton", !0),
			this.gotoWorldButton.name = "gotoWorldButton",
			this.lowButtons.push(this.gotoWorldButton),
			this.allButtons.push(this.gotoWorldButton);
	}, Popup.prototype.placeButtons = function() {
		for(var THIS = this, button, i = 0, t = 0; t < this.lowButtons.length; t++) {
			button = this.lowButtons[t],
				button.y = 170,
				button.x = 340 - i - util.getAssetW(button.name) / 2,
				i += 10 + util.getAssetW(button.name),
				button.onClick = function(button) {
					THIS.buttonClickHandler(e, this)
				},
				this.addChild(button);
		}
	}, Popup.prototype.buttonClickHandler = function(e, popup) {
		switch (popup) {
		case this.xButton:
		case this.okButton:
			this.closeMe();
			break;
		case this.shareButton:
			trace("share button clicked");
			break;
		case this.gotoWorldButton:
			this.parent.callbackParams = this.worldId,
				this.parent.viewPopupCallback = mgMain.gotoNewWorldPopupCallback,
				this.closeMe();
		}
	}, Popup.prototype.closeMe = function() {
		this.parent.closePopup()
	}, Popup.prototype.enableButtons = function(n) {
		for (var i = 0; i < this.lowButtons.length; i++)
			this.lowButtons[i].setEnabled(n);
		this.xButton.setEnabled(n)
	}, Popup.prototype.addPaging = function(n, t) {
		this.itemsInPage = n,
			this.backButton = util.makeGeneralButton("popupPagerLeft", !0),
			this.allButtons.unshift(this.backButton),
			this.backButton.disabled.alpha = .2,
			util.addChildAtPos(this, this.backButton, -util.getAssetW("popupBase") / 2 + 67, 0),
			this.backButton.onClick = function() {
				this.parent.curPage--, this.parent.updateByPage()
			},
			this.nextButton = util.makeGeneralButton("popupPagerRight", !0),
			this.allButtons.push(this.nextButton),
			this.nextButton.disabled.alpha = .2,
			util.addChildAtPos(this, this.nextButton, util.getAssetW("popupBase") / 2 - 67, 0),
			this.nextButton.onClick = function() {
				this.parent.curPage++, this.parent.updateByPage()
			},
			this.backButton.setEnabled(this.curPage > 1),
			this.nextButton.setEnabled(this.curPage * this.itemsInPage < this.listData.length),
			t && this.updatePageIndexText(),
			this.populateList();
	}, Popup.prototype.pageTweenDone = function(popup) {
		popup.mouseEnabled = !0, popup.populateList();
	}, Popup.prototype.populateList = function() {
		trace("Popup.populateList is abstract, to be overriden ");
	}, Popup.prototype.updateByPage = function() {
		this.backButton.setEnabled(this.curPage > 1),
			this.nextButton.setEnabled(this.curPage * this.itemsInPage < this.listData.length),
			Tween.get(this.itemsHolder, {
				override: !0
			}).to({
				alpha: 0
			}, 300, Ease.circInOut).call(this.pageTweenDone, [this]),
			this.mouseEnabled = !1,
			this.pageIndexText && this.updatePageIndexText();
	}, Popup.prototype.updatePageIndexText = function() {
		this.pageIndexText || (this.pageIndexText = new TextStroke(" ", "28px Bowlby One SC", this.pageIndexStrokes, "center"),
			util.addChildAtPos(this, this.pageIndexText, 0, 146)),
			this.pageIndexText.setText(this.curPage.toString() + "/" + Math.ceil(this.listData.length / this.itemsInPage).toString());
	}, Popup.prototype.keyLeftRightHandler = function(index) {
		this.allButtons.length > 0
			&& (this.selectedButtonIndex == null ? this.selectedButtonIndex = 0 : this.allButtons[this.selectedButtonIndex].onMouseOut(),
				this.selectedButtonIndex = this.selectedButtonIndex + index,
				this.selectedButtonIndex < 0 ? this.selectedButtonIndex = this.allButtons.length - 1 : this.selectedButtonIndex >= this.allButtons.length
			&& (this.selectedButtonIndex = 0),
				this.allButtons[this.selectedButtonIndex].onMouseOver());
	}, window.Popup = Popup;
})(window);