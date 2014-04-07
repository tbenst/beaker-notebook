!(function(app) {
  app.controller('application', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      if (!$rootScope.currentUser && !toState.skipAuth) {
        $rootScope.goTo = toState;
        $state.go("signIn");
        event.preventDefault();
      }
    });
  }]);
})(window.bunsen);
