'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProductsCtrl', ['$scope', 'utils', '$location', function ($scope, utils, $location) {
      var productsPromise = utils.definePostService('products')();
      utils.handlePromise(productsPromise, function(response) {
        console.log(response);        
      });
         
    }
  ]);
