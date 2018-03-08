'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var paymentCtrlStub = {
  index: 'paymentCtrl.index',
  show: 'paymentCtrl.show',
  create: 'paymentCtrl.create',
  update: 'paymentCtrl.update',
  destroy: 'paymentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var paymentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './payment.controller': paymentCtrlStub
});

describe('Payment API Router:', function() {

  it('should return an express router instance', function() {
    expect(paymentIndex).to.equal(routerStub);
  });

  describe('GET /api/payment', function() {

    it('should route to payment.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'paymentCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/payment/:id', function() {

    it('should route to payment.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'paymentCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/payment', function() {

    it('should route to payment.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'paymentCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/payment/:id', function() {

    it('should route to payment.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'paymentCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/payment/:id', function() {

    it('should route to payment.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'paymentCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/payment/:id', function() {

    it('should route to payment.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'paymentCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
