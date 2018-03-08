'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviemapCtrlStub = {
  index: 'moviemapCtrl.index',
  show: 'moviemapCtrl.show',
  create: 'moviemapCtrl.create',
  update: 'moviemapCtrl.update',
  destroy: 'moviemapCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviemapIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './moviemap.controller': moviemapCtrlStub
});

describe('Moviemap API Router:', function() {

  it('should return an express router instance', function() {
    expect(moviemapIndex).to.equal(routerStub);
  });

  describe('GET /api/moviemap', function() {

    it('should route to moviemap.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviemapCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/moviemap/:id', function() {

    it('should route to moviemap.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviemapCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/moviemap', function() {

    it('should route to moviemap.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviemapCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/moviemap/:id', function() {

    it('should route to moviemap.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviemapCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/moviemap/:id', function() {

    it('should route to moviemap.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviemapCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/moviemap/:id', function() {

    it('should route to moviemap.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviemapCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
