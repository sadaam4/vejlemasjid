// Global variable
var clock_face = null,
	clock_ctx = null;

	IMG_HEIGHT = 233,
	IMG_WIDTH = 145,
	
	DIGIT_HEIGHT = IMG_HEIGHT,
	DIGIT_WIDTH = 145,
	xPositions = null,
	xSecondStartPos = 0,
	secondWidth = 0,
	secondHeight = 0;
	
function clearCanvas() {
	 // clear canvas
	clock_ctx.clearRect(0, 0, IMG_HEIGHT, IMG_WIDTH);
}

function pad2(number) {
	return (number < 10 ? '0' : '') + number;
}

function draw() {
	
	var currentTime = new Date(),
		time = pad2(currentTime.getHours()) + pad2(currentTime.getMinutes()) + pad2(currentTime.getSeconds()),
		iDigit;
	clearCanvas();
	// Draw the HHHH digits onto the canvas
	for(iDigit = 0; iDigit < 4; iDigit++) {
		drawHHMMDigit(time, iDigit);
	}
	// Draw scalled second digits
	clock_ctx.drawImage(clock_face, time.substr(4, 1) * DIGIT_WIDTH, 0, DIGIT_WIDTH, DIGIT_HEIGHT, xSecondStartPos, 20, secondWidth, secondHeight);
	clock_ctx.drawImage(clock_face, time.substr(5, 1) * DIGIT_WIDTH, 0, DIGIT_WIDTH, DIGIT_HEIGHT, xSecondStartPos + secondWidth, 20, secondWidth, secondHeight);
}

function isOdd(num) {
	return num % 2;
}

function drawHHMMDigit(time, unit) {
	if(unit == 2){
		var sec = time.substr(5, 1);
		clock_ctx.font = 100 +"px Arial";
		clock_ctx.fillStyle ="#3D3D30";
		if(isOdd(sec)){
			clock_ctx.save();
			clock_ctx.fillStyle ="#E65C00";
			clock_ctx.font = 100 +"px Arial";
			//clock_ctx.fillStyle ="#f5f5f5";
			
		}
		clock_ctx.font = 100 +"px Arial";
		clock_ctx.fillText(":",IMG_WIDTH*2 -3  ,DIGIT_HEIGHT/2 +20);
		clock_ctx.restore();
	}
	clock_ctx.drawImage(clock_face, time.substr(unit,1) * DIGIT_WIDTH, 0, DIGIT_WIDTH, DIGIT_HEIGHT, xPositions[unit], 0, DIGIT_WIDTH, DIGIT_HEIGHT);
}

function imgLoaded() {
	// Image loaded event complete.  Start the timer
	//setInterval(draw, 1000);
	setInterval(function(){draw();}, 1000);
}

function init() {
	
	// Grab the clock element
	var canvas = document.getElementById('clock'),
		iHHMMGap = 25,
		iSSGap = 0;

	// Canvas supported?
	if (canvas.getContext('2d')) {
		clock_ctx = canvas.getContext('2d');

		// Load the clock face image
		clock_face = new Image();
		clock_face.src = 'digits_ur1.png';
		clock_face.onload = imgLoaded;

		xPositions = Array(DIGIT_WIDTH * 0,
							DIGIT_WIDTH * 1,
							(DIGIT_WIDTH * 2) + iHHMMGap,
							(DIGIT_WIDTH * 3) + iHHMMGap)
							
		xSecondStartPos = xPositions[3] + DIGIT_WIDTH + iSSGap;
		
		secondWidth = DIGIT_WIDTH * 0.25;
		secondHeight = DIGIT_HEIGHT * 0.25 ;
		
	} else {
		alert("Canvas not supported!");
	}
}