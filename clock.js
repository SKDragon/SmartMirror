const {fs} = require('./calendar.js');
var toggleSecs = 1;
var toggle24hr = 0;
function startTime() {


  var clockbutton = document.getElementById("clock");
  clockbutton.onclick = function(){
    if (toggleSecs ==1){
      toggleSecs = 0;
      if (toggle24hr==0){
        document.getElementById("clock").style.width = "3.3em";
      }
      else{
        document.getElementById("clock").style.width = "4em";
      }
      //document.getElementById("clock").style.width = "3em";
    }
    else{
      toggleSecs = 1;
      if (toggle24hr==0){
        document.getElementById("clock").style.width = "5em";
      }
      else{
        document.getElementById("clock").style.width = "6em";
      }
      //document.getElementById("clock").style.width = "6em";
    }
  };

  var hrbutton = document.getElementById("hr");
  hrbutton.onclick = function(){
    if (toggle24hr ==0){
      toggle24hr = 1;
      if (toggleSecs==1){
        document.getElementById("clock").style.width = "6em";
      }
      else{
        document.getElementById("clock").style.width = "4em";
      }
    }
    else{
      toggle24hr = 0;
      if (toggleSecs ==1){
        document.getElementById("clock").style.width = "5em";
      }
      else{
        document.getElementById("clock").style.width = "3.3em";
      }
    }
  };


  var today = new Date();
  var h = today.getHours();
  //h = 0;
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  var n = formatDate(today);

  //
  if (toggle24hr == 0){
    if (checkHrPM(h)){
        if (h>12){
          h = h-12;
        }
        if (toggleSecs == 1){
    	    document.getElementById('clock').innerHTML =
    	    h + ":" + m + ":" + s + " ";
        }
        else{
          document.getElementById('clock').innerHTML =
    	    h + ":" + m + " ";
        }
        document.getElementById('hr').innerHTML = "PM";
    }
    else{
        if (h==0){
            h = 12;
        }
        if (toggleSecs ==1){
          document.getElementById('clock').innerHTML =
        	h + ":" + m + ":" + s + " ";
        }
        else{
          document.getElementById('clock').innerHTML =
    	    h + ":" + m + " ";
        }
    	document.getElementById('hr').innerHTML = "AM";
    }
  }
  else{
    if (toggleSecs ==1){
      document.getElementById('clock').innerHTML =
      h + ":" + m + ":" + s + " ";
    }
    else{
      document.getElementById('clock').innerHTML =
      h + ":" + m + " ";
    }
    document.getElementById('hr').innerHTML = "--";
  }



  document.getElementById('date').innerHTML = n;
  //console.log(formatDate(today));

  //
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

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
var weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

	var d = date.getDay();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return weekNames[d] + ', ' + monthNames[monthIndex] + ' ' + day + ', '+ year;
}

startTime();
