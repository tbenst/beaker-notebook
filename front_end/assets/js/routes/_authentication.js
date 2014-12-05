!(function(angular, app, templates) {
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function setRoutes(
      $stateProvider,
      $urlRouterProvider) {
        $stateProvider
          .state('signIn', {
            url: '/sign_in',
            skipAuth: true,
            views: {
              root: {
                controller: 'authentication',
                template: templates.sign_in
              }
            }
          })
          .state('signOut', {
            url: '/sign_out',
            skipAuth: true,
            onEnter: ['$rootScope', function($rootScope) {
              $rootScope.signOut();
            }]
          })
          .state('signUp', {
            url: '/sign_up',
            skipAuth: true,
            views: {
              root: {
                controller: 'authentication',
                template: templates.sign_up
              }
            }
          })
          .state('retrievePassword', {
            url: '/retrieve_password',
            skipAuth: true,
            views: {
              root: {
                controller: 'authentication',
                template: templates.forgot_password
              }
            }
          })
          .state('changePassword', {
            url: '/change_password?id',
            skipAuth: true,
            views: {
              root: {
                controller: 'authentication',
                template: templates.change_password
              }
            }
          });
    }]
  );
})(angular, window.bunsen, templates);
