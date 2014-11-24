!(function(app) {
  app.controller('application', [
    '$rootScope',
    '$scope',
    '$state',
    '$sessionStorage',
    '$http',
    'Restangular',
    function($rootScope, $scope, $state, $sessionStorage, $http, Restangular) {
      $rootScope.$session = $sessionStorage;

      $scope.$state = $state;
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        $rootScope.referrer = {
          fromState: fromState,
          fromParams: fromParams
        }

        if (!$sessionStorage.currentUser && !toState.skipAuth) {
          $rootScope.goTo = toState;
          $state.go("signIn");
          event.preventDefault();
        }
      });

      $rootScope.signOut = function() {
        delete $sessionStorage.currentUser;
        return Restangular.all('sign_out').post();
      }
  }]);
})(window.bunsen);
