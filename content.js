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
      
    	totalSpeed = ((response.distance/response.elapsed_time)/1000)*3600;
    	totalSpeed = totalSpeed.toFixed(2);
    	var timeElapsed = $( "[data-glossary-term='definition-elapsed-time']" ).parent().next().text();

    	timeElapsed += " ("+totalSpeed+" km/h)";

    	$("[data-glossary-term='definition-elapsed-time']").parent().next().text(timeElapsed);
    });
}

chrome.storage.sync.get('authKey', main);

