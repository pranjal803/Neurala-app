'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProfileCtrl', ['$scope', 'utils', '$location','Auth', function ($scope, utils, $location, Auth) {
    
    $scope.controls= {
      editEmail: false,
      editPassword: false,
      error: false,
      message: ""
    }
    $scope.data = {};
    var profilePromise = utils.definePostService('profile')();
    utils.handlePromise(profilePromise, function(response) {      
      $scope.data.email = response.email;
    });

    //$scope.data.email = "pranjal803@gmail.com";

    $scope.updateProfile = function(){
      $scope.controls.error = false;
      if($scope.controls.editPassword){
        $scope.profileform.confirmNewPassword.$setValidity('match', $scope.profileform.newPassword.$viewValue == $scope.profileform.confirmNewPassword.$viewValue);
      }
      if ($scope.profileform.$invalid) {
        angular.forEach($scope.profileform.$error, function(field) {
          angular.forEach(field, function(errorField) {
            errorField.$setTouched();
            errorField.$setDirty();
          })
        });
        return;
      }
      var data = {
        email: $scope.data.email,        
        password: $scope.data.password        
      }

      if($scope.controls.editEmail){
        data.newemail = $scope.data.newEmail
      }
      if($scope.controls.editPassword){
        data.newpassword = $scope.data.newpassword
      }
            
      var updateprofilePromise = utils.definePostService('updateprofile')(data);
      utils.handlePromise(updateprofilePromise, function(response) {
        if(response.status == "RESET_SUCCESS"){
          $location.path("/");
        }else if(response.status == "RESET_INVALID"){
          $scope.controls.error = false;
          $scope.controls.message = response.message;
        }else{
          $location.path("/error");
        }
      });            
    }


  }]);
