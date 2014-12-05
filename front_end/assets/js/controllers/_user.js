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

    F.Users.getUser().then(function(u) {
      $scope.user = u;
    })

    $scope.toggleEditMode = function() {
      $scope.editMode = !$scope.editMode;
    }

    $scope.editUser = function (isValid) {
      if (isValid) {
        $scope.loading = true;
        $scope.user.customPUT($scope.user).then(function(u) {
          $sessionStorage.user = _.pick(u, 'name', 'id');
          $scope.user = u;
          $scope.message = "User Updated"
          $scope.loading = false;
        })
        .catch(function (err) {
          $scope.message  = "Error: " + err.data;
        })
      } else {
        $scope.message = "Please fill out the form completely.";
      }

    }
  }]);
})(angular, window.bunsen);
