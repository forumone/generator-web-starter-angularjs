var app = angular.module('myApp', [ 'ngRoute', 'ui.router', 'config']);
app.config(function($urlRouterProvider, $stateProvider, $logProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  // Home page
  .state('home', {
    url : '/',
    templateUrl : 'states/home/index.html',
    controller : 'HomeController',
  });
});
