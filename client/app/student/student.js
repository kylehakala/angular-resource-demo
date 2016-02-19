'use strict';

angular.module('badassStudentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('student', {
        url: '/students',
        templateUrl: 'app/student/student.html',
        controller: 'StudentCtrl'
      });
  });
