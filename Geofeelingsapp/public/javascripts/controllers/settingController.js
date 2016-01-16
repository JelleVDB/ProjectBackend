/**
 * Created by sam_b on 16/01/2016.
 */

(function () {
    "use strict";

    var settingController = function ($scope, $http, $location) {

        $http.get('/settings').success(function(data) {
            $scope.user = data.user;
            $scope.events = data.events;
        });

        $scope.logout = function() {
            //Request the logout from the server
            $http.get('/logout').success(function (data) {
                //Redirect to the returned location
                $location.path(data.redirect);
            });
        };

    };

    angular.module('geofeelingsApp').controller('settingController', ["$scope", "$http", "$location", settingController]);
})();