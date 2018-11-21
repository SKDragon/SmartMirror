const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  //document.getElementById('calendar').innerHTML = "yes hello";
  const calendar = google.calendar({version: 'v3', auth});
  //var events = document.createElement("p");

  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        //const start = event.start.dateTime || event.start.date;
        // parse event
        const start = parseDate(event.start.dateTime, event.start.date, event.end.dateTime, "date");
        const time = parseDate(event.start.dateTime, event.start.date, event.end.dateTime, "time");

        console.log(`${start} - ${event.summary}: ${event.description}`);
        //var node= document.createTextNode(`${start} - ${event.summary}`);
        //events.appendChild(node);
        // if (`${events.description}` == "undefined"){
        //   document.getElementById('cal').innerHTML = document.getElementById('cal').innerHTML + "<br />" +`${start} - ${event.summary}:` + " No Description";
        // }
        // else{
        //   document.getElementById('cal').innerHTML = document.getElementById('cal').innerHTML + "<br />" +`${start} - ${event.summary}: ${event.description}`;
        // }

        printEvents(`${start}`, `${event.summary}`,`${time}`,event.location, event.description);

      });
    } else {
      console.log('No upcoming events found.');
    }
  });
  //var element = document.getElementById("calendar");
  //element.appendChild(events);
}


function printEvents(eventStart, eventSum, eventTime, eventLoc, eventDesc){

  var table = document.getElementById("table");
  var num_rows = table.rows.length;
  var row = table.insertRow();
  var start = row.insertCell(0);
  var event = row.insertCell(1);
  var time = row.insertCell(2);
  //var loc = row.insertCell(2);

  start.innerHTML = eventStart;
  event.innerHTML = eventSum;

  if (eventTime == "null"){
    time.innerHTML = "All Day";
  }
  else{
    time.innerHTML = eventTime;
  }




  // if (eventLoc == null){
  //   loc.innerHTML = "--";
  // }
  // else{
  //   loc.innerHTML = eventLoc;
  // }



  row.setAttribute("class", "view-me");

  // $(document).ready(function(){
  //   // $(".content").click(function(){
  //   //     $(this).closest('tr').next('tr.content-row').toggleClass('hidden');
  //   // });
  // });

  $(function() {
    $(row).after($('<tr class="hidden content-row"><td colspan="1">Location:</td><td colspan="2">'+ eventLoc +'</td></tr>'));
    $(row).after($('<tr class="hidden content-row"><td colspan="1">Description:</td><td colspan="2">'+ eventDesc +'</td></tr>'));
  });
  // $(document).on('click', '.view-me', function() {
  //   //$(this).closest('tr').toggleClass('hidden');
  //   $(row).closest('tr').next('tr').toggle();
  // });

  // $(function(){
  // 	$('tr:visible').click(function(){
  // 		$(this).next().toggle()
  // 	});
  // });




}

$(document).on('click', '.view-me', function() {
  //$(this).closest('tr').toggleClass('hidden');
  $(this).closest('tr').next('tr').toggle();
  $(this).closest('tr').next('tr').next('tr').toggle();
  $(this).closest('tr').next('td').next('td').next('td').css("height", "auto");
});

function parseDate(startDateTime, date, endDateTime,getDateOrTime){

  if (date != null){
    if (getDateOrTime=="date"){
      return date;
    }
    else if (getDateOrTime=="time"){
      return "null";
    }
  }
  else{
    var dates = startDateTime.split('T');
    if (getDateOrTime=="date"){
      return dates[0];
    }
    else if (getDateOrTime=="time"){
      var start = dates[1].split("-")[0];
      var end= endDateTime.split('T')[1].split("-")[0];
      var time = start + "-" + end;
      return time;
      // var start = dates[1].split("-");
      // return start;
    }
  }
}


function showDetails(){
  document.getElementById('test').innerHTML = "clicked";
}
