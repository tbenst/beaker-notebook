!(function(app) {
  app.controller('application', [
    '$scope',
    '$rootScope',
    '$state',
    'UsersRestangular',
    '$sessionStorage',
    function(
      $scope,
      $rootScope,
      $state,
      UsersRestangular,
      $sessionStorage) {
      $rootScope.$session = $sessionStorage;
      $state.go('publications.items');

      $rootScope.signOut = function() {
        $sessionStorage.$reset();
        return UsersRestangular.all('session').remove()
        .then(function() {
          $state.go('publications.items');
        });
      };
  }]);
})(window.bunsen);
