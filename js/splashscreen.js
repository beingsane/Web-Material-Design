function debugObj(obj) {
	output = 'debug:<br />';
	for(var index in obj) {
		var value = obj[index];
		output = output + index + '=' + value+'<br />';
	}
	return output;
}

function splashScreenClass(totalSteps) {
	var instance = this;
	this.totalPhase = totalSteps || 1;
	this.stepFinished = 0;
	var idTimer = null;
	this.onError = function() {}
	
	//set duration to load 30 seconds and show button go
	setTimeout(function() { instance.onError(); }, 10000);

		
	//fired events
	this.onFinished = function() {}
	
	//private functions
	var _checkIfFinished = function() {
		console.log('check phase' + instance.stepFinished);
		if (instance.stepFinished >= instance.totalPhase ) {
			clearInterval(idTimer);
			instance.onFinished();
		}
	}
	
	//public functions
	this.init = function() {
		idTimer = setInterval(function() {_checkIfFinished()}, 1000);
	}
	
	this.stepEnd = function() {
		++instance.stepFinished;
	}
	
}
//1 load resources 
var splashScreen = new splashScreenClass(1);

$(document).ready(function() {
	$('#viewPort').css({opacity: 0});
	$('#phaseTitle').css({opacity:0});
	$('#btnGo').hide();
	
	$('#viewPort').transition({opacity: 1,duration: 2000},function() { 
		splashScreen.init();
		$('#phaseTitle').transition({opacity:1});
	});
	
	splashScreen.onFinished = function() {
		$('#phaseTitle').transition({opacity:0});
		$('#viewPort').delay(1000).transition({opacity: 0,duration: 1000},function() { 
			window.location.replace('main.html');
		});
	};
	
	splashScreen.onError = function() {
		$('#btnGo').show('slow');
	}

});

//todo los recursos cargados
jQuery(window).load(function () {
	splashScreen.stepEnd();
	//check if internet is one
	//if (navigator.onLine) splashScreen.stepEnd();
});