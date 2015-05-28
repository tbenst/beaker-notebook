!(function(app) {
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
    'BeakerNotebookService',
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
      BeakerNotebookService) {
      $rootScope.$session = $sessionStorage;

      $scope.$state = $state;
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
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
        if ($cookies.session && $sessionStorage.user) {
          $scope.isUserAdmin = AuthService.isUserAdmin();
        }

        if (!$cookies.session && $sessionStorage.user) {
          $rootScope.signOut();
        }
      });

      $rootScope.signOut = function() {
        delete $sessionStorage.user;
        return UsersRestangular.all('session').remove()
        .then(function() {
          $state.go('landing');
        });
      };

    }
  ]);
})(window.bunsen);
