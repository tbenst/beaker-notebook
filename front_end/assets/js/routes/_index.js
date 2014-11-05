!(function(angular, app, templates) {
  app.config(['$stateProvider', function setRoutes($stateProvider) {
    $stateProvider
      .state('landing', {
        url: '',
        skipAuth: true
      });
  }]);
})(angular, window.bunsen, templates);
