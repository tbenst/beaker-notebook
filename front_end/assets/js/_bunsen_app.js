!(function(angular) {
  window.bunsen = angular.module('bunsen', ['ui.router', 'ui.bootstrap', 'restangular', 'treeControl', 'marketPlaceFilters', 'ngStorage', 'beakerNotebook', 'angularFileUpload'], ['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://' + window.location.hostname + ':3000/api')
  }]);
})(angular);

