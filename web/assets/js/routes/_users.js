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

    $stateProvider
      .state('userShow', {
        url: '/user_show',
        views: {
          root: {
            controller: 'user',
            template: templates.user_show
          }
        }
      });

  }]);
})(angular, window.bunsen, templates);
