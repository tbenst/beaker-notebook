;(function(angular, app) {
  app.directive('contributors', ['Factories', '$q', function(F, $q) {
    function getContributorIds(categoryId) {
      if (categoryId !== undefined) {
        return F.Users.getContributorsByCat(categoryId);
      } else {
        return F.Users.getContributors();
      }
    }

    function getContributors(categoryId) {
      return getContributorIds(categoryId)
      .then(function(ids) {
        return $q.all(_.map(ids, function(id) {
          return F.Users.getUser(id);
        }));
      })
    }

    return {
      restrict: 'E',
      scope: {
        categoryId: '='
      },
      template: templates.contributors,
      link: function(scope, element) {
        scope.$watch('categoryId', function(categoryId) {
          getContributors(categoryId)
          .then(function(contributors) {
            scope.contributors = contributors;
          })
        });
      }
    }
  }]);
})(angular, window.bunsen);
