$.fn.isOnScreen = function(){
	
	var win = $(window);
	
	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();
	
	var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
	
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	
};


$(document).ready(function() {
	//onDeviceReady(); //remover la linea en la versión final
	$('#btnReportBug').css({y:80});
	
	$('#changeLogCard').hide();
	$('#viewPort').css({scale: '0.7', opacity: 0});
	$('#viewPort').transition({scale: '1.0', opacity: 1});

	$('.content').scroll(function() {

		clearTimeout($.data(this, 'scrollTimer'));
		$.data(this, 'scrollTimer', setTimeout(function() {
			// do something
			console.log("Haven't scrolled in 250ms!");
			if ($('#newFeatures').isOnScreen()) {
				console.log('element visible');
			
				if (!$('#btnReportBug').is(':visible')) {
					$('#btnReportBug').show().transition({y:0, opacity: 1},function() {
							$(this).show();
							console.log('end transition');
					});		
				}
				console.log('float button visible');
			} else {
				
				if ($('#btnReportBug').is(':visible')) {
				console.log('hide element');
					$('#btnReportBug').transition({y:80, opacity: 0},function() {
						console.log('end transition2');+
						$(this).hide();
					});
				}
			}
		}, 250));
	});	
		
});


//Bind events
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackButton, false);


function onDeviceReady() {


}

function onBackButton() {
	$('#btnBack').trigger('click');
}