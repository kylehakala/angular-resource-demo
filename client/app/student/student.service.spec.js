'use strict';

describe('Service: student', function () {

  // load the service's module
  beforeEach(module('badassStudentManagerApp'));

  // instantiate service
  var student;
  beforeEach(inject(function (_student_) {
    student = _student_;
  }));

  it('should do something', function () {
    expect(!!student).toBe(true);
  });

});
