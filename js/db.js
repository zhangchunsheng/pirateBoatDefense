/**
 * 数据操作相关
 * 作者：张春生
 * 日期：2012-12-02
 */
BTG = BTG || {};
(function(BTG) {
	BTG.L_KV = {};
	BTG.L_KV.getValue = function(key) {
		return localStorage.getItem(key);
	}
	BTG.L_KV.setValue = function(key, value) {
		localStorage.setItem(key, value);
	}
	BTG.L_KV.removeValue = function(key) {
		localStorage.removeItem(key);
	}
	BTG.ArrayUtil = function(array) {
		this.currentIndex = 0;
		this.array = array;
		this.count = array.length;
	};
	BTG.ArrayUtil.prototype = {
		prev: function() {
			this.currentIndex--;
			if(this.currentIndex < 0)
				this.currentIndex = this.count - 1;
			return this.array[this.currentIndex];
		},
		next: function() {
			this.currentIndex++;
			if(this.currentIndex > this.count - 1)
				this.currentIndex = 0;
			return this.array[this.currentIndex];
		}
	};
})(BTG);

(function(BTG) {
	BTG.GameData = {};
	BTG.GameData.getCurrentCity = function() {
		var currentCity = BTG.L_KV.getValue("currentCity");
		if(!currentCity)
			currentCity = 1;
		return currentCity;
	}
	BTG.GameData.getCurrentLevel = function() {
		var currentLevel = BTG.L_KV.getValue("currentLevel");
		if(!currentLevel)
			currentLevel = 1;
		return currentLevel;
	}
})(BTG);