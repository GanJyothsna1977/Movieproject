'use strict';

var app = require('../..');
import request from 'supertest';

var newMoviemap;

describe('Moviemap API:', function() {

  describe('GET /api/moviemap', function() {
    var moviemaps;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviemap')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviemaps = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviemaps).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/moviemap', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moviemap')
        .send({
          name: 'New Moviemap',
          info: 'This is the brand new moviemap!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMoviemap = res.body;
          done();
        });
    });

    it('should respond with the newly created moviemap', function() {
      expect(newMoviemap.name).to.equal('New Moviemap');
      expect(newMoviemap.info).to.equal('This is the brand new moviemap!!!');
    });

  });

  describe('GET /api/moviemap/:id', function() {
    var moviemap;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviemap/' + newMoviemap._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviemap = res.body;
          done();
        });
    });

    afterEach(function() {
      moviemap = {};
    });

    it('should respond with the requested moviemap', function() {
      expect(moviemap.name).to.equal('New Moviemap');
      expect(moviemap.info).to.equal('This is the brand new moviemap!!!');
    });

  });

  describe('PUT /api/moviemap/:id', function() {
    var updatedMoviemap;

    beforeEach(function(done) {
      request(app)
        .put('/api/moviemap/' + newMoviemap._id)
        .send({
          name: 'Updated Moviemap',
          info: 'This is the updated moviemap!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMoviemap = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMoviemap = {};
    });

    it('should respond with the updated moviemap', function() {
      expect(updatedMoviemap.name).to.equal('Updated Moviemap');
      expect(updatedMoviemap.info).to.equal('This is the updated moviemap!!!');
    });

  });

  describe('DELETE /api/moviemap/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/moviemap/' + newMoviemap._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moviemap does not exist', function(done) {
      request(app)
        .delete('/api/moviemap/' + newMoviemap._id)
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
