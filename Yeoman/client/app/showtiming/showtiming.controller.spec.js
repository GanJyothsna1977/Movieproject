'use strict';

describe('Component: ShowtimingComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var ShowtimingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ShowtimingComponent = $componentController('showtiming', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
