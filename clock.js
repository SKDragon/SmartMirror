function startTime() {
  var today = new Date();
  var h = today.getHours();
  //h = 0;
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  var n = formatDate(today);

  if (checkHrPM(h)){
      if (h>12){
        h = h-12;
      }
  	document.getElementById('txt').innerHTML =
  	h + ":" + m + "pm";
  }
  else{
      if (h==0){
          h = 12;
      }
  	document.getElementById('txt').innerHTML =
  	h + ":" + m + "am";
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
