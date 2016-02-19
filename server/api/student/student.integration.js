'use strict';

var app = require('../..');
import request from 'supertest';

var newStudent;

describe('Student API:', function() {

  describe('GET /api/students', function() {
    var students;

    beforeEach(function(done) {
      request(app)
        .get('/api/students')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          students = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      students.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/students', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/students')
        .send({
          name: 'New Student',
          info: 'This is the brand new student!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStudent = res.body;
          done();
        });
    });

    it('should respond with the newly created student', function() {
      newStudent.name.should.equal('New Student');
      newStudent.info.should.equal('This is the brand new student!!!');
    });

  });

  describe('GET /api/students/:id', function() {
    var student;

    beforeEach(function(done) {
      request(app)
        .get('/api/students/' + newStudent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          student = res.body;
          done();
        });
    });

    afterEach(function() {
      student = {};
    });

    it('should respond with the requested student', function() {
      student.name.should.equal('New Student');
      student.info.should.equal('This is the brand new student!!!');
    });

  });

  describe('PUT /api/students/:id', function() {
    var updatedStudent;

    beforeEach(function(done) {
      request(app)
        .put('/api/students/' + newStudent._id)
        .send({
          name: 'Updated Student',
          info: 'This is the updated student!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStudent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStudent = {};
    });

    it('should respond with the updated student', function() {
      updatedStudent.name.should.equal('Updated Student');
      updatedStudent.info.should.equal('This is the updated student!!!');
    });

  });

  describe('DELETE /api/students/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/students/' + newStudent._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when student does not exist', function(done) {
      request(app)
        .delete('/api/students/' + newStudent._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
