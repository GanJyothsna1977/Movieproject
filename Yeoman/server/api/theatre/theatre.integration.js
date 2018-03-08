'use strict';

var app = require('../..');
import request from 'supertest';

var newTheatre;

describe('Theatre API:', function() {

  describe('GET /api/theatre', function() {
    var theatres;

    beforeEach(function(done) {
      request(app)
        .get('/api/theatre')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theatres = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(theatres).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/theatre', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/theatre')
        .send({
          name: 'New Theatre',
          info: 'This is the brand new theatre!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTheatre = res.body;
          done();
        });
    });

    it('should respond with the newly created theatre', function() {
      expect(newTheatre.name).to.equal('New Theatre');
      expect(newTheatre.info).to.equal('This is the brand new theatre!!!');
    });

  });

  describe('GET /api/theatre/:id', function() {
    var theatre;

    beforeEach(function(done) {
      request(app)
        .get('/api/theatre/' + newTheatre._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theatre = res.body;
          done();
        });
    });

    afterEach(function() {
      theatre = {};
    });

    it('should respond with the requested theatre', function() {
      expect(theatre.name).to.equal('New Theatre');
      expect(theatre.info).to.equal('This is the brand new theatre!!!');
    });

  });

  describe('PUT /api/theatre/:id', function() {
    var updatedTheatre;

    beforeEach(function(done) {
      request(app)
        .put('/api/theatre/' + newTheatre._id)
        .send({
          name: 'Updated Theatre',
          info: 'This is the updated theatre!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTheatre = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTheatre = {};
    });

    it('should respond with the updated theatre', function() {
      expect(updatedTheatre.name).to.equal('Updated Theatre');
      expect(updatedTheatre.info).to.equal('This is the updated theatre!!!');
    });

  });

  describe('DELETE /api/theatre/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/theatre/' + newTheatre._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when theatre does not exist', function(done) {
      request(app)
        .delete('/api/theatre/' + newTheatre._id)
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
