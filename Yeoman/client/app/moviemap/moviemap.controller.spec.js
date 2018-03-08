'use strict';

describe('Component: MoviemapComponent', function () {

  // load the controller's module
  beforeEach(module('yeomanApp'));

  var MoviemapComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MoviemapComponent = $componentController('moviemap', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
