var Resource = {};
Resource.ResList = {}, Resource.getRes = function(key) {
	return Resource.ResList[key] ? Resource.ResList[key] : Resource.getPath(key);
}, Resource.getJSON = function(key) {
	var object = null;
	if(key.indexOf("pirateBoat") == 0) {
		object = SpriteConfig["pirateBoat_common"];
	} else {
		if(SpriteConfig[key]) {
			object = SpriteConfig[key];
		} else {
			object = Resource.getRes(key + "JSON");
		}
	}
	if(typeof object == "string")
		object = JSON.parse(object);
	return object.images = [Resource.getRes(key)], object;
}, Resource.getBitmap = function(key, object, i) {
	var bitmap = new GL.Bitmap(Resource.ResList[key]),
		config;
	return object
		&& (bitmap.regX = bitmap.image.width / 2, bitmap.regY = bitmap.image.height / 2), i
		&& (config = Resource.getRes(key + "Config"), $(config).find("sprite").each(function () {
		var object = $(this);
		object.attr("n") == i
			&& (bitmap.sourceRect = new GL.Rectangle(object.attr("x"), object.attr("y"), object.attr("w"), object.attr("h")), bitmap.regX = -object.attr("oX"), bitmap.regY = -object.attr("oY"))
	})), bitmap;
}, Resource.addRes = function(key, object) {
	Resource.ResList[key] = object;
}, Resource.getPath = function(key) {
	var object = "";
	return $(gameMain.assetsXML).find("asset").each(function () {
		$(this).attr("id") === key && (object = "assets/" + $(this).parent()[0].nodeName + "/" + $(this).attr("url"))
	}), object;
};