(function(window) {
	WordPopup.prototype = new GL.Container();

	function WordPopup(text, callBack) {
		var THIS = this;
		THIS.super_initialize = WordPopup.prototype.initialize; //unique to avoid overiding base class

		// public properties:
		THIS.blocker = null;
		THIS.sqArray = [];
		THIS.indexSq = 3;

		//constructor:
		THIS.initialize = function (text, callBack) {
			THIS.super_initialize();
			var g = new GL.Graphics();
			g.setStrokeStyle(1);
			g.beginStroke(GL.Graphics.getRGB(0, 0, 0));
			g.beginFill(GL.Graphics.getRGB(55, 55, 55));
			g.drawRect(0, 0, Util.pW(100), Util.pH(100));
			THIS.blocker = new GL.Shape(g);
			THIS.blocker.alpha = 0.3;
			THIS.addChild(THIS.blocker);
			THIS.blocker.onPress = function (e) {};

			THIS.text = new GL.Text(text, "bold 44px Arial", "YELLOW");
			THIS.text.x = Util.pW(100) / 2;
			THIS.text.y = Util.pH(100) / 2;
			THIS.text.regX = 50;
			THIS.text.regY = 20;
			THIS.text.scaleX = THIS.text.scaleY = 0;
			THIS.text.alpha = 0.8;
			THIS.addChild(THIS.text);
			THIS.alpha = 0;
			GL.Tween.get(THIS).to({
				alpha: 1
			}, 250);

			GL.Tween.get(THIS.text).to({
				scaleX: 1,
				scaleY: 1
			}, 500, GL.Ease.backOut).call(function () {
				if(callBack)
					callBack();
			});
		}
		THIS.initialize(text, callBack);
	}
	window.WordPopup = WordPopup;
}(window));