/**
 * Created by Jelle on 29/12/2015.
 */

(function () {
    "use strict";

    var app = angular.module('geofeelingsApp', ["ngRoute"]);

    var hostname = window.location.protocol + "//" + window.location.host + "/";
    var socket = io.connect(hostname);

    app.config(function ($routeProvider) {
        $routeProvider.when("/startpage", {
            templateUrl: "../startpage.html"
        }).when("/map", {
            templateUrl: "../map.html"
        }).when("/admin", {
            templateUrl: "../admin.html"
        }).when("/settings", {
            templateUrl: "../settings.html"
        }).when("/user/:param", {
            templateUrl: "../userfeed.html"
        }).otherwise({
            redirectTo: "/map"
        });
    });

    app.factory('socket', function () {
        return socket;
    });
})();
