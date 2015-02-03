$(document).ready(function() {
	advertisement.init();

	$('#changeLogCard').hide();
	$('#viewPort').css({scale: '0.7', opacity: 0});
	$('#viewPort').transition({scale: '1.0', opacity: 1});	
	
	var app = new appObj();
	
	//Launch APP
	app.init();
	
});