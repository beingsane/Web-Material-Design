$(document).ready(function() {
	advertisement.init();

	$('.content').scrollTop( 80 );
	$('#changeLogCard').hide();
	$('#viewPort').css({scale: '0.7', opacity: 0});
	$('#viewPort').transition({scale: '1.0', opacity: 1});	
	
	var app = new appObj();
	
	//Launch APP
	app.init();
	$.slidebars();

	//change log card options
	if (app.settings.showChangeLog === app.opt.version) {
		
		$('#toggle1').prop( "checked", false );
	} else {
		$('#changeLogCard').show();
		$('#toggle1').prop( "checked", true );
	}
	
	//btn close change log view
	$('#btnCloseChangeLog').click(function(event) {
		event.preventDefault();
		console.log('click btn hide change log');
		app.settings['showChangeLog'] = app.opt.version;
		//save in localStorage
		app.saveSettings();
		$('#changeLogCard').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
		
	});
	
	//button to share
	$('#btnShare').on('click', function(event) {
		event.preventDefault();
		window.plugins.socialsharing.share('Vías ferradas de Andorra', 'Descubre todas la vías ferradas de Andorra',null,'https://play.google.com/store/apps/details?id=app.viasferratasandorra.lite');
	});
	
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	//alert('onDeviceReady!');
		 
// Default handlers
    var successCallback = function() {
        //alert("Success app installed!");
    };
    var errorCallback = function(errMsg) {
        //alert("No instalado! " + errMsg);
		navigator.app.loadUrl('https://play.google.com/store/apps/details?id=app.alpify&hl=es',{openExternal:true});
    }
	
	$('#btnAlpify').click(function(event) {
		event.preventDefault();
		//alert('check alpify');
		window.plugins.launcher.launch({packageName:'app.alpify'}, successCallback, errorCallback);
	});
}