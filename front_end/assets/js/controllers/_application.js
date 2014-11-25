!(function(app) {
  app.controller('application', [
    '$rootScope',
    '$scope',
    '$state',
    '$cookies',
    '$http',
    'Restangular',
    function($rootScope, $scope, $state, $cookies, $http, Restangular) {
      $rootScope.$session = $cookies;

      $scope.$state = $state;
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        $rootScope.referrer = {
          fromState: fromState,
          fromParams: fromParams
        }

        if (!$cookies.currentUserId && !toState.skipAuth) {
          $rootScope.goTo = toState;
          $state.go("signIn");
          event.preventDefault();
        }
      });

      $scope.cachedNotebooks = $scope.cachedNotebooks || {};

      $rootScope.signOut = function() {
        delete $cookies.currentUserId;
        return Restangular.all('sign_out').post();
      }
  }]);
})(window.bunsen);
