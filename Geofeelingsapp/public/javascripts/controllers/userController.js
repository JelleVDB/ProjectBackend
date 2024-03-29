/**
 * Created by Jelle on 17/01/2016.
 */

(function () {
    "use strict";

    var userController = function ($scope, $http, $location, $routeParams) {

        var username = $routeParams.param;
        $http.get('/user' + username).success(function (data) {
            $location.path(data.redirect);
            $scope.user = data.user;
            $scope.events = data.events;
            $scope.viewuser = data.viewuser;
        });

        $scope.logout = function () {
            //Request the logout from the server
            $http.get('/logout').success(function (data) {
                //Redirect to the returned location
                $location.path(data.redirect);
            });
        };

    };

    angular.module('geofeelingsApp').controller('userController', ["$scope", "$http", "$location", "$routeParams", userController]);
})();