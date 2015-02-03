
$(document).ready(function() {
	advertisement.init();

	$('#viewPort').css({scale: '0.7', opacity: 0});
	$('#viewPort').transition({scale: '1.0', opacity: 1});	
	
	var app = new appObj();
	
	//Launch APP
	app.init();
	
	$('#btnClearData').click(function(e) {
		e.preventDefault();
		app.clearSettings();
	});
	
	
	/*set toggles*/
	if (app.settings.showChangeLog === app.opt.version) {
		$('#toggleAppNews').prop( "checked", false );
	} else {
		$('#toggleAppNews').prop( "checked", true );
	}
	
	
	/*toggle actions actions*/
	$('#toggleAppNews').change(function() {
		if(this.checked) {
			app.settings['showChangeLog'] = true;
		} else {
			app.settings['showChangeLog'] = app.opt.version;
		}
		app.saveSettings();
	});
	
	$('#toggleRemoveAd').change(function() {
		this.checked = true;
		var userQuery = confirm('Disponible en la versión pro, ir a GooglePlay?');
		if (userQuery)	navigator.app.loadUrl('https://play.google.com/store/apps/details?id=app.viasferratasandorra.pro',{openExternal:true});		
	});
	
	
});