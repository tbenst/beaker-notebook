;(function(angular, app) {
  app.controller('admin', [
    'AuthService',
    function(AuthService) {
      AuthService.researcherRedirect();
  }]);
})(angular, window.bunsen);
