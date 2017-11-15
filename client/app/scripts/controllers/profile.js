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
      editPassword: false
    }
    $scope.data = {};
    var profilePromise = utils.definePostService('profile')();
    utils.handlePromise(profilePromise, function(response) {
      console.log(response);  
      $scope.data.email = response.email;
    });

    //$scope.data.email = "pranjal803@gmail.com";

    $scope.updateProfile = function(){
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
      
      console.log(data);
      var updateprofilePromise = utils.definePostService('updateprofile')(data);
      utils.handlePromise(updateprofilePromise, function(response) {
        console.log(response);      
      });      
    }


  }]);
