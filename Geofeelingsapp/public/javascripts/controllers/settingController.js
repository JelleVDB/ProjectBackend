/**
 * Created by sam_b on 16/01/2016.
 */

(function () {
    "use strict";

    var settingController = function ($scope, $http, $location, $route) {

        //Request the map page from the server
        $http.get('/settings').success(function(data) {
            //if the user is NOT logged in, it will return a redirect
            if(data.redirect) {
                $location.path(data.redirect);
            } else {
                //if the user IS logged in, it will return the user's data
                $scope.user = data;

                if($scope.user.chat)
                    $("#chat").prop("checked", true);
                else
                    $("#chat").prop("checked", false);
            }
        });

        $scope.saveChanges = function(){

            //Grab all input from the register form
            var userData = {
                //username: $scope.settingData.username,
                id: $scope.user._id,
                email: $scope.user.email,
                chat: $scope.user.chat
            };

            if(userData.chat === undefined)
                userData.chat = false;
            else
                userData.chat = true;

            //Post the register data to the server
            $http.post('/settings', userData)
                .success(function(data){
                    //Show errors if any happend
                    $scope.settingerror = data.error;
                    //redirect if any redirects are given
                    $location.path(data.redirect);
                });
        };

        $scope.logout = function() {
            //Request the logout from the server
            $http.get('/logout').success(function (data) {
                //Redirect to the returned location
                $location.path(data.redirect);
            });
        };

    };

    angular.module('geofeelingsApp').controller('settingController', ["$scope", "$http", "$location", "$route", settingController]);
})();