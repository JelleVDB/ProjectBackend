/**
 * Created by Jelle on 29/12/2015.
 */

(function () {
    "use strict";

    var loginController = function($scope, $http, $location) {

        $scope.registerData = {};
        $scope.loginData = {};

        $scope.register = function(){

            //Grab all input from form
            var userData = {
                username: $scope.registerData.username,
                password: $scope.registerData.password,
                email: $scope.registerData.email,
                age: Number($scope.registerData.age),
                gender: $scope.registerData.gender
            };

            //posts data to server
            $http.post('/register', userData)
                .success(function(data){
                    console.log(data.redirect + " - " + data.error);

                    $scope.error = data.error;
                    $location.path(data.redirect);
                });
        };

        $scope.login = function(){

            //Grab data from login form
            var loginData = {
                username: $scope.loginData.username,
                password: $scope.loginData.password
            };

            //post data to server
            $http.post('/login', loginData)
                .success(function(data){
                    console.log(data.redirect + " - " + data.error);

                    $scope.error = data.error;
                    $location.path(data.redirect);
                });
        };

    };

    angular.module('geofeelingsApp').controller('loginController', ["$scope", "$http", "$location", loginController]);
})();