# Badass-o-matic student-management-o-tron 9000

[![Build Status][build-image]][build-url]

This application is a circuitous, over-engineered solution for [Lab 5][3601-lab]
of the Spring 2016 Software Development class at Morris. Though the goal of the
lab is to learn something about sorting and filtering models in Angular, the
primary objective here is to come up with a best-practice solution that
demonstrates what a more robust "real world" application might look like.

## Building the app

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
        return new $resource('/api/students/:id');
      });
    ```
    So this creates a thing that will automatically pull down model data from the
    API endpoint we're about to make:

4.  `yo angular-fullstack:endpoint student`: Generate a CRUD (Create, Read,
    Read, Update, Delete) endpoint (and model definition) for students on the
    server side. The reason that the factory we made is so useful is that it
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
      courses: Array,
      major1: String,
      major2: String
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

## Finding some pain points

**Heads up:** From here on out, this becomes less of a guide to implement some
useful tools and more of a dive into some weird layers of abstraction. If you're
using this to complete the lab, you're probably going to want to stop here. If
you're up for a rambling trip into Angular internals, by all means continue.

So far, we've harnessed the generator to give us a working master-detail view
for a surprisingly small amount of work. However, the app relies on pulling down
every model in the database and dealing with the whole collection on the client
side. This isn't an approach that will scale, and we're faced with a few other
extensibility problems:

*   If a student is loaded in the detail view, that student model exists twice
    in memory: once in the student index controller and once in the student
    detail controller. On its face, that's not a huge deal, but there are some
    practical consequences.

    Say we change the student detail view so that we can edit and save students.
    It would sync up with the server and everything would be cool, but the
    changes wouldn't be reflected in the student index view.

*   Speaking of editing, the student factory we made totally doesn't support PUT
    requests. Take that up with the Angular guys, maybe?

*   There isn't a decent way to filter results on the API. It'd be cool if we
    could do something like this...

    ```
    GET /api/students?filter[firstName]=Joe&sort=lastName,-dateOfBirth&limit=20&offset=10
    ```

    ... and get back at most 20 students named Joe ordered by last name and then
    then by age descending, with the first 10 results excluded. But that's not a
    thing because the API has no idea how to filter and if we try to query it
    with something like this...

    ```javascript
    Student.query({
      filter: {
        firstName: 'Joe'
      },
      order: 'lastName,-dateOfBirth',
      limit: 20,
      offset: 10
    });
    ```

    ... `ngResource` comes up with some abomination like this, encoding the
    `filter` value into JSON and embedding it in the URL:

    ```
    GET /api/students?filter=%7B%22firstName%22:%22Joe%22%7D&limit=20&offset=10&order=lastname,-dateOfBirth
    ```

    (This URL scheme is sort of based on [the JSON API spec][jsonapi], which is
    a reasonably well-thought-out approach to making APIs suck less.)

*   There are no tests yet. (But screw 'em, amirite? Kidding aside, there aren't
    really any good reasons to write tests for stuff that's pretty much all
    generated. Better testing is actually one reason why a solid model layer is
    a good thing.)

## MAKING ANGULAR GREAT AGAIN

Let's tackle these. The generator isn't going to be any help here because we're
dealing with limitations/bad decisions in both [`angular-fullstack`][fullstack]
and [`ngResource`][ngResource].

*   First, let's make editing work. This isn't a story we have to worry about
    per se, but _as a person who has to use this student management system, I
    think it's beyond freaking reasonable that I should be able to edit students;
    how in the world would it be a student management system if there's no way
    to edit students; I can't possibly be demanding something ridiculous here;
    hell, I work at a school that uses Mongo to manage our mission-critical
    student database; we clearly have enough systemic problems that a student
    management application that can't actually manage students might **literally**
    be the straw that finally breaks our underfunded, dysfunctional camel's back_.

    Teaching the student factory how to PUT isn't all that bad. We're actually
    going to define a new base resource factory (yeah, yeah, I know) that's a
    little more sensible than the `ngResource` default. (Code adapted from
    [here][restful-tutorial].)

    Because this whole project is all about the generator and its magic, let's
    put it to work with `yo angular-fullstack:factory resource`. Essentially,
    we're going to modify the resource interface as follows:

    1.  Create a new `update` method.
    2.  Create a new `create` method (heh).
    3.  Override the existing `save` method to intelligently create or update
        depending on what's needed.

    There's sort of a lot of code there and this bullet is already way too long,
    so all the code is commented in `client/app/resource/resource.service.js`.
    Now, we make the student model use our `Resource` service instead of
    `$resource`:

    ```javascript
    angular.module('studentManagerApp')
      .factory('Student', function(Resource) {
        return new Resource('/api/students/:id');
      });
    ```

    This is definitely the most conceptually challenging thing we're going to
    do. If you're totally lost, thinking about it in terms of traditional
    Java-style OOP might make it easier (or much, much worse):

    -   **Student** (model object, what gets returned by `Student.query()` or
        `Student.get()`) is created by...
    -   **StudentFactory** (the factory we made in `student.service.js`) which
        extends...
    -   **ResourceFactory** (the moderately-difficult-to-understand base factory
        in `resource.service.js`) which extends...
    -   **AngularResourceFactory** (the `$resource` service we get from Angular)

    The reason that the factories are called factories is that their job is to
    *make* student objects that know how to interact with the API. If we were to
    use `$http` to pull down model data, we'd only have dumb objects and would
    have to write additional `$http` code to save or delete. Therein lies the
    main benefit of using `ngResource`.

    To make the student detail form capable of editing, we bind fields on the
    student model to form controls with [`ngModel`][ngModel], add a submit
    button (see `student.detail.html`), tie the form to a `save` handler, and
    define it on the controller:

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

    The `.then` thing has to do with [promises][promises], which may be
    unfamiliar. Basically, we're saying "hey model, whenever you're done saving,
    call the first function if it went okay and the second if it didn't."

*   That's the worst of it, promise. (Get it?) So now let's worry about getting
    the student index view to update when we save changes.

    To do that, we're going to cheat a little and leverage something the
    generator gave us for free, WebSocket updates. An easy way to think about
    WebSockets is as a communication line that's always open between the server
    and the client (as opposed to HTTP calls, which are short-lived and
    initiated by the client). [Google for more.][websockets] [It's badass.][barry]

    This is way easier than it should be because the socket stuff is already
    taken care of:

    ```javascript
    angular.module('studentManagerApp')
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
    `ngResource` to pull stuff down instead of `$http`. In English, the above
    code reads...

    1.  Get all the student models. (Note that the controller doesn't care how
        it happens, just that it gets results... separation of concerns!)

    2.  When the student models are loaded, drop them into the scope and
        subscribe to updates from the server side.

    3.  When we leave the students view (when the controller is destroyed),
        unsubscribe from updates.

    Now, whenever a student model changes on the backend, it'll send a message
    to all the connected clients saying "hey, pull down a new version of the
    student with ID [id]!" If you pull up the developer tools in your browser
    (usually F12) and check out the Network tab, you can see this happen as you
    edit stuff.

