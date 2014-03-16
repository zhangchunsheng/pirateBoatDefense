(function (window) {
	function PopupViewer() {
		var THIS = this;
		THIS.TWEEN_TIME = 300,
		THIS.blocker = null,
		THIS.poupsQueue = [],
		THIS.currentPopup = null,
		THIS.viewPopupCallback = null,
		THIS.callbackParams = null,
		THIS.initialize = function() {
			THIS.super_initialize = PopupViewer.prototype.initialize;
			var graphics = new GL.Graphics;
			graphics.beginFill(GL.Graphics.getRGB(0, 0, 0)),
				graphics.drawRect(0, 0, util.pW(100), util.pH(100)),
				THIS.blocker = new GL.Shape(graphics),
				THIS.blocker.alpha = .3,
				THIS.addChild(THIS.blocker),
				THIS.blocker.onPress = function() {
					
				};
		}, THIS.addPopup = function(popup, unshiftPopup) {
			unshiftPopup ? THIS.poupsQueue.unshift(popup) : THIS.poupsQueue.push(popup);
		}, THIS.startViewing = function (n, t) {
			THIS.viewPopupCallback = n,
			THIS.callbackParams = t,
			THIS.showPopup();
		}, THIS.closePopup = function() {
			GL.Tween.get(THIS.currentPopup).to({
				alpha: 0
			}, THIS.TWEEN_TIME).call(THIS.killPopup, [THIS.currentPopup]);
		}, THIS.showPopup = function() {
			THIS.currentPopup = THIS.poupsQueue.shift(), THIS.currentPopup.alpha = 0, THIS.addChild(THIS.currentPopup), GL.Tween.get(THIS.currentPopup).to({
				alpha: 1
			}, THIS.TWEEN_TIME);
		}, THIS.killPopup = function(popup) {
			THIS.removeChild(popup),
				popup = null,
				THIS.poupsQueue.length > 0 ? THIS.showPopup() : (gameMain.endPopupView(THIS.viewPopupCallback, THIS.callbackParams), THIS.viewPopupCallback = null, THIS.callbackParams = null);
		}, THIS.hasPopups = function() {
			return THIS.poupsQueue.length > 0;
		}, THIS.handleKeyDown = function(t) {
			var t, r;
			if (t || (t = n.event), THIS.currentPopup) {
				if (THIS.currentPopup.onKeyDown) {
					THIS.currentPopup.onKeyDown(t);
					return
				}
				switch (t.keyCode) {
				case util.KEYCODE_ESCAPE:
					THIS.currentPopup.xButton != null && (r = THIS.currentPopup.xButton);
					break;
				case util.KEYCODE_SPACE:
				case util.KEYCODE_ENTER:
					THIS.currentPopup.allButtons.length > 0
						&& THIS.currentPopup.selectedButtonIndex != null ? r = THIS.currentPopup.allButtons[THIS.currentPopup.selectedButtonIndex] : THIS.currentPopup.okButton
						&& (r = THIS.currentPopup.okButton);
					break;
				case util.KEYCODE_LEFT:
					THIS.currentPopup.keyLeftRightHandler(-1);
					break;
				case util.KEYCODE_RIGHT:
					THIS.currentPopup.keyLeftRightHandler(1);
				}
				r && r.isEnabled && r.onClick();
			}
		}, THIS.initialize();
	}
	PopupViewer.prototype = new GL.Container, window.PopupViewer = PopupViewer;
})(window);