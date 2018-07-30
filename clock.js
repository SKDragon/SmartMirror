function startTime() {
    var today = new Date();
    var h = today.getHours();
    //h = 13;
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    if (checkHrPM(h)){
    if (h>12){
    	h = h-12;
    }
    	document.getElementById('txt').innerHTML =
    	h + ":" + m + "pm";
    }
    else{
    	document.getElementById('txt').innerHTML =
    	h + ":" + m + "am";
    }

    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function checkHrPM(i){
	if (i<12){
    	return false;
    }
    else{
    	return true;
    }
}
