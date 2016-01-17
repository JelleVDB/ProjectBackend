/**
 * Created by Jelle on 11/01/2016.
 */

(function () {
    "use strict";

    var adminController = function ($scope, $http, $location, $route) {
        //Request all map events
        $http.get('/admin').success(function(data) {
            $scope.user = data.user;
            $location.path(data.redirect);
            $scope.events = data.events;
            $scope.users = data.users;

            console.log($scope.users);
        });

        $scope.deleteEvent = function(event){
            $http.post('/deleteevent'+ event._id).success(function(data){
                $location.path(data.redirect);
                $route.reload();

            });
        };

        $scope.formatTime = function(time){
            var date = new Date(time);
            var dateString = date.getDate() + "/" + date.getMonth() +1 + "/" + date.getFullYear();

            return dateString;
        };
    };

    angular.module('geofeelingsApp').controller('adminController', ["$scope", "$http", "$location", "$route", adminController]);
})();