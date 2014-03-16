(function (window) {
	CanvasBtn.prototype = new GL.Container();

	function CanvasBtn(enabled, disabled, overDown) {
		var THIS = this;
		THIS.super_initialize = CanvasBtn.prototype.initialize;
		THIS.disabled = null;
		THIS.enabled = null;
		THIS.overDown = null;
		THIS.isEnabled = true;
		THIS.initialize = function (enabled, disabled, overDown) {
			THIS.super_initialize();
			THIS.disabled = disabled;
			THIS.enabled = enabled;
			THIS.overDown = overDown;
			THIS.disabled && THIS.addChild(THIS.disabled);
			THIS.enabled && THIS.addChild(THIS.enabled);
			if(!THIS.overDown)
				THIS.overDown = enabled.clone();
			THIS.addChild(THIS.overDown);
			THIS.setEnabled(THIS.isEnabled);
			if(GL.Touch.isSupported()) {
				THIS.onMouseOver = null;
				THIS.onMouseOut = null;
			} else {
				THIS.onPress = null;
				THIS.handleMouseUp = null;
			}
		};
		THIS.onPress = function(e) {
			if(THIS.isEnabled) {
				THIS.overDown.visible = true;
				e.onMouseUp = function (e) {
					THIS.handleMouseUp(e);
				}
			}
		};
		THIS.handleMouseUp = function () {
			if(THIS.isEnabled)
				THIS.overDown.visible = false;
		};
		THIS.onMouseOver = function (e) {
			if(THIS.isEnabled) {
				THIS.enabled.visible = false;
				THIS.overDown.visible = true;
			}
		};
		THIS.onMouseOut = function (e) {
			if(THIS.isEnabled) {
				THIS.enabled.visible = true;
				THIS.overDown.visible = false;
			}
		};
		THIS.setEnabled = function (isEnabled) {
			THIS.isEnabled = isEnabled;
			THIS.mouseEnabled = isEnabled;
			if(!isEnabled && THIS.disabled) {
				THIS.disabled.visible = true;
				THIS.enabled.visible = false;
				THIS.overDown.visible = false;
			} else {
				THIS.enabled.visible = true;
				THIS.overDown.visible = false;
				if(THIS.disabled)
					THIS.disabled.visible = false;
			}
		};
		enabled && THIS.initialize(enabled, disabled, overDown);
	}
	window.CanvasBtn = CanvasBtn;
})(window);