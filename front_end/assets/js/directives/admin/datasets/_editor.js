;(function(angular, app) {
  app.directive('datasetEditor', [
    'Notebooks',
    'MarketplaceRestangular',
    'Factories',
    function(
      Notebooks,
      MarketplaceRestangular,
      Factories) {

      return {
        restrict: 'E',
        template: templates['directives/admin/datasets/editor'],
        scope: {
          dataset: '=',
          creating: '=',
          onEdit: '&'
        },
        controller: ['$scope', '$state', function($scope, $state) {
          Factories.Formats.getFormats()
          .then(function(formats) {
            $scope.formats = formats;
          });

          Factories.Vendors.getMarketplaceVendors()
          .then(function(vendors) {
            $scope.vendors = vendors;
          });

          $scope.deleteEntity = function(dataset) {
            if (!confirm('Are you sure you want to delete this dataset?')) {
              return;
            }

            MarketplaceRestangular
            .one('indices', dataset.index)
            .one('datasets/' +  dataset.id)
            .remove()
            .then(function() {
              $state.go('admin.index');
            });
          };

          $scope.getCategories = function(searchTerm) {
            return Factories.Categories.getMarketPlaceCategories({
              'index-name': $scope.dataset.index,
              'search-term': searchTerm
            });
          };

          //This function is used for angular bootstrap typeahead
          //The first return is a guard against trying to access category if it doesn't exist
          //When no input is entered, It returns the current ng-model "category"
          //When input is entered, it returns the formatted results from the search "name (path)"
          $scope.label = function(category) {
            if (!category) { return; }
            if (!category.name) { return category; }
            return category.name + ' (' + category.path + ')';
          };

          $scope.onSelect = function(category) {
            $scope.dataset.categories[0] = _.pick(category, 'id', 'name', 'path');
            $scope.dataset.categoryIds[0] = category.id;
          };
        }]
      };
    }
  ]);
})(angular, window.bunsen);
