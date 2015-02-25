!(function(angular, app, templates) {
  app.config(['$stateProvider', '$urlRouterProvider', function setRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/help', '/help/home')
    $stateProvider
      .state('help', {
        abstract: true,
        skipAuth: true,
        views: {
          root: {
            controller: 'help',
            template: templates['help/help_root']
          }
        }
      })
      .state('help.main', {
        url: '/help',
        skipAuth: true,
        views: {
          'main': {
            template: templates['help/main']
          },
          'topics_list_sidebar': {
            template: templates['help/topics_nav']
          },
          'sections_list_sidebar': {
            template: templates['help/sections_nav']
          }
        }
      })
      .state('help.main.home', {
        url:'/home',
        skipAuth: true,
        views: {
          'topic_display@help.main': {
            template: templates['help/home']
          }
        }
      })
      .state('help.main.topic1', {
        url: '/topic1',
        skipAuth: true,
        views: {
          'topic_display@help.main': {
            template: templates['help/topic_display']
          },
        }
      })
      .state('help.main.topic2', {
        url: '/topic2',
        skipAuth: true,
        views: {
          'topic_display@help.main': {
            template: templates['help/topic_display']
          }
        }
      });
  }]);
})(angular, window.bunsen, templates);
