;(function(angular, app) {
  app.controller('admin', [
    'AuthService',
    function(AuthService) {
      AuthService.isUserAdmin();
  }]);
})(angular, window.bunsen);
