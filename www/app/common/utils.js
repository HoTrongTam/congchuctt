/*
* Utils
* @2017
*/

(function() {
'use strict';

if (!Array.prototype.indexOfPropertyValue) {
    Array.prototype.indexOfPropertyValue = function(prop, value) {
    	for (var i = 0; i < this.length; ++i){
        	if (this[i][prop]){
				if (this[i][prop] === value){
            		return i;
				}
			}
		}
		return -1;
	};
}

if (!Array.prototype.countOfPropertyValue) {
	Array.prototype.countOfPropertyValue = function(prop, value) {
		var count = 0;
		for (var i = 0; i < this.length; ++i){
			if (this[i][prop] !== null){
				if (this[i][prop] === value){
					++count;
				}
			}
		}
		return count;
	};
}

if (!String.prototype.escapeSpecialChars) {
	String.prototype.escapeSpecialChars = function() {
	    return this.replace(/\\n/g, "\\n")
	               .replace(/\\'/g, "\\'")
	               .replace(/\\"/g, '\\"')
	               .replace(/\\&/g, "\\&")
	               .replace(/\\r/g, "\\r")
	               .replace(/\\t/g, "\\t")
	               .replace(/\\b/g, "\\b")
	               .replace(/\\f/g, "\\f");
	};
}

if (!String.prototype.removeUnicode) {
	String.prototype.removeUnicode = function() {
		return 	this.toLowerCase()
					.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a")
					.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e")
					.replace(/ì|í|ị|ỉ|ĩ/g,"i")
					.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o")
					.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
					.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
					.replace(/đ/g,"d")
		;
	};
}


angular
	.module('FTravel.factory')
	.factory('Utils', utils)
;

utils.$inject = [
	'CONST'
];

function utils(
	CONST
) {
	return {
		platform: function(){
			var OSName="Unknown OS";

			if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
			if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
			if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
			if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

			return OSName;
		},
		rateApp: function(){
			AppRate.preferences.storeAppURL.ios = 'AppId';
		    AppRate.preferences.storeAppURL.android = 'market://details?id=<package_name>';
		    // AppRate.preferences.storeAppURL.blackberry = 'appworld://content/[App Id]/';
		    // AppRate.preferences.storeAppURL.windows8 = 'ms-windows-store:Review?name=<the Package Family Name of the application>';
		    AppRate.promptForRating();
		}
	};
}


})();
