'use strict';

describe('Component: OnlinepaymentinfoComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var OnlinepaymentinfoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    OnlinepaymentinfoComponent = $componentController('onlinepaymentinfo', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
