'use strict';

angular.module('badassStudentManagerApp')
  .controller('StudentCtrl', function ($scope, socket, Student) {
    $scope.students = [];

    Student.query(function(results) {
      $scope.students = results;
      socket.syncUpdates('student', $scope.students);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('student');
    });
  });
