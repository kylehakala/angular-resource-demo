'use strict';

angular.module('badassStudentManagerApp')
  .controller('StudentCtrl', function ($scope, Student) {
    $scope.students = Student.query();
  });
