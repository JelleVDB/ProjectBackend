/**
 * Created by Jelle on 9/01/2016.
 */

(function () {
    "use strict";

    var mapController = function ($scope, $http, $location, geolocation, gservice) {

        //Variables
        $scope.mapData = {};
        var coords = {};
        var lat = 0;
        var long = 0;

        //Set initial coordinates
        $scope.mapData.lat = 50.8570277;
        $scope.mapData.long = 3.6319101000000273;

        geolocation.getLocation().then(function(data){
            // Set the latitude and longitude equal to the HTML5 coordinates
            coords = {lat:data.coords.latitude, long:data.coords.longitude};

            // Display coordinates in location textboxes rounded to three decimal points
            $scope.mapData.long = parseFloat(coords.long).toFixed(3);
            $scope.mapData.lat = parseFloat(coords.lat).toFixed(3);

            gservice.refresh($scope.mapData.lat, $scope.mapData.long);
        });

        //Request the map page from the server
        $http.get('/map').success(function(data) {
            //if the user is NOT logged in, it will return a redirect
            if(data.redirect) {
                $location.path(data.redirect);
            } else {
                //if the user IS logged in, it will return the user's data
                $scope.user = data;
            }
        });

        $scope.logout = function() {
            //Request the logout from the server
            $http.get('/logout').success(function (data) {
                //Redirect to the returned location
                $location.path(data.redirect);
            });
        };

        $scope.addToMap = function(){

            var happy = true;
            if($scope.mapData.mood === "1"){
                happy = true;
            }else{
                happy=false;
            }

            var mapData = {
                userid: $scope.user._id,
                author: $scope.user.username,
                message: $scope.mapData.message,
                mood: happy,
                lat: $scope.mapData.lat,
                long: $scope.mapData.long
            };

            $http.post('/event', mapData)
                .success(function(data){
                    //Show errors if any happend
                    $scope.error = data.error;
                    //redirect if any redirects are given
                    $location.path(data.redirect);

                    //leegmaken van form
                    $scope.mapData.message = "";

                    gservice.refresh(parseFloat($scope.mapData.lat), parseFloat($scope.mapData.long));
                });
        };
    };

    angular.module('geofeelingsApp').controller('mapController', ["$scope", "$http", "$location", "geolocation", "gservice", mapController]);
})();