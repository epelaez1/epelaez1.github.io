var array1 = ['<img class="image" src="1.png">','<img class="image" src="2.png">','<img class="image" src="3.jpg">','<img class="image" src="4.png">','<img class="image" src="5.png">','<img class="image" src="6.png">','<img class="image" src="7.png">','<img class="image" src="8.png">'];
var array2 = [];
for (var i = 0; i < 8; i++) {
	array2.push(array1[i]);
	array2.push(array1[i]);
};
var sort = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
sort.sort( randOrd );

function randOrd(){
return (Math.round(Math.random())-0.5); 
};

var startgame = function() {
	var c = $('#box');
	$('#button1').click(function(){
		c.html(" ");
		for (var i = sort.length - 1; i >= 0; i--) {
			var boxvalue = c.html();
			c.html(boxvalue +'<div id="block" class="block"><img class="logo" src="ironhack.png" />'+ array2[sort[i]]+'</div>')
		};		
		$(".block").on("click" , function(){
			$(this).children(".image").addClass("animation");
			if ($(".animation").size() == 2) {
				equal();
			}
			else if ($(".animation").size() > 2){
				$("img").removeClass("animation");
			};		
		});		
	});	
}

var equal = function(){
	var flipped = $(".animation");
 	if ($(flipped[1]).attr("src") == $(flipped[0]).attr("src")) {
	 	setTimeout(
	 		function(){
	 			for (var i = 0; i < 2; i++) {
	 				$(flipped[i]).removeClass("animation");		 					
	 				$(flipped[i]).parent().addClass("invisible");
	 			};
	 			if ($(".invisible").size() == 16) {
	 				$("#box").css("background-image","url(win.jpg)"); 
	 			};			
			},1000
	 	);
	 }
	 else{
	 	setTimeout(function(){flipped.removeClass("animation")}, 1000);
	 };
};
