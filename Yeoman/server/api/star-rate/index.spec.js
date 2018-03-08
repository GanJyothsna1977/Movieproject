'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var starRateCtrlStub = {
  index: 'starRateCtrl.index',
  show: 'starRateCtrl.show',
  create: 'starRateCtrl.create',
  update: 'starRateCtrl.update',
  destroy: 'starRateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var starRateIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './star-rate.controller': starRateCtrlStub
});

describe('StarRate API Router:', function() {

  it('should return an express router instance', function() {
    expect(starRateIndex).to.equal(routerStub);
  });

  describe('GET /api/star-rate', function() {

    it('should route to starRate.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'starRateCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/star-rate/:id', function() {

    it('should route to starRate.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'starRateCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/star-rate', function() {

    it('should route to starRate.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'starRateCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/star-rate/:id', function() {

    it('should route to starRate.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'starRateCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/star-rate/:id', function() {

    it('should route to starRate.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'starRateCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/star-rate/:id', function() {

    it('should route to starRate.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'starRateCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
