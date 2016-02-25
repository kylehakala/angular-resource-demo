'use strict';

// @see http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/

angular.module('badassStudentManagerApp')
  .factory('Resource', function($resource, $httpParamSerializerJQLike) {
    var serialize = function(params) {
      for (var key in params) {
        switch (key) {
          case 'count':
            params['limit'] = params['count'];
            delete params['count'];

            break;

          case 'order':
            if (Array.isArray(params['order'])) {
              params['order'] = params['order'].join(',');
            }

            break;

          case 'page':
            var limit = params['count'] || params['limit'] || 10;

            params['limit'] = limit;
            params['offset'] = (params['page'] - 1) * limit;
            delete params['page'];

            break;
        }
      }

      // @see http://api.jquery.com/jquery.param/
      return $httpParamSerializerJQLike(params);
    };

    // So what we're doing here is writing something that'll transparently
    // replace $resource. Notice the signature is the same:
    return function(url, params, methods) {
      // These are our new methods:
      var defaults = {
        create: {
          method: 'POST'
        },
        query: {
          method: 'GET',
          isArray: true,
          paramSerializer: serialize
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
      var Resource = $resource(url, params, methods);

      // ... and override the save function with something more intuitive:
      Resource.prototype.$save = function() {
        if (!this._id) {
          return this.$create();
        }
        else {
          return this.$update();
        }
      };

      return Resource;
    };
  });
