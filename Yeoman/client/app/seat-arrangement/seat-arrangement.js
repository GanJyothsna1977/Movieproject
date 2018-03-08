'use strict';

angular.module('yeomanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seat-arrangement', {
        template: '<seat-arrangement></seat-arrangement>'
      });
  });
