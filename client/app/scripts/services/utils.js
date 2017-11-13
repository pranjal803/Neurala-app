'use strict';
angular.module('clientApp')
  .service('utils', ['$http', 'appConstants','$location',function($http, appConstants, $location){
    this.defineGetService = function (serviceName) {      
      return function () {
        return $http({
          method: 'GET',
          url: appConstants.serviceBase + serviceName + appConstants.serviceSuffix
        });
      };
    };
    this.definePostService = function (serviceName) {
      return function (requestBody) {
        if(requestBody === undefined){
          requestBody = {};
        }
        return $http({
          method: 'POST',
          url: appConstants.serviceBase + serviceName + appConstants.serviceSuffix,
          data: requestBody,
          headers: {
            'Content-type': 'application/json'
          }
        });
      };
    };
    
    this.handlePromise =  function(promise, onSuccess) {
      promise.then(function(response) {        
        if (response.status == 200) {
          onSuccess(response.data);
        }
      });
    };
  }]);