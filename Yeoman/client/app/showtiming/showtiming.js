'use strict';

angular.module('yeomanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/showtiming', {
        template: '<showtiming></showtiming>'
      });
  });
