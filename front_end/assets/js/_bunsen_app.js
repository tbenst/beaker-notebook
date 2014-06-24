!(function(angular) {
  window.bunsen = angular.module('bunsen',
    ['ui.router',
     'ui.bootstrap',
     'restangular',
     'treeControl',
     'marketPlaceFilters',
     'truncate',
     'ngStorage',
     'beakerNotebook',
     'angularFileUpload',
     'stopEvent',
     'filterMarketPlace',
     'sticky',
     'hiddenUpload',
     'truncate',
     'angularSpinner'
    ], ['RestangularProvider', function(RestangularProvider) {
      RestangularProvider.setBaseUrl(window.BUNSEN_SERVICES.api);
    }]);
})(angular);
