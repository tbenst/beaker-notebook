!(function(app) {
  app.controller('authentication', [
    '$rootScope',
    '$scope',
    '$state',
    'Restangular',
    'UsersRestangular',
    '$http',
    '$sessionStorage',
    '$stateParams',
    'Factories',
    'AuthService',
    function(
      $rootScope,
      $scope,
      $state,
      Restangular,
      UsersRestangular,
      $http,
      $sessionStorage,
      $stateParams,
      F,
      AuthService) {

    $scope.message = ''
    $scope.user = $scope.user || {};

    function signIn() {
      return AuthService.setUserIfLoggedIn().then(function(d) {
        $scope.message = 'You are signed in.'
        $scope.loading = false;
        if ($rootScope.goTo) {
          $state.go($rootScope.goTo);
          delete $rootScope.goTo;
        } else {
          $state.go('publications.items');
        }
      })
    }

    $scope.showPasswordValidationErrorMessage  = function(form) {
      return form.password.$invalid && !form.password.$pristine
    };

    $scope.submit = function() {
      $scope.loading = true;
      $scope.user.role = $scope.role;
      UsersRestangular.all('sessions').post($scope.user)
        .then(signIn)
        .catch(function(err) {
          $scope.loading = false;
          $scope.message = 'Error: Invalid user or password';
        });
    };

    $scope.signUp = function (isValid) {
      if(isValid) {
        $scope.loading = true;
        $scope.user.roles = $scope.roles;
        UsersRestangular.all('users').post($scope.user)
          .then(signIn)
          .catch(function(err) {
            $scope.loading = false;
            if(err.status === 422 && err.data.email) {
              $scope.message = 'Error: ' + err.data.email[0];
            } else {
              $scope.message = 'Error: Invalid name or password';
            }
          });
        } else {
          $scope.message = 'Error: Please fill in form completely'
        }
    };
  }]);
})(window.bunsen);
