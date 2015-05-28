;(function(angular, app) {
  app.directive('forgotPassword', function() {
    return {
      scope: {},
      restrict: "E",
      template: templates['auth/forgot_password'],
      controller: 'authentication'
    };
  });
})(angular, window.bunsen);
