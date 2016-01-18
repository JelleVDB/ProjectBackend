/**
 * Created by Jelle on 12/01/2016.
 */

// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('geofeelingsApp')
    .factory('gservice', function ($http) {
        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];
        var filterLocations = [];

        // Selected Location (initialize to Ename)
        var selectedLat = 50.8570277;
        var selectedLong = 3.6319101000000273;


        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function (latitude, longitude) {

            // Clears the holding array of locations
            locations = [];
            filterLocations = [];


            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/events').success(function (response) {

                // Convert the results into Google Map Format
                locations = convertToMapPoints(response);

                // Then initialize the map.
                initialize(latitude, longitude, response);
            }).error(function () {
            });
        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function (response) {

            var userSearch = document.getElementById('tipue_search_input').value;
            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for (var i = 0; i < response.length; i++) {
                var event = response[i];

                var mood;
                if (event.mood) {
                    mood = "Happy";
                } else {
                    mood = "Unhappy";
                }
                // Create popup windows for each record
                var contentString =
                    '<b>Username</b>: ' +
                    "<a href='#/user/" + event.author + "'>" + event.author + "</a>" +
                    '<br><b>Mood</b>: ' + mood +
                    '<br><b>Message</b>: ' + event.message +
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(parseFloat(event.lat), parseFloat(event.long)),
                    markermessage: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: event.author,
                    mood: mood,
                    message: event.message
                });
            }
            // location is now an array populated with records in Google Maps format

            for(var location in locations){
                if(userSearch === ""){
                    filterLocations.push(locations[location]);
                }else if(userSearch === locations[location].username){
                    filterLocations.push(locations[location]);
                }
            }

            return filterLocations;
        };

        // Initializes the map
        var initialize = function (latitude, longitude, response) {

            // Uses the selected lat, long as starting point
            var myLatLng = {lat: parseFloat(selectedLat), lng: parseFloat(selectedLong)};

            // If map has not been created already...
            if (!map) {

                // Create a new map and place in the index.html page
                var map = new google.maps.Map(document.getElementById('map-canvas'), {
                    scrollWheel: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoom: 13,
                    center: myLatLng
                });
            }

            // Loop through each location in the array and place a marker
            locations.forEach(function (n, i) {
                var marker;
                if (response[i].mood) {
                    marker = new google.maps.Marker({
                        position: n.latlon,
                        map: map,
                        title: "Happy",
                        icon: "https://lh6.ggpht.com/GO-A_KjZDF9yJeeER2fajzO4MgqML-q2rccm27ynBlD6R-xOR3pJOb42WKfE0MNFtRsKwK4=w9-h9",
                    });
                } else {
                    marker = new google.maps.Marker({
                        position: n.latlon,
                        map: map,
                        title: "Unhappy",
                        icon: "https://lh3.ggpht.com/hx6IeSRualApBd7KZB9s2N7bcHZIjtgr9VEuOxHzpd05_CZ6RxZwehpXCRN-1ps3HuL0g8Wi=w9-h9",
                    });
                }


                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function (e) {

                    // When clicked, open the selected marker's message
                    currentSelectedMarker = n;
                    n.markermessage.open(map, marker);
                });
            });

            // Set initial location as a bouncing red marker
            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            lastMarker = marker;

        };


        // Refresh the page upon window load. Use the initial latitude and longitude
        /*google.maps.event.addDomListener(window, 'load',
         googleMapService.refresh(selectedLat, selectedLong));*/


        return googleMapService;
    });
