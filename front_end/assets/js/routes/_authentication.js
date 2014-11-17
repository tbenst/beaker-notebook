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
            }],
            views: {
              root: {
                controller: ['$state', function($state){
                  $state.go('landing');
                }]
              }
            }
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
          });
    }]
  );
})(angular, window.bunsen, templates);
