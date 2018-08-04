(function() {
  "use strict";

  //Getting Geo Position
  var  tempType = "C";
  var lon;
  var lat;
  var y = document.getElementById("mainData");
  getLocation();

  function getLocation() {
      if (navigator.geolocation) {
           return navigator.geolocation.getCurrentPosition(showPosition, showError);
      }
       else {
         $("#mainData").html("Geolocation service is unavailable. Please try again later");
       }
  }

  function showPosition(position) {
      lat =  position.coords.latitude;
      lon =  position.coords.longitude;

      var address = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
        $.getJSON(address, function(data) {
              $("#mainData").html("Current temperature in <i>" + data.name + ", " + data.sys.country + "</i><br><span id='temp'>" + Math.round(data.main.temp) + "</span><span id='farcel'>&deg;C</> <br>");
              $("#desc").html(data.weather[0].description);
              $("#icon").attr("src", data.weather[0].icon);
              $("#farcel").on("click", function() {
                  if (tempType === "C") {
                  $("#temp").html(Math.round(32 + data.main.temp * 1.8));
                  $(this).html("&deg;F");
                  tempType = "F";
                } else {
                  $("#temp").html(Math.round(data.main.temp));
                  $(this).html("&deg;C");
                  tempType = "C";
                }
              });
        });
  }

  function showError(error) {
    $("#error").html(error.message);
    $("#icon").attr("src", "https://upload.wikimedia.org/wikipedia/commons/2/27/Alert-Stop-Warning-Error_icon.svg");
  }
})();
