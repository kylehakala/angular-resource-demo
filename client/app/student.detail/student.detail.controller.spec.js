'use strict';

describe('Controller: StudentDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('badassStudentManagerApp'));

  var StudentDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentDetailCtrl = $controller('StudentDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
