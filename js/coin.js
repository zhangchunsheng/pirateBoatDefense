(function (window) {
	var Coin = function () {
		this.initialize();
	}
	Coin.prototype = new GL.Container();

	Coin.prototype.Container_initialize = Coin.prototype.initialize;
	Coin.prototype.initialize = function () {
		this.Container_initialize();
		// this.CoinBmp = new Bitmap(mgMain.imgs[7]);
		var data = {
			"frames": {
				"width": 60,
				"height": 60,
				"numFrames": 10,
				"regX": 30,
				"regY": 30
			},
			"animations": {
				"rotate": [0, 9, "rotate"]
			},
			"images": [Resource.getRes("coin")]
		}
		var spriteSheet = new GL.SpriteSheet(data);
		this.coinAnimation = new GL.BitmapAnimation(spriteSheet);
		this.coinAnimation.onAnimationEnd = function () {
			//_this.coinAnimation.gotoAndPlay("rotate");
			//this.stop();
		}
		this.coinAnimation.gotoAndPlay("rotate");
		this.addChild(this.coinAnimation);
	}

	Coin.prototype.rotate = function () {
		this.coinAnimation.gotoAndPlay("rotate");
	}

	window.Coin = Coin;
}(window))