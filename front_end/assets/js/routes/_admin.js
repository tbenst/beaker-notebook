!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('admin', {
        abstract: true,
        views: {
          root: {
            controller: function() {},
            template: templates['admin/root']
          }
        }
      })
      .state('admin.index', {
        url: '/admin',
        views: {
          "app@admin": {
            controller: 'admin',
            template: templates['admin/index']
          }
        }
      })

  }]);
})(angular, window.bunsen, templates);
