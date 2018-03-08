'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviesCtrlStub = {
  index: 'moviesCtrl.index',
  show: 'moviesCtrl.show',
  create: 'moviesCtrl.create',
  update: 'moviesCtrl.update',
  destroy: 'moviesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './movies.controller': moviesCtrlStub
});

describe('Movies API Router:', function() {

  it('should return an express router instance', function() {
    expect(moviesIndex).to.equal(routerStub);
  });

  describe('GET /api/movies', function() {

    it('should route to movies.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviesCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/movies/:id', function() {

    it('should route to movies.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviesCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/movies', function() {

    it('should route to movies.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviesCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/movies/:id', function() {

    it('should route to movies.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviesCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/movies/:id', function() {

    it('should route to movies.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviesCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/movies/:id', function() {

    it('should route to movies.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviesCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
