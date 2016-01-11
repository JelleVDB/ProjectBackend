/**
 * Created by Jelle on 11/01/2016.
 */

(function () {
    "use strict";

    var adminController = function ($scope, $http, $location) {
        //Request all map events
        $http.get('/admin').success(function(data) {
            $scope.user = data.user;
            $location.path(data.redirect);
            $scope.events = data.events;
        });


    };

    angular.module('geofeelingsApp').controller('adminController', ["$scope", "$http", "$location", adminController]);
})();