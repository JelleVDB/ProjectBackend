/**
 * Created by Jelle on 29/12/2015.
 */

(function(){
    "use strict";

    var app = angular.module('geofeelingsApp', ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/startpage", {
            templateUrl: "../startpage.html"
        }).when("/map", {
            templateUrl: "../map.html"
        }).when("/admin", {
            templateUrl: "../admin.html"
        }).when("/settings", {
            templateUrl: "../settings.html"
        }).otherwise({
            redirectTo: "/map"
        });
    });
})();
