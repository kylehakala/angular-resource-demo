'use strict';

angular.module('badassStudentManagerApp')
  .factory('Student', function($resource) {
    return $resource('/api/students');
  });
