;(function(angular, app) {
  app.controller('user', [
    '$scope',
    '$state',
    'Factories',
    '$sessionStorage',
    function(
      $scope,
      $state,
      Factories,
      $sessionStorage) {

    var F = Factories;
    $scope.user = {};
    $scope.loading = false;

    F.Users.getCurrentUser().then(function(u) {
      $scope.user = u;
    })

    $scope.toggleEditMode = function() {
      $scope.editMode = !$scope.editMode;
    }

    $scope.editUser = function (isValid) {
      if (isValid) {
        $scope.loading = true;
        F.Users.update($scope.user).then(function(u) {
          $sessionStorage.user.name = u.name;
          $scope.user = u;
          $scope.message = "User Updated"
        })
        .catch(function (err) {
          if (err.status == 401) {
            $scope.message = "Error: incorrect password"
          } else {
            $scope.message  = "Error: " + err.data.password[0];
          }
        })
        .finally(function() {
          $scope.loading = false;
        })
      } else {
        $scope.message = "Please fill out the form completely.";
      }

    }
  }]);
})(angular, window.bunsen);
