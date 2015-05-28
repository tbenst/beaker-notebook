;(function(angular, app) {
  app.directive('signUp', function() {
    return {
      scope: {},
      restrict: "E",
      template: templates['auth/sign_up'],
      controller: 'authentication'
    };
  });
})(angular, window.bunsen);
