'use strict';

angular.module('badassStudentManagerApp')
  .controller('StudentCtrl', function ($scope, socket, Student) {
    $scope.students = [];

    $scope.params = {
      order: 'lastName'
    };

    $scope.$watchCollection('params', function() {
      Student.query($scope.params, function(results) {
        $scope.students = results;
      });
    });

    socket.syncUpdates('student', $scope.students);

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('student');
    });
  });
