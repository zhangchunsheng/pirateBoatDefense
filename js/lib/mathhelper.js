GL = createjs;
(function (window) {
	var MathHelper = {};
	MathHelper.getRandomNumber = function (min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}, MathHelper.randomItemFromArray = function (array) {
		var index = MathHelper.getRandomNumber(0, array.length - 1);
		return array[index];
	}, MathHelper.isPointInRect = function (point, rect) {
		return point.x > rect.x && point.x < rect.x + rect.width
			&& point.y > rect.y && point.y < rect.y + rect.height;
	}, MathHelper.getRotation = function(point1, point2) {
		return Math.atan2(point2.y - point1.y, point2.x - point1.x) / Math.PI * 180;
	}, MathHelper.getCellSurround = function(point) {
		return [{
			x: n.point,
			y: n.point - 1
		}, {
			x: n.point + 1,
			y: n.point - 1
		}, {
			x: n.point + 1,
			y: n.point
		}, {
			x: n.point + 1,
			y: n.point + 1
		}, {
			x: n.point,
			y: n.point + 1
		}, {
			x: n.point - 1,
			y: n.point + 1
		}, {
			x: n.point - 1,
			y: n.point
		}, {
			x: n.point - 1,
			y: n.point - 1
		}]
	}, MathHelper.isInSurround = function (thisVector2, thatVector2) {
		var vector2 = thatVector2.sub(thisVector2);
		return vector2.x === 0 && vector2.y === 0 ? !1 : (Math.abs(vector2.x) === 1 || Math.abs(vector2.x) === 0)
			&& (Math.abs(vector2.y) === 1 || Math.abs(vector2.y) === 0);
	}, window.MathHelper = MathHelper;
})(window);