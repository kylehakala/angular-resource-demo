'use strict';

// @see http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/

angular.module('badassStudentManagerApp')
  .factory('Resource', function($resource) {
    // So what we're doing here is writing something that'll transparently
    // replace $resource. Notice the signature is the same:
    return function(url, params, methods) {
      // These are our new methods:
      var defaults = {
        create: {
          method: 'POST'
        },
        update: {
          method: 'PUT',
          params: {
            // This is some weird shorthand for the _id property on the model.
            // Here and later we make the key assumption that we'll always have
            // a Mongo-style ID column.
            id: '@_id'
          }
        }
      };

      // And here we join up our new default methods with any methods that are
      // passed in by the other factories:
      methods = angular.extend(defaults, methods);

      // We pull in $resource with the new methods...
      var resource = $resource(url, params, methods);

      // ... and override the save function with something more intuitive:
      resource.prototype.$save = function() {
        if (!this._id) {
          return this.$create();
        }
        else {
          return this.$update();
        }
      };

      return resource;
    };
  });
