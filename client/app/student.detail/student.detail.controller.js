'use strict';

angular.module('badassStudentManagerApp')
  .controller('StudentDetailCtrl', function ($scope, $state, $stateParams, Student) {
    $scope.student = Student.get({ id: $stateParams.id });

    $scope.save = function() {
      $scope.student.$save()
        .then(function() {
          $state.go('^');
        }, function() {
          console.log('An error happened / You write terrible software / This is meaningless');
        });
    };
  });
