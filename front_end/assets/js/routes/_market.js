!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('marketPlace', {
        url: '/market_place',
        views: {
          app: {
            controller: 'marketPlace',
            template: templates.market_place
          },
          nav: {
            controller: 'marketNav',
            template: templates.market_nav
          }
        }
      })
      .state('marketPlace.item', {
        url: '/:id',
        views: {
          "app@": {
            controller: 'marketItem',
            template: templates.market_item
          }
        }
      });

  }]);
})(angular, window.bunsen, templates);
