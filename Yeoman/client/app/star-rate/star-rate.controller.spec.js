'use strict';

describe('Component: StarRateComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var StarRateComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    StarRateComponent = $componentController('star-rate', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
