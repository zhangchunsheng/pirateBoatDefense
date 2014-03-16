var DragMachine = {};
DragMachine.handle = function (target) {
	target.onPress = function (evt) {
		target.parent.addChild(target);
		var offset = {
			x: target.x - evt.stageX,
			y: target.y - evt.stageY
		};
		evt.onMouseMove = function (ev) {
			target.x = ev.stageX + offset.x;
			target.y = ev.stageY + offset.y;
			gameMain.stage.update();
			console.log(target.x + "__" + target.y)
		}
	}
}