'use strict';

angular.module('VGG')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'views/base.html'
      })
      .state('app.home', {
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state('app.admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
      })
      .state('app.admin.comercios', {
        url: '/comercios',
        templateUrl: 'views/comercios.html',
        controller: 'ComercioController'
      });

    $urlRouterProvider.otherwise('/app/home');

  })
  .run(function($rootScope) {

    $rootScope.$on('$viewContentLoaded', function(event) {

      Webflow.ready();

    });

  });