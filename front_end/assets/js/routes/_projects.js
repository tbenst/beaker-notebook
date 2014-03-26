!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider.state('projects', {
      abstract: true,
      views: {
        root: {
          controller: 'projectsRoot',
          template: templates.projects_root
        }
      }
    })
    .state('projects.items', {
      url: '/projects',
      views: {
        "app@projects": {
          controller: 'projects',
          template: templates.projects
        },
        "nav@projects": {
          controller: 'projectsList',
          template: templates.project_list
        }
      }
    })
    .state('projects.items.item', {
      url: '/:id',
      views: {
        "app@projects": {
          controller: 'project',
          template: templates.project
        }
      }
    });

    $stateProvider.state('projects.projectEdit', {
      url: '/projects/:id/edits',
      views: {
        "app@projects": {
          controller: 'projectEdit',
          template: templates.project_edit
        }
      }
    });
  }]);
})(angular, window.bunsen, templates);
