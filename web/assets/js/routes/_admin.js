;(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('admin', {
        abstract: true,
        views: {
          root: {
            controller: 'admin',
            template: templates['admin/root']
          }
        }
      })
      .state('admin.index', {
        url: '/admin',
        views: {
          'app@admin': {
            template: templates['admin/index']
          }
        }
      })
      .state('admin.vendors', {
        url: '/admin/vendors',
        views: {
          'app@admin': {
            controller: 'vendors',
            template: templates['admin/vendors']
          }
        }
      })
      .state('admin.datasets', {
        abstract: true
      })
      .state('admin.datasets.create', {
        url: '/admin/datasets/create',
        views: {
          'app@admin': {
            controller: 'datasetsCreate',
            template: templates['admin/datasets/create']
          }
        }
      })
      .state('admin.datasets.edit', {
        url: '/admin/datasets/edit/:catalogId/:id',
        views: {
          'app@admin': {
            controller: 'datasetsEdit',
            template: templates['admin/datasets/edit']
          }
        }
      });
  }]);
})(angular, window.bunsen, templates);
