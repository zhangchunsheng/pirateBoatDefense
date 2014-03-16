(function (window) {
	var Vector2 = function (x, y) {
		this.initialize(x, y)
	};
	Vector2.prototype = {
		initialize: function(x, y) {
			this.x = x || 0, this.y = y || 0;
		},
		set: function(x, y) {
			return this.x = x, this.y = y, this;
		},
		sub: function(thatVector2) {
			return new Vector2(this.x - thatVector2.x, this.y - thatVector2.y);
		},
		subSelf: function(thatVector2) {
			this.x = this.x - thatVector2.x, this.y = this.y - thatVector2.y;
		},
		multiplyScalar: function(step) {
			return this.x *= step, this.y *= step, this;
		},
		divideScalar: function(step) {
			return step ? (this.x /= step, this.y /= step) : this.set(0, 0), this;
		},
		rotateSelf: function(thatVector2, angle) {
			var vector2 = this.sub(thatVector2),
				i;
			angle *= Math.PI / 180, i = [
				[Math.cos(angle), -Math.sin(angle)],
				[Math.sin(angle), Math.cos(angle)]
			], this.x = thatVector2.x + i[0][0] * vector2.x + i[0][1] * vector2.y, this.y = thatVector2.y + i[1][0] * vector2.x + i[1][1] * vector2.y;
		},
		rotate: function(thatVector2, angle) {
			var vector2 = this.sub(thatVector2),
				r;
			return angle *= Math.PI / 180, r = [
				[Math.cos(angle), -Math.sin(angle)],
				[Math.sin(angle), Math.cos(angle)]
			], new Vector2(thatVector2.x + r[0][0] * vector2.x + r[0][1] * vector2.y, thatVector2.y + r[1][0] * vector2.x + r[1][1] * vector2.y);
		},
		length: function() {
			return Math.sqrt(this.lengthSq());
		},
		normalize: function() {
			return this.divideScalar(this.length());
		},
		lengthSq: function() {
			return this.x * this.x + this.y * this.y;
		},
		distanceToSquared: function(thatVector2) {
			var x = this.x - thatVector2.x,
				y = this.y - thatVector2.y;
			return x * x + y * y;
		},
		distanceTo: function(thatVector2) {
			return Math.sqrt(this.distanceToSquared(thatVector2));
		},
		setLength: function(thatVector2) {
			return this.normalize().multiplyScalar(thatVector2);
		}
	}, window.Vector2 = Vector2;
})(window);