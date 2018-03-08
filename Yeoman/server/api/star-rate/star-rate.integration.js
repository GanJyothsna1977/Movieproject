'use strict';

var app = require('../..');
import request from 'supertest';

var newStarRate;

describe('StarRate API:', function() {

  describe('GET /api/star-rate', function() {
    var starRates;

    beforeEach(function(done) {
      request(app)
        .get('/api/star-rate')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          starRates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(starRates).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/star-rate', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/star-rate')
        .send({
          name: 'New StarRate',
          info: 'This is the brand new starRate!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStarRate = res.body;
          done();
        });
    });

    it('should respond with the newly created starRate', function() {
      expect(newStarRate.name).to.equal('New StarRate');
      expect(newStarRate.info).to.equal('This is the brand new starRate!!!');
    });

  });

  describe('GET /api/star-rate/:id', function() {
    var starRate;

    beforeEach(function(done) {
      request(app)
        .get('/api/star-rate/' + newStarRate._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          starRate = res.body;
          done();
        });
    });

    afterEach(function() {
      starRate = {};
    });

    it('should respond with the requested starRate', function() {
      expect(starRate.name).to.equal('New StarRate');
      expect(starRate.info).to.equal('This is the brand new starRate!!!');
    });

  });

  describe('PUT /api/star-rate/:id', function() {
    var updatedStarRate;

    beforeEach(function(done) {
      request(app)
        .put('/api/star-rate/' + newStarRate._id)
        .send({
          name: 'Updated StarRate',
          info: 'This is the updated starRate!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStarRate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStarRate = {};
    });

    it('should respond with the updated starRate', function() {
      expect(updatedStarRate.name).to.equal('Updated StarRate');
      expect(updatedStarRate.info).to.equal('This is the updated starRate!!!');
    });

  });

  describe('DELETE /api/star-rate/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/star-rate/' + newStarRate._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when starRate does not exist', function(done) {
      request(app)
        .delete('/api/star-rate/' + newStarRate._id)
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
