'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        data:{
          accessType: 'PUBLIC'
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        data:{
          accessType: 'NOT_LOGIN'
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register',
        data:{
          accessType: 'NOT_LOGIN'
        }
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
        data:{
          accessType: 'LOGIN'
        }
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products',
        data:{
          accessType: 'LOGIN'
        }
      })
      .when('/error', {
        templateUrl: 'views/error.html',        
        data:{
          accessType: 'PUBLIC'
        }
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })
  .constant('appConstants', {
    serviceBase: '/',
    serviceSuffix: '.do'
  })
  .factory('Auth', function() {
    var login = false;
    return {
      setLogin: function(status) {
        login = status;
      },
      isLoggedIn: function() {
        //return true;
        return login;
      }
    };
  })
  .run(['$rootScope', 'Auth', '$location', 'utils','$anchorScroll', function($rootScope, Auth, $location, utils, $anchorScroll) {
    $rootScope.today = new Date();
    $rootScope.Auth = Auth;
    $rootScope.logout = function(){
      var logoutPromise = utils.definePostService('logout')();
      utils.handlePromise(logoutPromise, function(response) { 
          Auth.setLogin(false);      
        if(response.status === 'LOGOUT_SUCCESS'){          
          $location.path("/");        
        }else{
          $location.path("/error");
        }
      });
    };

    $rootScope.$on('$routeChangeStart', function(event, next, current){
        
        //check if the user is logged in
        var logged = Auth.isLoggedIn();
        $anchorScroll();
        if(next.$$route.data){          
          switch(next.$$route.data.accessType){
            case 'LOGIN':
              if(!logged){
                event.preventDefault();
                $location.path('/login');
              }
              break;
            case 'NOT_LOGIN':
              if(logged){
                event.preventDefault();
                $location.path('/');
              }
              break;
            default:              

          }   
        }      
    });
  }]);
