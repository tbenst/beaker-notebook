!(function(angular) {
  window.bunsen = angular.module('bunsen', ['ui.router', 'ui.bootstrap', 'restangular', 'treeControl', 'marketPlaceFilters', 'ngStorage', 'beakerNotebook', 'angularFileUpload'], ['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://' + window.location.hostname + ':' +
      (window.API_PORT || 3000) + '/api');
  }]);
})(angular);

