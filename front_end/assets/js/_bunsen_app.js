!(function(angular) {
  window.bunsen = angular.module('bunsen', ['ui.router', 'ui.bootstrap', 'restangular', 'treeControl', 'marketPlaceFilters', 'ngStorage', 'beakerNotebook', 'angularFileUpload'], ['RestangularProvider', function(RestangularProvider) {
    var baseUrl = window.API_BASE_URL || 'http://' + window.location.hostname + ':3000';
    RestangularProvider.setBaseUrl(baseUrl+'/api')
  }]);
})(angular);

