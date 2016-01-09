/**
 * Created by Jelle on 29/12/2015.
 */

(function(){
    "use strict";

    var app = angular.module('geofeelingsApp', ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/account", {
            templateUrl: "../account.html"
        }).when("/map", {
            templateUrl: "../map.html"
        }).otherwise({
            redirectTo: "/map"
        });
    });
})();
