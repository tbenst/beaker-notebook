!(function(angular, app, templates) {
  app.config(['$stateProvider', function setRoutes($stateProvider) {
    $stateProvider
      .state('landing', {
        url: '',
        skipAuth: true,
        views: {
          root: {
            controller: 'landing'
          }
        }
      });
  }]);
})(angular, window.bunsen, templates);
