//lys avis

var arabicTickerContent = '...';
var danishTickerContent = '...';
var tWidth = window.innerWidth; // width (in pixels)
var tHeight = '80px'; // height (in pixels)
var tcolour = '#ffffcc'; // background colour:
var moStop = true; // pause on mouseover (true or false)
var fontfamily = 'verdana,arial,sans-serif'; // font for content
var tSpeed = 5; // scroll speed (1 = slow, 5 = fast)
var cps = -tSpeed;
var aw, mq, aw, awDanish, mqDanish;
var fsz = parseInt(tHeight) - 30;

function startticker() {

	if (document.getElementById) {
		var tick = '<div style="position:relative;width:' + tWidth + ';height:'
				+ tHeight + ';overflow:hidden;background-color:' + tcolour
				+ '"';
		if (moStop)
			tick += ' onmouseover="cps=0" onmouseout="cps=-tSpeed"';
		tick += '><div id="mq" style="position:absolute;right:0px;top:0px;font-family:'
				+ fontfamily
				+ ';font-size:'
				+ fsz
				+ 'px;white-space:nowrap;"><\/div><\/div>';
		document.getElementById('ticker').innerHTML = tick;
		mq = document.getElementById("mq");
		mq.style.right = (10 + parseInt(tWidth)) + "px";
		mq.innerHTML = '<span id="tx">' + arabicTickerContent + '<\/span>';
		aw = document.getElementById("tx").offsetWidth;
		setInterval('scrollticker()', 40);
	}
}

function scrollticker() {
	mq.style.right = (parseInt(mq.style.right) > (-10 - aw)) ? mq.style.right = parseInt(mq.style.right)
			+ cps + "px"
			: parseInt(tWidth) + 10 + "px";

}

function startDanishticker() {

	if (document.getElementById) {
		var tick = '<div style="position:relative;width:' + tWidth + ';height:'
				+ tHeight + ';overflow:hidden;background-color:' + tcolour
				+ '"';
		if (moStop)
			tick += ' onmouseover="cps=0" onmouseout="cps=-tSpeed"';
		tick += '><div id="mqDanish" style="position:absolute;right:0px;top:0px;font-family:'
				+ fontfamily
				+ ';font-size:'
				+ fsz
				+ 'px;white-space:nowrap;"><\/div><\/div>';
		document.getElementById('Danskticker').innerHTML = tick;
		mqDanish = document.getElementById("mqDanish");
		mqDanish.style.right = (10 + parseInt(tWidth)) + "px";
		mqDanish.innerHTML = '<span id="txDanish">' + danishTickerContent
				+ '<\/span>';
		awDanish = document.getElementById("txDanish").offsetWidth;
		setInterval('danishScrollticker()', 40);
	}
}

function danishScrollticker() {
	mqDanish.style.right = (parseInt(mqDanish.style.right) < (10 + parseInt(tWidth))) ? parseInt(mqDanish.style.right)
			- cps + "px"
			: -awDanish + 10 + "px";
}

function readSingleFile(evt) {
	// Retrieve the first (and only!) File from the FileList object
	var f = evt.target.files[0];

	if (f) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;
			arabicTickerContent = contents;
			startticker();
			hideFileChooser();
		};
		r.readAsText(f, "UTF-8");
	} else {
		alert("Failed to load file");
	}
}

function hideFileChooser() {

	// document.getElementById('fileinput').hidden = "hidden";
}

function readSingleFile3(evt) {
	// Retrieve the first (and only!) File from the FileList object
	var f = evt.target.files[0];

	if (f) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;
			danishTickerContent = contents;
			startDanishticker();
			hideFileChooser3();
		};
		r.readAsText(f, "UTF-8");
	} else {
		alert("Failed to load file");
	}
}

function hideFileChooser3() {

	// document.getElementById('fileinput3').hidden = "hidden";
}

function initLysAvis() {

	document.getElementById('fileinput').addEventListener('change',
			readSingleFile, false);
	document.getElementById('fileinput3').addEventListener('change',
			readSingleFile3, false);

}
