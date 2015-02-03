$.ajaxSetup({
    timeout: 15000 //Time in milliseconds
});

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}


function ucfirst(str) {
  str += '';
  var f = str.charAt(0)
    .toUpperCase();
  return f + str.substr(1);
}

function getParaByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function debugObj(obj) {
var output = '';
	for(var index in obj) {
		var value = obj[index];
		output = output + index + '=' + value+'<br />';
	}
	return output;
}

function isUndefined(value) {
	(typeof value === "undefined") ?true: false;
}

function appObj(options) {
	var instance = this;
	var options = options || '';
	this.opt = {}
	this.opt.nameSpace = options.namespace || 'app.caminsderonda.lite';
	this.opt.version = options.version || '1.1';

	this.settings = {}
	
	
	//private functions
	var _isEmpty = function(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) return false;
		}
		return true;
	}	
	
	
	//public methods
	this.loadSettings = function() {
		var settings = {}
		if (!_isEmpty(localStorage.getItem(instance.opt.nameSpace))) {
			settings = JSON.parse(localStorage.getItem(instance.opt.nameSpace));
		} else settings.showChangeLog = true;
		instance.settings = settings;
	}
	
	this.saveSettings = function() {
		localStorage.setItem(instance.opt.nameSpace, JSON.stringify(instance.settings));
	}
	
	this.clearSettings = function() {
		localStorage.clear(instance.opt.nameSpace);
	}		
	
	this.init = function() {
		instance.loadSettings(); //load previus settings
		instance.onInit(instance.opt); //launch fired onInit event
		
	}
	
	//fired events
	this.onInit = function() {}

}

//remember page for back
$(document).on("click", "a", function(event){
	//alert('click');
	if ($(this).data('action') == 'back') {
		event.preventDefault();
		$('#viewPort').transition({scale: '1.3', opacity: 0},function() {
			window.history.back();
		});
	} if ($(this).data('action') == 'lock') {
		event.preventDefault();
		var userQuery = confirm('Disponible en la versión pro, ir a GooglePlay?');
		if (userQuery)	navigator.app.loadUrl('https://play.google.com/store/apps/details?id=app.viasferratasandorra.pro',{openExternal:true});
	
	} else if ((!this.target) || (this.target =='_self')) {
	} else {
		//alert('external link');
		event.preventDefault();
		navigator.app.loadUrl(this.href,{openExternal:true});
	}
});