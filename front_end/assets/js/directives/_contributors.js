;(function(angular, app) {
  app.directive('contributors', ['Factories', '$q', function(F, $q) {
    function getContributorRows(categoryId) {
      if (categoryId !== null) {
        return F.Users.getContributorsByCat(categoryId);
      } else {
        return F.Users.getContributors();
      }
    }

    function getContributors(categoryId) {
      return getContributorRows(categoryId)
      .then(function(rows) {
        return $q.all(_.map(rows, function(row) {
          return F.Users.getUser(row.user_id);
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
