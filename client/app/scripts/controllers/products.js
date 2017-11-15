'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProductsCtrl', ['$scope', 'utils', '$location', function($scope, utils, $location) {

    $scope.data = {};
    // $scope.data.products = [
    //   {
    //     "id": 1,
    //     "name": "Product1",
    //     "description": "This is product 1 description",
    //     "productLikes": 5,
    //     "liked": true
    //   },
    //   {
    //     "id": 2,
    //     "name": "Product2",
    //     "description": "This is product 2 description",
    //     "productLikes": 10,
    //     "liked": false
    //   }
    // ];
    var productsPromise = utils.definePostService('products')();
    utils.handlePromise(productsPromise, function(response) {
      console.log(response);
      $scope.data.products = response.products;
    });
        
    $scope.likeProduct = function(product) {
      var data = { productId: product.id }
      product.productLikes+= 1;
      product.liked = true;
      var likePromise = utils.definePostService('likeproduct')(data);
      utils.handlePromise(likePromise, function(response) {
        console.log(response);
      });
    }
  }]);
