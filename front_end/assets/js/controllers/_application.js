!(function(app) {
  app.controller('application', [
    '$rootScope',
    '$scope',
    '$state',
    '$cookies',
    '$http',
    'Restangular',
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
      $sessionStorage,
      AuthService,
      F,
      BeakerNotebookService) {
      $rootScope.$session = $sessionStorage;

      $scope.$state = $state;
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        $rootScope.referrer = {
          fromState: fromState,
          fromParams: fromParams
        }

        if ($sessionStorage.user) {
          $scope.user = $sessionStorage.user
        }
        else if (!toState.skipAuth) {
          AuthService.setUserIfLoggedIn()
          .then(function() {
            $scope.user = $sessionStorage.user;
          })
          .catch(function() {
            if (!$sessionStorage.user) {
              $rootScope.goTo = toState;
              $state.go("signIn");
              event.preventDefault();
            }
          })
        }
      });

      $scope.$watch(function() {
        return $cookies.user;
      }, function() {
        if ($cookies.user && $sessionStorage.user) {
          F.Notebooks.getOpened().then(function(notebooks) {
            if (notebooks.length) {
              return BeakerNotebookService.loadOpened(notebooks);
            }
          });
        }

        if (!$cookies.user && $sessionStorage.user) {
          $rootScope.signOut();
        }
      })

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
