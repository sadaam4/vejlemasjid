var standardWindowWidth = 2000;
var standardWindowHight = 1250;
var prayertimes;
var nextSalahDate;
var lastSalahDate;
var azanStarted = false;
var nextSalah = 0;
var hijriAdjustment = localStorage["hijriAdjustment"];
var fredagsSalah = localStorage["fredagsSalah"] || "130:30";

function drawTop() {
	//  document.getElementById('top').style.fontSize= 40 *  window.innerWidth / standardWindowWidth+"px";
	document.getElementById('top').style.fontSize = "30px";
	document.getElementById('top').innerHTML =

	'<table style="width: 100%;"><tr>' +
		'<td style="width: 40%; text-align: left;">' + getDateString() + '</td>' +
		'<td style="width: 20%; text-align: center;">' +
		'<img src="vejle_moske_logo.png" alt="Vejle Moske Logo" width="300" height="150">' +
		'</td>' +
		'<td style="width: 40%; text-align: right;">' + writeIslamicDate(hijriAdjustment) + '</td>' +
		'</tr></table>';
	setTimeout(function() {
		drawTop();
	}, 1000 * 60);
}

function drawTimeLeft() {
	var canvas = document.getElementById('status');

	if (canvas.getContext) {
		var c2d = canvas.getContext('2d');
		c2d.clearRect(0, 0, canvas.width, canvas.height);
		c2d.save();

		c2d.lineWidth = 1;
		var fontsize = 43;
		c2d.font = "Bold " + fontsize + "px Arial";
		c2d.textBaseline = "middle";
		c2d.textAlign = "center";

		timeLeftArabic = 'hello';
		timeLeftDanish = ' Tid tilbage til iqama: ';
		//c2d.strokeRect(15,260,500,100);
		var minutesLeft = 10;

		nextSalah = findNextSalah();
		var nextSalahArabic = '';
		var nextSalahdanish = '';

		if (nextSalah == 0 || nextSalah == -1) {
			nextSalahDate = getPrayer(0);
			//check if we need to get the fajr of next day
			if (nextSalah == -1) {
				nextSalahDate.setDate(nextSalahDate.getDate() + 1);
			}
			nextSalahArabic = 'الفجر';
			nextSalahdanish = 'Fajr ';
		} else
		/* 			if(nextSalah == 1){
		 nextSalahDate = getPrayer(1);
		 nextSalahArabic = 'الشروق';
		 nextSalahdanish = 'Shuruq ' ;
		 }
		 else
		 */
		if (nextSalah == 2 || nextSalah == 1) {
			nextSalahDate = getPrayer(2);
			nextSalahArabic = 'الظهر';
			nextSalahdanish = 'Duhur ';
		} else if (nextSalah == 3) {
			nextSalahDate = getPrayer(3);
			nextSalahArabic = 'العصر';
			nextSalahdanish = 'Asr ';

		} else if (nextSalah == 4) {
			nextSalahDate = getPrayer(4);
			nextSalahArabic = 'المغرب';
			nextSalahdanish = 'Magrib ';

		}

		else if (nextSalah == 5) {
			nextSalahDate = getPrayer(5);
			nextSalahArabic = 'العشاء';
			nextSalahdanish = 'Ishaa ';
			minutesLeft = 5;
		}

		c2d.save();
		c2d.fillStyle = "#EAC117";
		//c2d.fillRect(0,0, canvas.width, canvas.height);
		c2d.restore();
		c2d.fillStyle = "#E65C00";

		if (typeof lastSalahDate === 'undefined') {
			lastSalahDate = nextSalahDate;
		}

		var isStillFridayPrayer = false;
		var nuTid = new Date();
		if (nuTid.getDay() == 5) {
			if (nextSalah == 2
					|| (nextSalah == 3 && addMinutes(getFredagsSalahDate(),
							//fredagsSalahVarighed) > nuTid)) {
30) > nuTid)) {


				isStillFridayPrayer = true;
			}
		}

		/*if( nuTid.getDay() == 5 && addMinutes(getFredagsSalahDate(),fredagsSalahVarighed) > nuTid && 
			  (getFredagsSalahDate() < nextSalahDate || nextSalah==2)) {
		  isStillFridayPrayer = true;
		} */

//		if (!azanStarted) {
//			c2d.fillStyle = "#3D3D30";
//			if (!fredagsSalah) fredagsSalah = "13:"30; {
//				c2d.fillText(' Fredagsbøn kl. ' + fredagsSalah + ' ' + ' صلاة الجمعة الساعة ', 425, 25);
//			} else {
//				c2d.fillText('Næste salah ' + nextSalahdanish
//						+ checkTime(nextSalahDate.getHours()) + ':'
//						+ checkTime(nextSalahDate.getMinutes()) + ' '
//						+ 'الصلاة القادمة' + ' ' + nextSalahArabic, 425, 25);
//			}
//		}
		if (timeLeftCounter(lastSalahDate, minutesLeft) != 0) {

			if (!isStillFridayPrayer) {
				c2d.save();
				/*c2d.fillStyle = "#EAC117";
				c2d.fillRect(0, 0, canvas.width, canvas.height);
				c2d.restore();
				*/
				c2d.fillStyle = "#EAC117";
				c2d.fillRect(180, 0, 130, canvas.height);
				c2d.restore();
				
				c2d.fillStyle = "#E33";
				c2d.fillText(timeLeftCounter(lastSalahDate, minutesLeft)
						+ ' الوقت المتبقي لإقامة الصلاة ', 450, 25);
			}
			if (timeLeftCounter(lastSalahDate, minutesLeft) == '00:02'
					&& !azanStarted) {
				lastSalahDate = nextSalahDate;
				//var aZanAudio = document.getElementById("myAudioTagID");
				azanStarted = true;
				// aZanAudio.play();
			}
		} else {
			azanStarted = false;
		
				c2d.fillStyle = "#3D3D30"; 
				if (isStillFridayPrayer) {
					c2d.fillText(' Fredagsbøn er kl.   ' + fredagsSalah + '  ' + '  صلاة الجمعة الساعة ', 460, 25);
				} else {
					c2d.fillText('Næste salah: ' + nextSalahdanish
							+ checkTime(nextSalahDate.getHours()) + ':'
							+ checkTime(nextSalahDate.getMinutes()) + ' '
							+ 'الصلاة القادمة' + ': ' + nextSalahArabic, 460, 25);
				}
		}
		c2d.restore();
	}
	setTimeout(function() {
		drawTimeLeft();
	}, 1000);
}

function findNextSalah() {

	var nu = new Date();
	salah = -1;
	for ( var i = 0; i < 6; i++) {
		if (getPrayer(i) - nu > 0) {
			salah = i;
			break;
		}
	}
	return salah;
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
