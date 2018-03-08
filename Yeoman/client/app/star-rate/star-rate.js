'use strict';

angular.module('yeomanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/star-rate', {
        template: '<star-rate></star-rate>'
      });
  });
