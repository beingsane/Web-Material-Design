/*
version: 1.5
Usage:
	advertisement.init(mseconds);
	advertisement.pause();
	advertisement.mSeconds = 30000; Mili seconds for watch each ad
	advertisement.mDelay = 1500; Delay for load banner
*/
var advertisement = {
	timerId : 0,
	mSeconds : 30000,
	mDelay : 1500,
	idInterval: null,
	sourceAds : "http://costabravabeaches.webserveis.com/banners/advertisements.php",
	init : function(mSec) {

		var self = this;
		if (typeof mSec === "undefined") mSec = self.mSeconds;
		 $('.advertBlock').hide().delay( this.mDelay ).slideToggle('slow');
		this.idInterval = setInterval(function() {
		   self.drawAd();
		}, mSec);
  },
	drawAd : function() {
		var self = this;

		if (navigator.onLine) {
			//si hay internet descarga un nuevo banner
			var el = $('.advertBlock');
			el.slideToggle('slow', function() {
					
				$.ajax({url: self.sourceAds,success:function(result){
					el.empty().html(result);
				}});
			}).delay(this.mDelay).slideToggle('slow');
		}
	},
	pause : function() {
		clearInterval(this.idInterval);
	}
	
}
/*$.ajaxSetup( {
	xhr: function() {return new window.XMLHttpRequest({mozSystem: true});}
});*/


// Add a listener that constantly changes the title
document.addEventListener('visibilitychange', function() {
	//comprueba si se ha cambiado el foco de la aplicación
	if (document['visibilityState'] == "hidden") {
		advertisement.pause(); //se pausa la descarga de nuevos anuncios para no consumir datos extra
	} else if(document['visibilityState'] == 'visible') {
		advertisement.init(); //inicializa la descarga de nuevos anuncios
	}
}, false);