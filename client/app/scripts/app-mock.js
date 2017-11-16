angular
  .module('clientAppDev', ['clientApp', 'ngMockE2E'])
  .run(function($httpBackend) {
    'use strict';

    var serviceConstants = { serviceBase: '/', serviceSuffix: '.do' };
    var createPostResponse = function(serviceName, returnObj) {
      $httpBackend.when('POST', serviceConstants.serviceBase + serviceName + serviceConstants.serviceSuffix)
        .respond(returnObj);
    };

    var createGetResponse = function(serviceName, returnObj) {
      $httpBackend.when('GET', serviceConstants.serviceBase + serviceName + serviceConstants.serviceSuffix)
        .respond(returnObj);
    };

    function makePostService(serviceName, responseBody, conditional) {
      var outerConditional = function() { return true; };
      if (!_.isUndefined(conditional)) {
        outerConditional = function(data) {
          var parsed = JSON.parse(data);
          return conditional(parsed);
        };
      }
      $httpBackend.whenPOST(serviceUrl(serviceName), outerConditional)
        .respond({responseBody});
    }
    

    var login = { status: "LOGIN_SUCCESS" };
    var logout = { status: 'LOGOUT_SUCCESS' };
    var register = { status: "SIGNUP_SUCCESS" };
    var profile = { status: 'OK', email: "abcd123@gmail.com" };
    var updateprofile = { status: "RESET_INVALID", message: "Invalid Credentials" };
    var products = {"status":"OK","products":[{"id":1,"name":"Product1","description":"This is product 1 description","productLikes":2,"liked":true},{"id":2,"name":"Product2","description":"This is product 2 description","productLikes":1,"liked":false}]};

    var likeproduct = { status: 'OK' };
    var checksession = { status: 'OK', session: false };
    
    /* backend API calls here */

    createGetResponse('login', login);
    createPostResponse('logout', logout);
    createPostResponse('register', register);
    createPostResponse('profile', profile);
    createPostResponse('updateprofile', updateprofile);
    createPostResponse('products', products);
    createPostResponse('likeproduct', likeproduct);
    createPostResponse('checksession', checksession);





    $httpBackend.whenPOST(/\/api\/\/exception\/(\S)*/).respond({});

    $httpBackend.whenGET(/^views\//).passThrough();
    $httpBackend.whenGET(/^partials\//).passThrough();
    $httpBackend.whenGET(/^res\//).passThrough();

  });
if (angular.mock) {
  angular.element(document).ready(function() {
    'use strict';
    angular.bootstrap(document, ['clientAppDev']);
  });
}
