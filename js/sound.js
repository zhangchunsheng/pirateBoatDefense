var basepath = "assets/sounds/";
var extension = ".mp3";
var sounds = {
	resources: [
		"explosion",
		"chooseLevel",
		"startGame",
		"fire"
	],
	explosion: basepath + "explosion" + extension,
	chooseLevel: basepath + "chooseLevel" + extension,
	startGame: basepath + "startGame" + extension,
	fire: basepath + "fire" + extension
};

var BTG = (function() {
	var BTG = {
		AUDIO_API: "audio_api",
		PHONEGAP_MEDIA: "phonegap_media",
		AUDIO_TAG: "audio_tag"
	};
	return BTG;
})();

(function(BTG) {
	BTG.Sound = function(soundType) {
		this.type = soundType;
		this.mediaList = {};
	};
	BTG.log = function(log) {
		console.log(log);
	};
})(BTG);

(function(Sound) {
	Sound.prototype.getType = function() {
		return this.type;
	};
	Sound.prototype.setType = function(soundType) {
		this.type = soundType;
	};
	Sound.prototype.init = function(sounds, mediaSuccess, mediaError, mediaStatus) {
		if(this.type == BTG.AUDIO_API) {
			
		} else if(this.type == BTG.PHONEGAP_MEDIA) {
			for(var i = 0 ; i < sounds.resources.length ; i++) {
				this.mediaList[sounds.resources[i]] = new Media(sounds[sounds.resources[i]], mediaSuccess, mediaError);
			}
		} else if(this.type == BTG.AUDIO_TAG) {
			for(var i = 0 ; i < sounds.resources.length ; i++) {
				this.mediaList[sounds.resources[i]] = new Audio();
				this.mediaList[sounds.resources[i]].src = sounds[sounds.resources[i]];
				this.mediaList[sounds.resources[i]].load();
			}
		}
	}
	Sound.prototype.play = function(soundName, loop) {
		if(this.type == BTG.AUDIO_API) {
			
		} else if(this.type == BTG.PHONEGAP_MEDIA) {
			var args = {};
			if(loop) {
				args.numberOfLoops = 10;
			}
			this.mediaList[soundName].play(args);
		} else if(this.type == BTG.AUDIO_TAG) {
			this.mediaList[soundName].play();
			if(loop) {
				this.mediaList[soundName].loop = true;
			}
		}
	};
	Sound.prototype.loop = function(soundName) {
		if(this.type == BTG.AUDIO_API) {
			
		} else if(this.type == BTG.PHONEGAP_MEDIA) {
			this.mediaList[soundName].loop();
		} else if(this.type == BTG.AUDIO_TAG) {
			this.mediaList[soundName].loop= !this.mediaList[soundName].loop;
		}
	},
	Sound.prototype.pause = function(soundName) {
		if(this.type == BTG.AUDIO_API) {
			
		} else if(this.type == BTG.PHONEGAP_MEDIA) {
			if(this.mediaList[soundName]) {
				this.mediaList[soundName].pause();
			}
		} else if(this.type == BTG.AUDIO_TAG) {
			this.mediaList[soundName].pause();
		}
	};
	Sound.prototype.stop = function(soundName) {
		if(this.type == BTG.AUDIO_API) {
			
		} else if(this.type == BTG.PHONEGAP_MEDIA) {
			if(this.mediaList[soundName]) {
				this.mediaList[soundName].stop();
			}
		} else if(this.type == BTG.AUDIO_TAG) {
			this.mediaList[soundName].stop();
		}
	};
	Sound.onSuccess = function() {
		BTG.log("playAudio(): Audio Success");
	};
	Sound.onError = function(error) {
		BTG.log("code: " + error.code + "\n" +
				"message: " + error.message + "\n");
	}
})(BTG.Sound);

window.BTG = BTG || {};