'use strict';

angular
  .module('spLab.config', ['ngRoute'])
  .config(['$routeProvider', manageAppConfig])
  .constant('config', 
    {
      apiUrl : 'http://localhost:8080'
    });

  function manageAppConfig($routeProvider)
  {
    $routeProvider.
      /*when('/buildings', {
        templateUrl: 'partials/buildings-list.html',
        controller: 'BuildingsListController'
      }).
      when('/buildings/:buildingId/main', {
        templateUrl: 'partials/building-main.html',
        controller: 'BuildingMainController',
        activeTab: 'main'
      }).
      when('/buildings/:buildingId/synonym', {
        templateUrl: 'partials/building-synonym.html',
        controller: 'BuildingSynonymController',
        activeTab: 'synonym'
      }).*/
      when('/', {
        templateUrl: 'partials/main-page.html',
        controller: 'MainPageController'
      });

  }