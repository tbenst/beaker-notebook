;(function(angular, app) {
  app.directive('contributors', ['Factories', function(F) {
    return {
      restrict: 'E',
      scope: {
        categoryId: '='
      },
      template: templates.contributors,
      link: function(scope, element) {
        scope.$watch('categoryId', function(categoryID) {
          if(categoryID !== null) {
            F.Users.getContributorsByCat(categoryID).then(function(contributors) {
              scope.contributors = contributors;
            });
          } else {
            F.Users.getContributors().then(function(contributors) {
              scope.contributors = contributors;
            });
          }
        });
      }
    }
  }]);
})(angular, window.bunsen);
