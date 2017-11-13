'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', ['$scope', 'utils', '$location', function ($scope, utils, $location) {
    
    $scope.controls = {"loginError": false, "message": ""};

    $scope.doLogin = function(){
      console.log($scope);
      $scope.controls.loginError = false;
      if ($scope.loginform.$invalid) {
        angular.forEach($scope.loginform.$error, function(field) {
          angular.forEach(field, function(errorField) {
            errorField.$setTouched();
            errorField.$setDirty();
          })
        });
        return;
      }
      var data = {
        email: $scope.loginform.email.$viewValue,
        password: $scope.loginform.password.$viewValue,
      };

      var loginPromise = utils.definePostService('login')(data);
      utils.handlePromise(loginPromise, function(response) {
        console.log(response);
        if (response.status == 'LOGIN_SUCCESS') {          
          $location.path("/");
        } else if(response.status == 'INVALID_CREDS'){
          $scope.controls.loginError = true;
          $scope.controls.message = "Invalid Credentials"
        }
      });
    }
  }]);
