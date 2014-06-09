!(function(angular) {
  window.bunsen = angular.module('bunsen', ['ui.router', 'ui.bootstrap', 'restangular', 'treeControl', 'marketPlaceFilters', 'ngStorage', 'beakerNotebook', 'angularFileUpload', 'showOnHoverParent', 'stopEvent', 'filterMarketPlace'], ['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl(window.BUNSEN_SERVICES.api);
  }]);
})(angular);
