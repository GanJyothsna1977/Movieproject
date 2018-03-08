'use strict';

angular.module('yeomanApp.auth', ['yeomanApp.constants', 'yeomanApp.util', 'ngCookies', 'ngRoute'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
