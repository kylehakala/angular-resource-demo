'use strict';

angular.module('badassStudentManagerApp')
  .controller('StudentDetailCtrl', function ($scope, $stateParams, Student) {
    $scope.student = Student.get({ id: $stateParams.id });
  });
