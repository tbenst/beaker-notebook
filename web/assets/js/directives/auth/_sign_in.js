;(function(angular, app) {
  app.directive('signIn', function() {
    return {
      scope: {
        role: '='
      },
      restrict: "E",
      template: templates['auth/sign_in'],
      controller: 'authentication'
    };
  });
})(angular, window.bunsen);
