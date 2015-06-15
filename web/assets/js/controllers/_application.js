;(function(app) {
  app.controller('application', [
    '$rootScope',
    '$scope',
    '$state',
    '$cookies',
    '$http',
    'Restangular',
    'UsersRestangular',
    '$sessionStorage',
    'AuthService',
    'Factories',
    'LastViewed',
    function(
      $rootScope,
      $scope,
      $state,
      $cookies,
      $http,
      Restangular,
      UsersRestangular,
      $sessionStorage,
      AuthService,
      F,
      LastViewed) {
      $rootScope.$session = $sessionStorage;

      $scope.showingNotebook = function() {
        return $state.is('projects.items.item.notebook');
      };

      $scope.$state = $state;
      var stateListener = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.referrer = {
          fromState: fromState,
          fromParams: fromParams
        };

        if ($sessionStorage.user) {
          $scope.user = $sessionStorage.user;
        } else if (!toState.skipAuth) {
          AuthService.setUserIfLoggedIn()
          .then(function() {
            $scope.user = $sessionStorage.user;
          })
          .catch(function() {
            if (!$sessionStorage.user) {
              $rootScope.goTo = toState;
              $state.go('landing');
              event.preventDefault();
            }
          });
        }
      });

      $scope.$watch(function() {
        return $cookies.session;
      }, function() {
        if (!$cookies.session && $sessionStorage.user) {
          $rootScope.signOut();
        }
      });

      $scope.$watch(function() {
        return $sessionStorage.user;
      }, function() {
        $scope.isUserAdmin = AuthService.isUserAdmin();
      });

      $rootScope.signOut = function() {
        $sessionStorage.$reset();
        return UsersRestangular.all('session').remove()
        .then(function() {
          $state.go('landing');
        });
      };

      $scope.$on('$destroy', function() {
        stateListener();
      });

    }
  ]);
})(window.bunsen);
