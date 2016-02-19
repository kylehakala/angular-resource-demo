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
```javascript
    angular.module('studentManagerApp')
      .factory('Student', function($resource) {
        return $resource('/api/students');
      });
```
So this creates a thing that will automatically pull down model data from the
API endpoint we're about to make:

4. `yo angular-fullstack:endpoint student`: Generate a CRUD (**C**reate,
**R**ead, **U**pdate, **D**elete) endpoint (and model definition) for students
on the server side. The reason that the factory we made is so useful is that it
already understands CRUD:
  - `GET /api/students` returns a list of all students
  - `GET /api/students?firstName=Phil` returns a list of all students named Phil
  - `POST /api/students` creates a new student from the POSTed JSON and returns
    the new student
  - `GET /api/students/5fa493db` returns the student with ID 5fa493db
  - `PUT /api/students/5fa493db` updates the student with ID 5fa493db from the
    posted JSON and returns the student
  - `DELETE /api/students/5fa493db` deletes the student with ID 5fa493db :(

5. Update the student model (`server/api/student/student.model.js`) with the
fields that you care about:
```javascript
    var StudentSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      dateOfBirth: String,
      gender: String,
      email: String,
      phone: String,
      address: String,
      courses: Array
    });
```
Note that right now we're cutting a few corners: Date of birth should probably
be an actual date, but that would likely play hell with the seed data. Also,
course would be better off as its own model, but we're just calling it an array
for now so we don't have to deal with it. Cool?

6. Speaking of seed data, go ahead and drop that in `server/config/seed.js`.
