'use strict';

/* App Module */

angular
  .module('spLab',
   [
    'spLab.config',
    'spLabControllers',
    'spLabServices',
    'treeControl',
    'ngMaterial'
  ])
  .run(function (treeConfig, $templateCache, $http) {

        $http.get('partials/tree-control.html').then(function(data)
        {
            $templateCache.put('partials/tree-control.html', data.data);
        });
   });

  angular
    .module('spLabControllers', []);

  angular
    .module('spLabServices', []);

  

