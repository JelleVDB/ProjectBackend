
$(document).ready(function(){/* google maps -----------------------------------------------------*/
function initMap() {

  /* position Amsterdam */
  var latlng = new google.maps.LatLng(50.8570277, 3.6319101000000273);

  var mapOptions = {
    center: latlng,
    scrollWheel: false,
    streetViewControl: false,
    mapTypeControl: false,
    zoom: 13
  };
  
  var marker = new google.maps.Marker({
    position: latlng,
    url: '/',
    animation: google.maps.Animation.DROP
  });
  
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  marker.setMap(map);

};

  google.maps.event.addDomListener(window, 'load', initMap);
/* end google maps -----------------------------------------------------*/
});