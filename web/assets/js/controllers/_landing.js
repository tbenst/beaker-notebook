;(function(angular, app) {
  app.controller('landing', [
    '$state',
    '$sessionStorage',
    'AuthService',
    function(
      $state,
      $sessionStorage,
      AuthService) {

      AuthService.setUserIfLoggedIn()
      .then(function() {
        if ($sessionStorage.user) {
          $state.go('projects.items');
        }
      })
  }]);
})(angular, window.bunsen);
