var randomColor
var getRandomColor = function () {
	randomNumberOfColor = Math.round(Math.random()*(numberOfColors - 1));
	randomColorSelected = colors[randomNumberOfColor];
	randomColor = randomColorSelected
};

var colors = ["cian","blue","green","orange","black","purple"];
var userSolution = [];
var solution = [];
var ready = false;
var showX = true;
var randomNumberOfOneBox
var generateRandomNumberOfOneBox = function(){ 
	randomNumberOfOneBox = Math.round(Math.random()*(numberOfBoxes - 1));
};
var generateRandomNumberOfOneBoxWithoutSpecialsBoxes = function(){ 
	randomNumberOfOneBox = Math.round(Math.random()*(numberOfBoxes - 2));
};


var addFakeColor = function () {
	
	generateRandomNumberOfOneBoxWithoutSpecialsBoxes();
	if (doubleBox) {
		$(".specialBox").after('<div class="box ' + randomColor + '" boxColor="'+ randomColor +'"></div>');
	}
	else{
		$($(".box")[randomNumberOfOneBox]).after('<div class="box ' + randomColor + " fake" +'" boxColor="'+ randomColor +'"></div>');
		if (showX) {
			$(".fake").toggleClass("cross")
			showX = false;
			
		};
	};
	
}

var	resizeBox = function (number,limit) {
	if (number%limit != 0){
		$($(".box")[number]).toggleClass("specialBox");
	};
}
var makeSolution = function  (numberOfColors , numberOfBoxes) {
	solution = [];
	if (numberOfColors <= numberOfBoxes) {
		for (var i = numberOfColors - 1; i >= 0; i--) {
			solution.push(colors[i]);
		};
		if (solution.length < numberOfBoxes){
			for (var i = numberOfBoxes - solution.length; i > 0; i--) {
				solution.sort(function() {return Math.random() - 0.5});
				solution.push(solution[0]);
			};
		} else {
			solution.sort(function() {return Math.random() - 0.5});
		};
	} else {
		console.log("numberOfColors > numberOfBoxes")
	};
};
var	displayBoxes = function () {
	var boxes = [];
	for (var i = solution.length - 1; i >= 0; i--) {
		boxes.push(solution[i]);
	};	
	boxes.sort(function() {return Math.random() - 0.5});
	var container = $("#container");
	container.empty();
	for (var i = boxes.length; i > 0; i--) {
		container.append('<div class="box ' + boxes[i-1] + '" boxColor="'+ boxes[i-1] +'"></div>');
	};
	if (doubleBox) {
		generateRandomNumberOfOneBox();
		resizeBox(randomNumberOfOneBox , limitOfContainer);
	}
	if (fakeBox) {
		addFakeColor();
	};
	
};

var showSolution = function () {
	var i = 0
	function loop () {
		setTimeout(function(){
			$("." + solution[i]).not(".zoomOut").not(".fake").first().toggleClass("zoomOut");
			i++;
			if (i < solution.length) {
				loop();
			}else if (i = solution.length) { 
				setTimeout(function(){
					displayBoxes();
					ready = true;
				},1000);
			};
		}, showSolutionSpeed);		
	};
	loop();
};
var contentsTheSame = function (shortArray, longArray) {
	for (var i = 0; i < shortArray.length ; i++){
	    if (shortArray[i] !== longArray[i]){
	        return false;
	    };
	};
	return true; 
};
var start = function (numberOfColors, numberOfBoxes) {
	makeSolution(numberOfColors,numberOfBoxes);
	if (fakeBox) {
		getRandomColor();
	};
	displayBoxes();
	showSolution();
	
};
var restart = function (failedBox, numberOfColors, numberOfBoxes){
	ready = false;
	showX = true;
	failedBox.toggleClass("shake");
	setTimeout(function(){
		failedBox.toggleClass("shake");
		$(".zoomOut").toggleClass("zoomOut");
		start(numberOfColors,numberOfBoxes);
	},750);

};
$(document).ready(function(){
	$(document.body).on("click",".box:not(.zoomOut)",function(){
		if (ready == true) {
			var	clicked = $(this);
			var clickedColor = $(this).attr("boxColor");
			userSolution.push(clickedColor);
			if (userSolution.length == solution.length) {
				if (contentsTheSame(userSolution,solution)) {
					clicked.toggleClass("zoomOut");
					setTimeout(function(){
						window.location="../"+ nextLvl + "/" + nextLvl + ".html";
					},1000);
				}
				else{
					userSolution = [];
					restart(clicked, numberOfColors, numberOfBoxes);
				};
			}
			else if (!contentsTheSame(userSolution,solution)) {
					userSolution = [];
					restart(clicked, numberOfColors, numberOfBoxes);
			}
			else{
				clicked.toggleClass("zoomOut");
			};
		};
	});
});