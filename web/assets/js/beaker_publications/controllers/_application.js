!(function(app) {
  app.controller('application', [
    '$scope',
    '$rootScope',
    '$state',
    'UsersRestangular',
    'FullscreenState',
    '$sessionStorage',
    function(
      $scope,
      $rootScope,
      $state,
      UsersRestangular,
      FullscreenState,
      $sessionStorage) {
      $rootScope.$session = $sessionStorage;
      $rootScope.$state = $state;
      $scope.isFullscreen = FullscreenState.isFullscreen;
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