*   We've hit two of the main problems now, so let's talk about filtering. To
    get the index to work as described above (mostly personal preference), we're
    going to make some more changes to the base resource service. Specifically,
    the `query` method is going to look for `filter`, `order`, `page`, and
    `count` parameters and build the index URL accordingly.

    The end game here is to write something like this (again, personal taste)...

    ```javascript
    Student.query({
      // The fields we're filtering by, Mongo-style.
      filter: {
        firstName: 'Joe',
        dateOfBirth: {
          $lte: '1990-01-01'
        }
      },
      // The sort operations in order of precendence. The hyphen/minus sign
      // signals descending order.
      order: ['lastName', '-dateOfBirth'],
      // The active page number and results per page. This is going to be an
      // abstraction over the `limit` and `offset` fields from earlier.
      page: 3,
      count: 10
    });
    ```

    ... and get a URL that looks like this:

    ```
    GET /api/students?filter[firstName]=Joe&filter[dateOfBirth][$lte]=1990-01-01&order=lastName,-dateOfBirth&limit=10&offset=20
    ```

    (For sake of sanity, let's assume 1-indexed page numbers.)

    We're (finally) going to practice some TDD here. Angular provides a service
    called `$httpBackend` that mocks (pretends to be, not ridicules) `$http` and
    lets us check that the right HTTP requests are happening.

    First, to get the hang of the whole thing, let's retroactively implement a
    few tests that make sure our custom create/update/save methods are working
    as intended. In Jasmine parlance, when we describe the Resource factory, it
    should:

    -   Issue a POST request to the resource endpoint when `$create` is called
        on a new resource.

    -   Issue a PUT request to the resource endpoint when `$update` is called on
        an existing resource.

    -   Issue a POST request to the resource endpoint when `$save` is called on
        a new resource.

    -   Issue a PUT request to the resource endpoint when `$save` is called on
        an existing resource.

    All of the code for those scenarios is in `resource.service.spec.js`, and
    they confirm that creating and saving objects works as expected. Good to
    know.

    The idealized Resource factory should do a few more things:

    -   Break the filter object apart into query parameters (like in the
        idealized example above).

    -   Implode `order` if necessary, so `['lastName', '-dateOfBirth']` would
        become `lastName,-dateOfBirth`. (If we're still doing stories, _as a guy
        unnecessarily bothered by stupid cosmetic details, this is just a thing
        that I want, okay?_)

    -   Turn `count` into `limit`. (You're probably wondering why you're still
        reading this.)

    -   Turn `page` and `count` into `offset` and `limit`.

    Again, all of the code for these is in `resource.service.spec.js` and, as
    expected, each one fails. Let's make them pass! We've messed around with
    `ngResource` enough that rewriting some parameters shouldn't be a big deal.
    Drop a function right at the top of the factory definition that handles
    the rewriting...

    ```javascript
    angular.module('studentManagerApp')
      .factory('Resource', function($resource, $httpParamSerializerJQLike) {
        var serialize = function(params) {
          return $httpParamSerializerJQLike(params);
        }
    ```

    ... and override the query method by defining a new one:

    ```javascript
    query: {
      method: 'GET',
      isArray: true,
      paramSerializer: serialize
    },
    ```

    Documentation on this stuff ranges from limited to nonexistent. What's going
    on here is pretty simple: the configuration of our custom methods gets
    passed almost verbatim to `$http`, with `$resource` doing some rewriting to
    accomplish its goals. That means that when we define custom methods, we can
    generally pass in configuration [like we'd do for `$http`][http-config].

    That said, you're probably still thinking, _as a person who is earnestly
    trying to follow this aimless tour of Angular's guts, I would really like to
    hear less about how "simple" this is and more about what the hell is going
    on with `$httpParamSerializerJQLike`_. It's not as bad as its name,
    fortunately. Remember how earlier when we tried to pass a complex JSON
    object into `Student.query` it stringified it and embedded it in the URL?
    That was its sister, `$httpParamSerializer`, which is used by default. The
    reason we bother pulling in the longer, uglier service ("all HTTP parameter
    serializers are beautiful, you superficial boor!") is that [it'll take care
    of the bracket expansion for us like jQuery would][jquery-param]. In fact,
    the filter test passes now just because we're using it.

    Now we just massage the parameters into the structure that we want. None of
    that is especially interesting; it's all in `resource.service.js` and the
    tests pass so we're good.

    The next step is to get the server to honor all of that. Compared to the
    Angular work, that's not bad at all. First, we'll make a helper function
    that takes a Mongoose model and the query parameters and builds a database
    query from it. All of the code for that is in `server/api/query.js`. To be
    honest, I have no idea how to test it. It seems like you could use Sinon to
    spy on method calls, but the model returns a query object and that's a whole
    weird thing. It works, though, so whatever. Come back to it later, maybe?

    To enable the query building, import the helper (ES6!)...

    ```javascript
    import { find } from '../query';
    ```

    ... and replace the `Student.findAsync` call on the `student.controller.js`
    `index` method with a call to the helper...

    ```javascript
    find(Student, req.query)
    ```

    and just like that, filter parameters work like we'd expect them to. Now we
    can actually put these new capabilities to work.

## Rapidly adding features

The reason that all this crap was worthwhile is that now we have a ridiculously
powerful way to sort and filter stuff without having to pull down every single
model on the server and deal with the data in Angular. Let's start knocking out
features.

*   **Ability to sort student index by last name, first name, and date of
    birth:** All of this happens in `student.html` and `student.controller.js`.
    Some highlights:

    -   The `ui-sref-active` directive adds a class to a link if the state it's
        `ui-sref`'d to is active. We're using the Bootstrap list group to
        display students now, so we can highlight a selected student with one
        line. Sweet.

    -   `$scope.$watch` lets you manually watch properties. In this controller,
        it detects changes to filters and sorting and hits the API with the
        appropriate parameters.

    -   [`Moment.js`][moment] is being used for date work. It's really great.


[3601-lab]: https://github.com/UMM-CSci-3601-S16/3601-S16-lab5_json-data-processing
[barry]: http://www.morris.umn.edu/events/commencement/archive/2005/images/7.jpg
[build-image]: https://travis-ci.org/dstelljes/angular-resource-demo.svg?branch=master
[build-url]: https://travis-ci.org/dstelljes/angular-resource-demo
[fullstack]: https://github.com/angular-fullstack/generator-angular-fullstack
[http-config]: https://docs.angularjs.org/api/ng/service/$http
[jquery-param]: http://api.jquery.com/jquery.param/
[jsonapi]: http://jsonapi.org/examples/
[moment]: http://momentjs.com/
[ngModel]: https://docs.angularjs.org/api/ng/directive/ngModel
[ngResource]: https://docs.angularjs.org/api/ngResource
[promises]: https://www.promisejs.org/
[restful-tutorial]: http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
[sref]: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref
[websockets]: http://www.html5rocks.com/en/tutorials/websockets/basics/
