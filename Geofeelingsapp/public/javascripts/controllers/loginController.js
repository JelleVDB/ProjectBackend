/**
 * Created by Jelle on 29/12/2015.
 */

(function () {
    "use strict";

    var loginController = function ($scope, $http, $location) {

        //Objects to store form Data
        $scope.registerData = {};
        $scope.loginData = {};

        $scope.register = function () {

            //Grab all input from the register form
            var userData = {
                username: $scope.registerData.username,
                password: $scope.registerData.password,
                email: $scope.registerData.email,
                age: Number($scope.registerData.age),
                gender: $scope.registerData.gender
            };

            //Post the register data to the server
            $http.post('/register', userData)
                .success(function (data) {
                    //Show errors if any happend
                    $scope.registererror = data.error;
                    //redirect if any redirects are given
                    $location.path(data.redirect);
                });
        };

        $scope.login = function () {

            //Grab data from the login form
            var loginData = {
                username: $scope.loginData.username,
                password: $scope.loginData.password
            };

            //Post the login data to the server
            $http.post('/login', loginData)
                .success(function (data) {
                    //Show errors if any happend
                    $scope.loginerror = data.error;
                    //redirect if any redirects are given
                    $location.path(data.redirect);
                });
        };

    };

    angular.module('geofeelingsApp').controller('loginController', ["$scope", "$http", "$location", loginController]);
})();