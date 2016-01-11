/**
 * Created by Jelle on 9/01/2016.
 */

(function () {
    "use strict";

    var mapController = function ($scope, $http, $location) {

        $scope.mapData = {};

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
                console.log("Happy");
                happy = true;
            }else{
                happy=false;
            }

            var mapData = {
                userid: $scope.user._id,
                message: $scope.mapData.message,
                mood: happy,
                //TODO map location ophalen via google maps
                lat: 50,
                long: 3
            };

            $http.post('/event', mapData)
                .success(function(data){
                    //Show errors if any happend
                    $scope.error = data.error;
                    //redirect if any redirects are given
                    $location.path(data.redirect);
                });
        };
    };

    angular.module('geofeelingsApp').controller('mapController', ["$scope", "$http", "$location", mapController]);
})();