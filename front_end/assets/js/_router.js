!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider.state('marketPlace', {
      url: '/market_place',
      views: {
        app: {
          controller: 'marketPlace',
          template: templates.market_place
        }
      }
    });
  }]);

})(angular, window.bunsen, templates);
