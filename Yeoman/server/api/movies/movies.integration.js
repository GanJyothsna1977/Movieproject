'use strict';

var app = require('../..');
import request from 'supertest';

var newMovies;

describe('Movies API:', function() {

  describe('GET /api/movies', function() {
    var moviess;

    beforeEach(function(done) {
      request(app)
        .get('/api/movies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviess).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/movies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/movies')
        .send({
          name: 'New Movies',
          info: 'This is the brand new movies!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMovies = res.body;
          done();
        });
    });

    it('should respond with the newly created movies', function() {
      expect(newMovies.name).to.equal('New Movies');
      expect(newMovies.info).to.equal('This is the brand new movies!!!');
    });

  });

  describe('GET /api/movies/:id', function() {
    var movies;

    beforeEach(function(done) {
      request(app)
        .get('/api/movies/' + newMovies._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movies = res.body;
          done();
        });
    });

    afterEach(function() {
      movies = {};
    });

    it('should respond with the requested movies', function() {
      expect(movies.name).to.equal('New Movies');
      expect(movies.info).to.equal('This is the brand new movies!!!');
    });

  });

  describe('PUT /api/movies/:id', function() {
    var updatedMovies;

    beforeEach(function(done) {
      request(app)
        .put('/api/movies/' + newMovies._id)
        .send({
          name: 'Updated Movies',
          info: 'This is the updated movies!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMovies = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMovies = {};
    });

    it('should respond with the updated movies', function() {
      expect(updatedMovies.name).to.equal('Updated Movies');
      expect(updatedMovies.info).to.equal('This is the updated movies!!!');
    });

  });

  describe('DELETE /api/movies/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/movies/' + newMovies._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when movies does not exist', function(done) {
      request(app)
        .delete('/api/movies/' + newMovies._id)
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
