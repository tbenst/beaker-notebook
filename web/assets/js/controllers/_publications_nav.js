;(function(angular, app) {
  app.controller('publicationsNav', [
    '$scope',
    '$state',
    'Factories',
    function($scope, $state, F) {
      $scope.treeOptions = { nodeChildren: "children" };

      $scope.filterByCategory = function(id) {
        $scope.publications.currentPage = 1;
        $state.go('publications.items', { category_id: id });
      };

      F.PublicationCategories.getAll().then(function(categories) {
        $scope.publications.categories = categories;
      });
    }
  ]);
})(angular, window.bunsen);
