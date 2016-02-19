Badass-o-matic student-management-o-tron 9000
===

This is a thing that will hopefully demonstrate how awesome
[`ngResource`](https://docs.angularjs.org/api/ngResource) is.

General steps to make this:

1. `yo angular-fullstack`: Run the generator. Go cure cancer while `npm` runs.

2. `yo angular-fullstack:route student`: Create the student list route (I gave
it `/students` as a URL). Add it to the navbar with `student` as the state
(`client/components/navbar/navbar.controller.js`).

3. `yo angular-fullstack:factory student`: Create the student factory. (This is
the neat part!) It'll spit out the factory in `client/student/student.service.js`
and you'll want to tie it to `ngResource`:
```
    angular.module('studentManagerApp')
      .factory('Student', function($resource) {
        return $resource('/api/students');
      });
```
So this creates a thing that will automatically pull down model data from the
API endpoint we're about to make.
