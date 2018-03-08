'use strict';

angular.module('yeomanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/onlinepaymentinfo', {
        template: '<onlinepaymentinfo></onlinepaymentinfo>'
      });
  });
