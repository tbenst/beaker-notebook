!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('signIn', {
        url: '/sign_in',
        views: {
          root: {
            controller: 'authentication',
            template: templates.sign_in
          }
        }
      });

  }]);
})(angular, window.bunsen, templates);
