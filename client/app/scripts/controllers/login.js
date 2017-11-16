'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', ['$scope', 'utils', '$location','Auth', function ($scope, utils, $location, Auth) {
    
    $scope.controls = {"loginError": false, "message": ""};

    $scope.doLogin = function(){      
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
        if (response.status == 'LOGIN_SUCCESS') {
          Auth.setLogin(true);      
          $location.path("/");
        } else if(response.status == 'INVALID_CREDS'){
          $scope.controls.loginError = true;
          $scope.controls.message = "Invalid Credentials"
        }
      });
    }
  }]);
