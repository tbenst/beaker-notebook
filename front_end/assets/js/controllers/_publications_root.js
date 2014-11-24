;(function(app) {
  app.controller('publicationsRoot', ['$scope', 'Factories', '$state', function($scope, Factories, $state) {
    $scope.publications = {};

    $scope.byPublicationFilter = function(p) {
      if (!$scope.publications.search) {return true}
      var name = p.name.toLowerCase();
      var desc = (p.description ? p.description : '').toLowerCase();
      var term = $scope.publications.search.toLowerCase();
      return name.indexOf(term) != -1 || desc.indexOf(term) != -1;
    };

    $scope.$watch('publications.search', function(v) {
      if (v !== void(0) && v !== '') {
        if ($state.is('publications.items.item')) {
          // Search was triggered on the details page, switch to the list view and show results
          $scope.publications.goBack = $state.params.id;
          $state.go('publications.items');
        }
      } else if ($state.is('publications.items') && $scope.publications.goBack) {
        // Empty search term, go back to the original state
        var id = $scope.publications.goBack;
        delete $scope.publications.goBack
        $state.go('publications.items.item', {id: id});
      }
    });
  }]);
})(window.bunsen);
