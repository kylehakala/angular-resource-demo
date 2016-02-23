'use strict';

angular.module('badassStudentManagerApp')
  .factory('Student', function(Resource) {
    return Resource('/api/students/:id');
  });
