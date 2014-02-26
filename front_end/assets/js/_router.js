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

    $stateProvider.state('marketItem', {
      url: '/market_place/:id',
      views: {
        app: {
          controller: 'marketItem',
          template: templates.market_item
        }
      }
    });
  }]);

})(angular, window.bunsen, templates);
