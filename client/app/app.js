'use strict';

angular.module('badassStudentManagerApp', [
  'badassStudentManagerApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'angularMoment',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
