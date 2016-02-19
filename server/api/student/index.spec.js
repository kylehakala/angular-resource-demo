'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var studentCtrlStub = {
  index: 'studentCtrl.index',
  show: 'studentCtrl.show',
  create: 'studentCtrl.create',
  update: 'studentCtrl.update',
  destroy: 'studentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var studentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './student.controller': studentCtrlStub
});

describe('Student API Router:', function() {

  it('should return an express router instance', function() {
    studentIndex.should.equal(routerStub);
  });

  describe('GET /api/students', function() {

    it('should route to student.controller.index', function() {
      routerStub.get
        .withArgs('/', 'studentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/students/:id', function() {

    it('should route to student.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'studentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/students', function() {

    it('should route to student.controller.create', function() {
      routerStub.post
        .withArgs('/', 'studentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/students/:id', function() {

    it('should route to student.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'studentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/students/:id', function() {

    it('should route to student.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'studentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/students/:id', function() {

    it('should route to student.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'studentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
