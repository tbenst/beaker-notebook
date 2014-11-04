!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('userEdit', {
        url: '/user_edit',
        views: {
          root: {
            controller: 'user',
            template: templates.user_edit
          }
        }
      });

  }]);
})(angular, window.bunsen, templates);
