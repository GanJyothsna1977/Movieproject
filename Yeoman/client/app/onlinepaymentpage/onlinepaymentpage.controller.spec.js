'use strict';

describe('Component: OnlinepaymentpageComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var OnlinepaymentpageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    OnlinepaymentpageComponent = $componentController('onlinepaymentpage', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
