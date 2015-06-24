;(function(app) {
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
    'TrackingService',
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
      TrackingService,
      AuthService) {

      $scope.message = '';
      $scope.user = $scope.user || {};

      function signIn() {
        return AuthService.setUserIfLoggedIn().then(function(d) {
          $scope.message = 'You are signed in.';
          $scope.loading = false;
          if ($rootScope.goTo) {
            $state.go($rootScope.goTo);
            delete $rootScope.goTo;
          } else {
            $state.go('projects.items');
          }
        });
      }

      $scope.showPasswordValidationErrorMessage  = function(form) {
        return form.password.$invalid && !form.password.$pristine;
      };

      $scope.submit = function() {
        TrackingService.mark('SignIn');
        $scope.loading = true;
        $scope.user.role = $scope.role;
        UsersRestangular.all('sessions').post($scope.user)
          .then(signIn)
          .catch(function(err) {
            $scope.loading = false;
            $scope.message = 'Error: Invalid user or password';
          });
      };

      $scope.signUp = function(isValid) {
        TrackingService.mark('SignUp');
        if (isValid) {
          $scope.loading = true;
          $scope.user.roles = $scope.roles;
          UsersRestangular.all('users').post($scope.user)
            .then(signIn)
            .catch(function(err) {
              $scope.loading = false;
              if(err.status === 422 && err.data.email) {
                $scope.message = 'Error: ' + err.data.email[0];
              } else {
                $scope.message = 'Error: Invalid user or password';
              }
            });
        } else {
          $scope.message = 'Error: Please fill in form completely';
        }

      };

      $scope.sendEmail = function() {
        Restangular.all('forgot_password').post($scope.user)
          .then(function() {
            $scope.message = 'An email with further instruction has been sent';
          })
          .catch(function(err) {
            $scope.message = 'Error: ' + err.data;
          });
      };

      $scope.submitPassword = function(isValid) {
        if (isValid) {
          $scope.user.requestId = $stateParams.id;
          Restangular.all('change_password').post($scope.user)
            .then(function() {
              $scope.message = 'Your password has been updated';
            })
            .catch(function(err) {
              $scope.message = 'Error: ' + err.data;
            });
        } else {
          $scope.message = 'Error: The entered password is too short';
        }
      };
    }]
  );
})(window.bunsen);
