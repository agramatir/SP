'use strict';

angular
  .module('spLab.config', ['ngRoute'])
  .config(['$routeProvider', manageAppConfig])

  function manageAppConfig($routeProvider)
  {
    $routeProvider.
      otherwise({
        redirectTo: '/',
        templateUrl: 'partials/main-page.html',
        controller: 'MainPageController'
      });

  }