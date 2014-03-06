!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider.state('projects', {
      url: '/projects',
      views: {
        app: {
          controller: 'projects',
          template: templates.projects
        }
      }
    });

    $stateProvider.state('project', {
      url: '/projects/:id',
      views: {
        app: {
          controller: 'project',
          template: templates.project
        }
      }
    });

    $stateProvider.state('projectEdit', {
      url: '/projects/:id/edits',
      views: {
        app: {
          controller: 'projectEdit',
          template: templates.project_edit
        }
      }
    });
  }]);
})(angular, window.bunsen, templates);
