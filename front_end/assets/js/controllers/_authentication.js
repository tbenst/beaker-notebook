!(function(app) {
  app.controller('authentication', [
    '$rootScope',
    '$scope',
    '$state',
    'Restangular',
    '$http',
    '$sessionStorage',
    '$stateParams',
    'TrackingService',
    function(
      $rootScope,
      $scope,
      $state,
      Restangular,
      $http,
      $sessionStorage,
      $stateParams,
      TrackingService) {

    $scope.message = ''
    $scope.user = $scope.user || {};

    function signIn(d) {
      $sessionStorage.user = _.pick(d, 'name', 'id', 'role');
      $scope.message = 'You are signed in.'
      $scope.loading = false;
      if ($rootScope.goTo) {
        $state.go($rootScope.goTo);
        delete $rootScope.goTo;
      } else {
        $state.go('projects.items');
      }
    }

    $scope.showPasswordValidationErrorMessage  = function(form) {
      return form.password.$invalid && !form.password.$pristine
    };

    $scope.submit = function() {
      $scope.loading = true;
      Restangular.all('session').post($scope.user)
        .then(signIn)
        .catch(function(err) {
          $scope.loading = false;
          $scope.message = 'Error: Invalid user or password';
        });
    };

    $scope.signUp = function (isValid) {
      TrackingService.mark('SignUp');
      if(isValid) {
        $scope.loading = true;
        Restangular.all('sign_up').post($scope.user)
          .then(signIn)
          .catch(function(err) {
            $scope.loading = false;
            $scope.message = 'Error: Invalid user or password';
          });
        } else {
          $scope.message = 'Error: Please fill in form completely'
        }

    };

    $scope.sendEmail = function () {
      Restangular.all('forgot_password').post($scope.user)
        .then(function() {
          $scope.message = 'An email with further instruction has been sent';
        })
        .catch(function(err) {
          $scope.message = "Error: " + err.data;
        })
    };

    $scope.submitPassword = function(isValid) {
      if (isValid) {
        $scope.user.requestId = $stateParams.id
        Restangular.all('change_password').post($scope.user)
          .then(function() {
            $scope.message = 'Your password has been updated'
          })
          .catch(function(err) {
            $scope.message = "Error: " + err.data;
          })
      } else {
        $scope.message = "Error: The entered password is too short"
      }
    };
  }]);
})(window.bunsen);
