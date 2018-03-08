'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var theatreCtrlStub = {
  index: 'theatreCtrl.index',
  show: 'theatreCtrl.show',
  create: 'theatreCtrl.create',
  update: 'theatreCtrl.update',
  destroy: 'theatreCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var theatreIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './theatre.controller': theatreCtrlStub
});

describe('Theatre API Router:', function() {

  it('should return an express router instance', function() {
    expect(theatreIndex).to.equal(routerStub);
  });

  describe('GET /api/theatre', function() {

    it('should route to theatre.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'theatreCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/theatre/:id', function() {

    it('should route to theatre.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'theatreCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/theatre', function() {

    it('should route to theatre.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'theatreCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/theatre/:id', function() {

    it('should route to theatre.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'theatreCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/theatre/:id', function() {

    it('should route to theatre.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'theatreCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/theatre/:id', function() {

    it('should route to theatre.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'theatreCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
