/**
 * Created by Jelle on 29/12/2015.
 */

(function () {
    "use strict";

    var loginController = function($scope, $http) {

        $scope.registerData = {};

        $scope.register = function(){

            //Grab all input from form
            var userData = {
                username: $scope.registerData.username,
                password: $scope.registerData.password,
                email: $scope.registerData.email,
                //TODO validatie on only numbers
                age: Number($scope.registerData.age),
                gender: $scope.registerData.gender
                //TODO convert chat option to bool
            };

            //posts data to server
            $http.post('/register', userData)
                .success(function(data){
                    $scope.error = data.error;

                    //clear form
                    //TODO change code depending on new form
                    $scope.registerData.username = "";
                    $scope.registerData.password = "";
                    $scope.registerData.email = "";
                    $scope.registerData.age = "";
                    $scope.registerData.gender = "";
                    $scope.registerData.chat = "";
                })
                .error(function(data){
                    console.log('Error: ' + data);
                });
        };

        $scope.login = function(){

            $scope.loginData = {};

            //Grab data from login form
            var loginData = {
                username: $scope.loginData.username,
                password: $scope.loginData.password
            };

            //post data to server
            $http.post('/login', loginData)
                .success(function(data){
                    $scope.error = data.error;
                })
                .error(function(data){
                    console.log('Error: ' + data);
                });
        };
    };

    angular.module('geofeelingsApp').controller('loginController', ["$scope", "$http", loginController]);
})();