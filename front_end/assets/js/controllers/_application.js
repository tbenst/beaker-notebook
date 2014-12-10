!(function(app) {
  app.controller('application', [
    '$rootScope',
    '$scope',
    '$state',
    '$cookies',
    '$http',
    'Restangular',
    '$sessionStorage',
    function($rootScope, $scope, $state, $cookies, $http, Restangular, $sessionStorage) {
      $rootScope.$session = $sessionStorage;

      $scope.$state = $state;
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        $rootScope.referrer = {
          fromState: fromState,
          fromParams: fromParams
        }

        if (!$sessionStorage.user && !toState.skipAuth) {
          $rootScope.goTo = toState;
          $state.go("signIn");
          event.preventDefault();
        }
      });

      $rootScope.cachedNotebooks = $rootScope.cachedNotebooks || {};

      $scope.className = function() {
        var ngClass = $state.current.name;
        if ($state.includes('projects.items.item.notebook')) {
          ngClass += " projects";
        }
        return ngClass;
      }

      $rootScope.signOut = function() {
        delete $sessionStorage.user;
        return Restangular.all('session').remove()
        .then(function() {
          $state.go('landing');
        })
      }
  }]);
})(window.bunsen);
