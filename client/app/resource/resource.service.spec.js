'use strict';

describe('base resource factory', function() {

  // Define dependencies:
  // - $httpBackend: the HTTP mocks
  // - Resource: the resource factory
  // - Gerbil: a fake resource we use to test stuff (side note: is this not
  //   awesome?)
  // - mufasa: our "new" gerbil
  // - scar: our "existing" gerbil
  var $httpBackend, Resource, Gerbil, mufasa, scar;

  // Set up the module:
  beforeEach(module('badassStudentManagerApp'));

  // Inject dependencies:
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    Resource = $injector.get('Resource');
    Gerbil = Resource('/api/gerbils/:id');

    mufasa = new Gerbil({
      name: 'Mufasa'
    });

    scar = new Gerbil({
      _id: 42,
      name: 'Scar'
    });

    // Respond to POST requests with the new gerbil data:
    $httpBackend.when('POST', '/api/gerbils')
      .respond(function(method, url, data, headers, params) {
        // Give each new gerbil an ID:
        data = angular.extend(JSON.parse(data), {
          _id: 23
        });

        // Respond with the HTTP created status and the data:
        return [201, data];
      });

    // Respond to PUT requests with the existing gerbil data:
    $httpBackend.when('PUT', /\/api\/gerbils\/(.+)/) // whenRoute was whining
      .respond(function(method, url, data, headers, params) {
        // Just return the data:
        return [200, data];
      });
  }));

  // Ensure that nothing weird happens:
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should POST to resource endpoint on create', function () {
    $httpBackend.expect('POST', '/api/gerbils');

    mufasa.$create(null, function(model) {
      expect(model._id).toBe(23);
      expect(model.name).toBe('Mufasa');
    });

    $httpBackend.flush();
  });

  it('should PUT to resource endpoint on update', function () {
    $httpBackend.expect('PUT', '/api/gerbils/42');

    scar.name = 'Scaaaar!';

    scar.$update(null, function(model) {
      expect(model._id).toBe(42);
      expect(model.name).toBe('Scaaaar!');
    });

    $httpBackend.flush();
  });

  it('should POST to resource endpoint on new model save', function () {
    $httpBackend.expect('POST', '/api/gerbils');

    mufasa.$save(null, function(model) {
      expect(model._id).toBe(23);
      expect(model.name).toBe('Mufasa');
    });

    $httpBackend.flush();
  });

  it('should PUT to resource endpoint on existing model save', function () {
    $httpBackend.expect('PUT', '/api/gerbils/42');

    scar.name = 'Scaaaar!';

    scar.$save(null, function(model) {
      expect(model._id).toBe(42);
      expect(model.name).toBe('Scaaaar!');
    });

    $httpBackend.flush();
  });

});
