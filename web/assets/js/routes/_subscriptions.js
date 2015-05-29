;(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('subscriptions', {
        abstract: true,
        views: {
          root: {
            controller: 'subscriptionsRoot',
            template: templates.subscriptions_root
          }
        }
      })
      .state('subscriptions.items', {
        url: '/subscriptions'
      });
  }]);
})(angular, window.bunsen, templates);
