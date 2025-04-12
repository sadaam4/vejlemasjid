// Global variable
var xPositions_Salah;
var clock_face_fajr = null;

var IMG_HEIGHT_SALAH = 137, IMG_WIDTH_SALAH = 84, DIGIT_HEIGHT_SALAH = IMG_HEIGHT_SALAH, DIGIT_WIDTH_SALAH = 84, xPositions_Salah = null;

function pad2(number) {
	return (number < 10 ? '0' : '') + number;
}
function initGlobals() {
	var iHHMMGap = 25;

	xPositions_Salah = Array(DIGIT_WIDTH_SALAH * 0, DIGIT_WIDTH_SALAH * 1,
			(DIGIT_WIDTH_SALAH * 2) + iHHMMGap, (DIGIT_WIDTH_SALAH * 3)
					+ iHHMMGap);

}

function drawSalah(canvas, prayerNumber, salahText, minutesLeft) {
	var ctx_fajr = canvas.getContext('2d');
	// var currentTime = new Date(),
	var salahTime = new Date();
	if (prayerNumber != null) {
		salahTime = getPrayer(prayerNumber);
	}
var nextSalahNumber = findNextSalah();
	var nextSalahTime;

	if (nextSalahNumber == 0 || nextSalahNumber == -1) {
		nextSalahTime = getPrayer(0);
		//check if we need to get the fajr of next day
		if (nextSalahNumber == -1) {
			nextSalahTime.setDate(nextSalahDate.getDate() + 1);
			nextSalahNumber = 0;
		}
	}else{
		nextSalahTime = getPrayer(nextSalahNumber);
	} 
	var  diffMs = 0;
	if(nextSalahNumber - prayerNumber == 1 || nextSalahNumber - prayerNumber == -5 ){
		diffMs =nextSalahTime -  new Date();
		minutesLeft = Math.floor((diffMs/1000)/60);
}
	var time = pad2(salahTime.getHours()) + pad2(salahTime.getMinutes());
	var iDigit;
	// console.log(time);
	ctx_fajr.clearRect(0, 0, canvas.width, canvas.height);
	ctx_fajr.fillStyle = "#000000";
	ctx_fajr.fill();

	ctx_fajr.fillStyle = "#3D3D30";
	canvas.style.border = "2px solid #0000ff";
	// mark next salah border;
	if (salahTime != null && nextSalahDate != null
			&& (salahTime.getHours() == nextSalahDate.getHours())) {
		ctx_fajr.fillStyle = "#0000ff";
		canvas.style.border = "10px solid #0000ff";
	}
	// start iqamah grafic
	if (prayerNumber != 1 && diffMs > 0) {

		if (isOdd(new Date().getSeconds())) {
			ctx_fajr.save();
			ctx_fajr.fillStyle = "#f5f5f5";
			ctx_fajr.fillRect(0, 140, canvas.width, canvas.height);
			ctx_fajr.restore();
			ctx_fajr.fillStyle = "#3D3D30";
			canvas.style.border = "5px solid #00CC00";
		} else {
			canvas.style.border = "5px solid #00CC00";
			ctx_fajr.fillStyle = "#00CC00";
			ctx_fajr.save();
			ctx_fajr.fillStyle = "#ff2a00";
			ctx_fajr.fillRect(0, 145, canvas.width, canvas.height);
			ctx_fajr.restore();
					
		}
	}
	
	ctx_fajr.font = 'Bold 56px Arial';
	ctx_fajr.fillText(salahText, 10, DIGIT_HEIGHT_SALAH + 60);

	
	//ctx_fajr.lineWidth = 1;
    // stroke color
	//ctx_fajr.strokeStyle = 'blue';
	//ctx_fajr.strokeText(salahText, 10, DIGIT_HEIGHT_SALAH + 60);
	
	
	// Draw the HHHH digits onto the canvas
	for (iDigit = 0; iDigit < 4; iDigit++) {

		if (iDigit == 2) {
			ctx_fajr.font = 80 + "px Arial";
			ctx_fajr.fillText(":", IMG_WIDTH_SALAH * 2 + 3,
					DIGIT_HEIGHT_SALAH / 2 + 20);
		}
		ctx_fajr.drawImage(clock_face_fajr, time.substr(iDigit, 1)
				* DIGIT_WIDTH_SALAH, 0, DIGIT_WIDTH_SALAH, DIGIT_HEIGHT_SALAH,
				xPositions_Salah[iDigit], 0, DIGIT_WIDTH_SALAH,
				DIGIT_HEIGHT_SALAH);
	}
	
}


function initSalah(salahName, prayerNumber, minutesLeft, salahText) {
    if (!xPositions_Salah) initGlobals();

    var canvas = document.getElementById(salahName);

    if (canvas.getContext('2d')) {
        ctx_fajr = canvas.getContext('2d');

        clock_face_fajr = new Image();
        clock_face_fajr.src = 'digits_32.png';
        clock_face_fajr.onload = function () {
            console.log("✔️ صورة digits_ur1.png تم تحميلها بنجاح");
            setInterval(function () {
                drawSalah(canvas, prayerNumber, salahText, minutesLeft);
            }, 1000);
        };

        clock_face_fajr.onerror = function () {
            console.error("❌ فشل في تحميل صورة digits_ur1.png");
        };
    } else {
        alert("Canvas not supported!");
    }
}

function stillInIqamah(salahDate, minutesParam) {

	var now = new Date();
	if (now.getDay() == 5 && getFredagsSalahDate() < nextSalahDate
			&& (nextSalah == 3)) {
		return false;
	}
	//
	// if( ((new Date()).getDay() == 5 && getFredagsSalahDate() < nextSalahDate)
	// ||
	// ((new Date()).getDay() == 5 && (nextSalah==2 ) ) ){
	// return false;
	// }

	if (now < salahDate) {
		return false;
	}
	var secDiff = Math.abs(Math.round(now - salahDate) / 1000);
	var days = calculateUnit(secDiff, 86400);
	var hours = calculateUnit((secDiff - (days * 86400)), 3600);
	var mins = calculateUnit((secDiff - (days * 86400) - (hours * 3600)), 60);
	if (hours == 0 && mins < minutesParam)
		return true;
	else
		return false;
}

function startSalahView() {
	initGlobals();
	initSalah('fajrClock', 0, 10, ' Fajr      الفجر');
	initSalah('shuruqClock', 1, 10, 'Shuruq الشروق');
	initSalah('duhurClock', 2, 10, 'Dhuhr    الظهر');
	initSalah('asrClock', 3, 10, 'Asr        العصر');
	initSalah('magribClock', 4, 5, 'Maghrib المغرب');
	initSalah('ishaaClock', 5, 10, 'Ishaa    العشاء');
}