'use strict';

angular.module('yeomanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/onlinepaymentpage', {
        template: '<onlinepaymentpage></onlinepaymentpage>'
      });
  });
