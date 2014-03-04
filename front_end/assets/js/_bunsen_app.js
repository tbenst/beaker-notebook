!(function(angular) {
  window.userID = 1;
  window.bunsen = angular.module('bunsen', ['ui.router', 'restangular'], ['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://127.0.0.1:3000/api')
  }]);
})(angular);

