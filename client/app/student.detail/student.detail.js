'use strict';

angular.module('badassStudentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('student.detail', {
        url: '/:id',
        templateUrl: 'app/student.detail/student.detail.html',
        controller: 'StudentDetailCtrl'
      });
  });
