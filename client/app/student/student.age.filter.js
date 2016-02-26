'use strict';

angular.module('badassStudentManagerApp')
  .filter('age', function(moment) {
    return function(input) {
      return moment().diff(input, 'years');
    };
  });
