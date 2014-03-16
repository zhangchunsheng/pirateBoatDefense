var soundUtil = {};
var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener("deviceready", this.onDeviceReady, false);
		window.addEventListener("load", this.onLoadReady, true);
	},
	onDeviceReady: function() {
		app.receivedEvent("deviceready", BTG.PHONEGAP_MEDIA);
	},
	onLoadReady: function() {
		app.receivedEvent("deviceready", BTG.AUDIO_TAG);
	},
	receivedEvent: function(id, type) {
		console.log("Received Event: " + id);
		soundUtil = new BTG.Sound(type);
		soundUtil.init(sounds, BTG.Sound.onSuccess, BTG.Sound.onError);
	}
};
app.initialize();
BTG = BTG || {};
(function(BTG) {
	(function(n) {
		var OS_PC = "pc",
			OS_IPHONE = "iPhone",
			OS_IPOD = "iPod",
			OS_IPAD = "iPad",
			OS_ANDROID = "Android";
		BTG.os = OS_PC;
		if(n.indexOf(OS_IPHONE) > 0) {
			BTG.os = OS_IPHONE;
			BTG.canTouch = true;
		} else if (n.indexOf(OS_IPOD) > 0) {
			BTG.os = OS_IPOD;
			BTG.canTouch = true;
		} else if (n.indexOf(OS_IPAD) > 0) {
			BTG.os = OS_IPAD;
			BTG.canTouch = true;
		} else if (n.indexOf(OS_ANDROID) > 0) {
			BTG.os = OS_ANDROID;
			BTG.canTouch = true;
		}
	})(navigator.userAgent);
})(BTG);