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
      //console.log($( "[data-glossary-term='definition-elapsed-time']" ).parent().next().html());

      if (response.type == "Run") {
        totalPace = ((response.elapsed_time/60)/(response.distance/1000));
        totalPace = totalPace.toFixed(2);
        timeElapsed += " ("+totalPace+"/km)";        
      } else {
        totalSpeed = ((response.distance/response.elapsed_time)/1000)*3600;
        totalSpeed = totalSpeed.toFixed(2);
        timeElapsed += " ("+totalSpeed+" km/h)";
      }

    	$("[data-glossary-term='definition-elapsed-time']").parent().next().html(timeElapsed);
    });
}

chrome.storage.sync.get('authKey', main);
