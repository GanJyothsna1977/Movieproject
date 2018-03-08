'use strict';

describe('Component: SeatArrangementComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var SeatArrangementComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    SeatArrangementComponent = $componentController('seat-arrangement', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
