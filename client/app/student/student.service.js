'use strict';

angular.module('badassStudentManagerApp')
  .factory('Student', function(Resource) {
    return new Resource('/api/students/:id');
  });
