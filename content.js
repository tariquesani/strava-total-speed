// content.js
function main(userPrefs){
    var authKey = userPrefs.authKey;

    var href = window.location.href;

    var activityId = href.substr(href.lastIndexOf('/') + 1)

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://www.strava.com/api/v3/activities/"+activityId,
      "method": "GET",
      "headers": {
        "authorization": "Bearer "+authKey,
        "cache-control": "no-cache",
      }
    }

    $.ajax(settings).done(function (response) {
      timeElapsed = $( "[data-glossary-term='definition-elapsed-time']" ).parent().next().html();

      if (response.type == "Run") {
        totalPace = ((response.elapsed_time)/(response.distance/1000));
        totalPace = fmtMSS(totalPace.toFixed(0));
        timeElapsed += " ("+totalPace+"/km)";        
      } else {
        totalSpeed = ((response.distance/response.elapsed_time)/1000)*3600;
        totalSpeed = totalSpeed.toFixed(2);
        timeElapsed += " ("+totalSpeed+" km/h)";
      }

    	$("[data-glossary-term='definition-elapsed-time']").parent().next().html(timeElapsed);
    });
}

// From https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds 
function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

chrome.storage.sync.get('authKey', main);
