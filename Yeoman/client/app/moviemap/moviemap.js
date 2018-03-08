'use strict';

angular.module('yeomanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviemap', {
        template: '<moviemap></moviemap>'
      });
  });
