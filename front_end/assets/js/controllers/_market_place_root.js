!(function(app) {

  app.controller('marketPlaceRoot', ['$scope', '$state', function($scope, $state) {
    $scope.marketPlace  = {};

    $scope.vendorName = function(item) {
      var vendor = _.findWhere($scope.marketPlace.vendors, {id: item.vendorId});
      return vendor ? vendor.name : '';
    };

    function clearSearch() {
      var deleteList = ['categoryID', 'vendorScope', 'typeScope', 'tagScope', 'searchTerm', 'searchScope'];
      _.each(deleteList, function(i) {
        delete $scope.marketPlace[i];
      });

      // angular-tree-view doesn't appear to expose a way to clear selection.
      _.each(Sizzle('.sidebar-tree .tree-selected'), function(el) {
        el.classList.remove('tree-selected');
      });
    }

    $scope.newSearch = function(preserve) {
      clearSearch();
      _.extend($scope.marketPlace, preserve);
      $scope.marketPlace.currentPage = 1;
      delete $scope.marketPlace.data;
      $state.go('marketPlace.items');
    }
  }]);

})(window.bunsen);
