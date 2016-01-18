/**
 * Created by Jelle on 11/01/2016.
 */

(function () {
    "use strict";


    var adminController = function ($scope, $http, $location) {
        //Request all map events


        $http.get('/admin').success(function (data) {
            $scope.user = data.user;
            $location.path(data.redirect);
            $scope.events = data.events;
            $scope.users = data.users;

        });

        $scope.deleteEvent = function (event) {
            if (confirm("Are you sure you want to delete the event?")) {
                $http.post('/deleteevent' + event._id).success(function (data) {
                    $location.path(data.redirect);

                    var index = $scope.events.indexOf(event);
                    $scope.events.splice(index, 1);
                });
            }
        };

        $scope.changeAdmin = function (user) {
            user.id = user._id;
            $http.post('/changeAdmin', user).success(function (data) {

            });
        };

        $scope.deleteUser = function (user) {
            if (confirm("Are you sure you want to delete the user: " + user.username)) {
                $http.post('/deleteuser' + user._id).success(function (data) {
                    $location.path(data.redirect);

                    var index = $scope.users.indexOf(user);
                    $scope.users.splice(index, 1);
                });
            }
        };

        $scope.logout = function () {
            //Request the logout from the server
            $http.get('/logout').success(function (data) {
                //Redirect to the returned location
                $location.path(data.redirect);
            });
        };
    };

    angular.module('geofeelingsApp').controller('adminController', ["$scope", "$http", "$location", adminController]);
})();