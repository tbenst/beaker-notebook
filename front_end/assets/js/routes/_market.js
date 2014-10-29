!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('marketPlace', {
        abstract: true,
        views: {
          "root": {
            controller: 'marketPlaceRoot',
            template: templates.market_place_root
          }
        }
      })
      .state('marketPlace.items', {
        url: '/market_place',
        views: {
          "app@marketPlace": {
            controller: 'marketPlace',
            template: templates.market_place
          },
          "nav@marketPlace": {
            controller: 'marketNav',
            template: templates.market_nav
          }
        }
      })
      .state('marketPlace.items.item', {
        url: '/:index/:id',
        views: {
          "app@marketPlace": {
            controller: 'marketItem',
            template: templates.market_item
          }
        }
      });

  }]);
})(angular, window.bunsen, templates);
