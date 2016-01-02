/**
 * Created by Jelle on 29/12/2015.
 */

(function(){
    "use strict";

    var app = angular.module('geofeelingsApp', ["ngRoute"]);

    //TODO routing aanpassen
    app.config(function ($routeProvider) {
        $routeProvider.when("/login", {
            templateUrl: "../login-beta.html"
        }).when("/register", {
            templateUrl: "../register-beta.html"
        }).when("/", {
            templateUrl: "../map.html"
        }).otherwise({
            redirectTo: "/login"
        });
    });
})();
