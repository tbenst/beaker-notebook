;(function(angular, app) {
  app.directive('contributors', ['Factories', function(F) {
    return {
      restrict: 'E',
      template: templates.contributors,
      link: function(scope, element) {
        F.Users.getContributors().then(function(contributors) {
          scope.contributors.list = contributors;
        });
      }
    }
  }]);
})(angular, window.bunsen);
