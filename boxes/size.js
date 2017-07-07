$(document).ready(function () {
	var navWidth = window.innerWidth - 30;
	var navHeight = window.innerHeight - 30;
	var	resizeContainer = function () {
		if (window.innerWidth > window.innerHeight) {
			$("#container").css({'height' : navHeight+'px'});
			$("#container").css({'width' : navHeight+'px'});
		}
		else{
			$("#container").css({'height' : navWidth+'px'});
			$("#container").css({'width' : navWidth+'px'});
		}; 
	};
	$( window ).resize(function() {
		navWidth = window.innerWidth - 30;
		navHeight = window.innerHeight - 30;
		resizeContainer();	
	});
	resizeContainer();
});