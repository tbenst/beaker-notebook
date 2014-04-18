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
    .state('projects.items.search', {
      url: '/search',
      views: {
        "app@projects": {
          controller: 'projectSearch',
          template: templates.project_search
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
    })
    .state('projects.items.item.search', {
      url: '/search',
      views: {
        "app@projects": {
          controller: 'projectSearch',
          template: templates.project_search
        }
      }
    })
    .state('projects.items.item.notebook', {
        url: '/notebooks/:name',
        views: {
          "app@projects": {
            controller: 'notebook',
            template: templates.notebook
          },
          "nav@projects": {
            controller: 'project',
            template: templates.notebook_list
          }
        }
      })
    .state('projects.items.item.notebook.new', {
      url: '/notebooks/new',
      views: {
        "app@projects": {
          controller: 'notebook',
          template: templates.notebook
        },
        "nav@projects": {
          controller: 'project',
          template: templates.notebook_list
        }
      }
    })
    .state('projects.items.item.notebook.search', {
      url: '/search',
      views: {
        "app@projects": {
          controller: 'projectSearch',
          template: templates.project_search
        }
      }
    });
  }]);
})(angular, window.bunsen, templates);
