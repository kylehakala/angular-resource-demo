Badass-o-matic student-management-o-tron 9000
===

This is a thing that will hopefully demonstrate why a model layer in Angular is
a good idea and why [`ngResource`][ngResource] is a decent thing to use.

General steps to make this:

1.  `yo angular-fullstack`: Run the generator. Go cure cancer while `npm` runs.

2.  `yo angular-fullstack:route student`: Create the student list route (I gave
    it `/students` as a URL). Add it to the navbar with `student` as the state
    (`client/components/navbar/navbar.controller.js`).

3.  `yo angular-fullstack:factory student`: Create the student factory. (This is
    the neat part!) It'll spit out the factory in `client/student/student.service.js`
    and you'll want to tie it to `ngResource`:

    ```javascript
    angular.module('studentManagerApp')
      .factory('Student', function($resource) {
        return $resource('/api/students/:id');
      });
    ```
    So this creates a thing that will automatically pull down model data from the
    API endpoint we're about to make:

4.  `yo angular-fullstack:endpoint student`: Generate a CRUD (**C**reate,
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

5.  Update the student model (`server/api/student/student.model.js`) with the
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

6.  Speaking of seed data, go ahead and drop that in `server/config/seed.js`.

7.  So now we just have to wire it up. In `client/app/student/student.controller.js`,
    inject the student factory:

    ```javascript
    .controller('StudentCtrl', function ($scope, Student) {
    ```

    ... and pull down the student models from the server:

    ```javascript
    $scope.students = Student.query();
    ```

    ... and that's literally all you have to do; the students are loaded and ready to
    use. To display a list of the students you just loaded, dump something like this
    in `app/student/student.html`:

    ```html
    <ul>
      <li ng-repeat="student in students">
        {{ student.firstName }} {{ student.lastName }}
      </li>
    </ul>
    ```

    Crazy, right? That's seriously less than 30 lines of code you actually had to
    write. It gets even better when you want to edit:

8.  `yo angular-fullstack:route student.detail`: Generate a route for detail on
    individual students. Use `/:id` as the path. Since this is a child route (the
    route name determines that it's a child of the student route), it'll inherit the
    base path of its parent. That means we can link students to a detail page like
    this:

    ```html
    <a ui-sref="student.detail({ id: student._id })">
      {{ student.firstName }} {{ student.lastName }}
    </a>
    ```

    (`uiSref` is a directive that `uiRouter` provides. [See here for more][sref]
    if you're into that kind of thing.)

    If you hover over one of the student links, you'll see that the ID gets
    dropped into the URL. If you click the links, though, you won't see any
    change. What gives?

9.  Turns out the route is actually being loaded, it's just that you can't see
    it. That's because Angular renders stuff in a hierarchy. If you check out
    `client/app/index.html`, you'll see this line:

    ```html
    <div ui-view=""></div>
    ```

    That's where the content from `client/app/student/student.html` is getting
    dumped. So if you add the same line to `student.html`, you'll get the
    contents of `student.detail.html`.

10. Currently, the student detail view doesn't know anything about the student
    it's looking at. Fortunately, that's a quick fix. In the controller,
    `client/app/student.detail/student.detail.controller.js`:

    ```javascript
    angular.module('studentManagerApp')
      .controller('StudentDetailCtrl', function ($scope, $stateParams, Student) {
        $scope.student = Student.get({ id: $stateParams.id });
      });
    ```

    That's pretty much the same thing as `student.controller.js`, except this
    time the state parameters (i.e. the dynamic chunks of the URL) are injected
    as well as the student factory.

At this point, we're faced with a few problems:

*   If a student is loaded in the detail view, that student model actually
    exists twice in memory: once in the student index controller and once in the
    student detail controller. On its face, that's not a huge deal, but there
    are some practical consequences.

    Say we change the student detail view so that we can edit and save students.
    It would sync up with the server and everything would be cool, but the
    changes wouldn't be reflected in the student index view.

*   Speaking of editing, the student factory we made doesn't actually support
    PUT requests. Take that up with the Angular guys, maybe?

*   On both the server side and the client side, there isn't a decent way to
    filter results. It'd be cool if we could do something like this...

    ```
    GET /api/students?filter[firstName]=Joe&order[lastName]=asc&limit=20
    ```

    ... and get back at most 20 students named Joe ordered by last name. But
    that's not a thing because the API has no idea how to filter and if we try
    to query it with something like this...

    ```javascript
    $scope.students = Student.query({
      filter: {
        firstName: 'Joe'
      },
      order: {
        lastName: 'asc'
      },
      limit: 20
    });
    ```

    ... `ngResource` comes up with some abomination like this:

    ```
    GET /api/students?filter=%7B%22firstName%22:%22Joe%22%7D&limit=20&order=%7B%22lastName%22:%22asc%22%7D
    ```

    (This URL scheme is sort of based on [the JSON API spec][jsonapi], which is
    a reasonably well-thought-out approach to making APIs suck less.)

*   There are no tests yet. (But screw 'em, amirite? Kidding aside, there aren't
    really any good reasons to write tests for stuff that's pretty much all
    generated. Better testing is actually one reason why a solid model layer is
    a good thing.)

Let's tackle these. The generator isn't going to be any help here because we're
dealing with limitations/bad decisions in both [`angular-fullstack`][fullstack]
and [`ngResource`][ngResource].

*   First, let's make editing work. This isn't a story we have to worry about
    per se, but _as a person who has to use this student management system, I
    think it's beyond freaking reasonable that I should be able to edit students;
    how in the world would it be a student management system if there's no way
    to edit students; I can't possibly be demanding something unreasonable here;
    hell, I work at a school that uses Mongo to manage our mission-critical
    student database; we clearly have enough systemic problems that a student
    management application that can't actually manage students might actually be
    the straw that finally breaks our underfunded, dysfunctional camel's back_.

    Teaching the student factory how to PUT isn't all that bad. We're actually
    going to define a new base resource factory (yeah, yeah, I know) that's a
    little more sensible than the `ngResource` default. (Code adapted from
    [here][restful-tutorial].)

    Because this whole project is all about the generator and its magic, let's
    put it to work with `yo angular-fullstack:factory resource`. Essentially,
    we're going to modify the resource interface as follows:

    1.  Create a new `update` method.
    2.  Create a new `create` method (heh).
    3.  Override the existing `save` method to intelligently create or save
        depending on what's needed.

    There's sort of a lot of code there and this bullet is already way too long,
    so all the code is commented in `client/app/resource/resource.service.js`.
    It's the most conceptually challenging thing we're going to do.

    Now, we just make the student model use our `Resource` service instead of
    `$resource`:

    ```javascript
    angular.module('studentManagerApp')
      .factory('Student', function(Resource) {
        return Resource('/api/students/:id');
      });
    ```

    To make the student detail form capable of editing, we just bind the fields
    we care about to form controls with [`ngModel`][ngModel] and add a save
    handler on the controller:

    ```javascript
    $scope.save = function() {
      $scope.student.$save()
        .then(function() {
          $state.go('^');
        }, function() {
          console.log('An error happened / You write terrible software / This is meaningless');
        });
    ```

    This sends the PUT request and, when completed, redirects to the parent
    state (that's what the `^` is shorthand for). Note that you have to inject
    `$state` into the controller for that to work.

    The `.then` thing has to do with [Promises][promises], which may be
    unfamiliar. Basically, we're saying "whenever you're done saving, call the
    first function if it went okay and the second if it didn't."

*   That's the worst of it, promise (get it?). So now let's worry about getting
    the student index view to update when we save changes.

    To do that, we're going to cheat a little and leverage something the
    generator gave us for free, WebSocket updates. An easy way to think about
    WebSockets is as a communication line that's always open between the server
    and the client. [Google for more.][websockets] [It's badass.][barry]

    This is way easier than it should be because the socket stuff is already
    taken care of:

    ```javascript
    angular.module('badassStudentManagerApp')
      .controller('StudentCtrl', function ($scope, socket, Student) {
        $scope.students = [];

        Student.query(function(results) {
          $scope.students = results;
          socket.syncUpdates('student', $scope.students);
        });

        $scope.$on('$destroy', function() {
          socket.unsyncUpdates('student');
        });
      });
    ```

    This code is adapted from `client/app/main/main.controller.js`, the thing
    that the generator gave us. The key difference is that we're using
    `ngResource` to pull stuff down.

[barry]: http://www.morris.umn.edu/events/commencement/archive/2005/images/7.jpg
[fullstack]: https://github.com/angular-fullstack/generator-angular-fullstack
[jsonapi]: http://jsonapi.org/examples/
[ngModel]: https://docs.angularjs.org/api/ng/directive/ngModel
[ngResource]: https://docs.angularjs.org/api/ngResource
[promises]: https://www.promisejs.org/
[restful-tutorial]: http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
[sref]: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref
[websockets]: http://www.html5rocks.com/en/tutorials/websockets/basics/
