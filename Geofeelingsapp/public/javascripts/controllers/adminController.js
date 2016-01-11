/**
 * Created by Jelle on 11/01/2016.
 */

(function () {
    "use strict";

    var adminController = function ($scope, $http, $location) {
        //Request all map events
        $http.get('/events').success(function(data) {

        });


    };

    angular.module('geofeelingsApp').controller('adminController', ["$scope", "$http", "$location", adminController]);
})();