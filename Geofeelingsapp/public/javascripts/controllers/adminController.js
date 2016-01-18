/**
 * Created by Jelle on 11/01/2016.
 */

(function () {
    "use strict";

    var adminController = function ($scope, $http, $location, $route) {
        //Request all map events
        $http.get('/admin').success(function (data) {
            $scope.user = data.user;
            $location.path(data.redirect);
            $scope.events = data.events;
            $scope.users = data.users;

        });

        $scope.deleteEvent = function (event) {
            $http.post('/deleteevent' + event._id).success(function (data) {
                $location.path(data.redirect);
                $route.reload();
            });
        };

        $scope.changeAdmin = function (user) {
            user.id = user._id;
            $http.post('/changeAdmin', user).success(function (data) {

            });
        };

        $scope.deleteUser = function (user) {
            //TODO Delete user
            alert("nog geen code voor deleten " + user.username);
        };

        $scope.logout = function () {
            //Request the logout from the server
            $http.get('/logout').success(function (data) {
                //Redirect to the returned location
                $location.path(data.redirect);
            });
        };
    };

    angular.module('geofeelingsApp').controller('adminController', ["$scope", "$http", "$location", "$route", adminController]);
})();