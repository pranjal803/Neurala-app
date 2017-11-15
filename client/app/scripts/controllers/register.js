'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('RegisterCtrl', ['$scope', 'utils', '$location', 'Auth', function ($scope, utils, $location, Auth) {
    
    $scope.controls = {"registerError": false, "message": ""};

    $scope.doRegister = function(){   
      $scope.controls.registerError = false;
      $scope.registerform.confirmPassword.$setValidity('match', $scope.registerform.password.$viewValue == $scope.registerform.confirmPassword.$viewValue);
      if ($scope.registerform.$invalid) {
        angular.forEach($scope.registerform.$error, function(field) {
          angular.forEach(field, function(errorField) {
            errorField.$setTouched();
            errorField.$setDirty();
          })
        });
        return;
      }
      
      var data = {
        email: $scope.registerform.email.$viewValue,
        password: $scope.registerform.password.$viewValue
      };

      var RegisterPromise = utils.definePostService('register')(data);
      utils.handlePromise(RegisterPromise, function(response) {
        console.log(response);
        if (response.status == 'SIGNUP_SUCCESS') {          
          Auth.setLogin(true);      
          $location.path("/");
        } else if(response.status == 'SIGNUP_INVALID') {
          $scope.controls.registerError = true;
          $scope.controls.message = "User exists";
        }
      });
      
    }
  }]);
