;(function(angular, app) {
  app.directive('datasetEditor', [
    'Notebooks',
    'MarketplaceRestangular',
    'Factories',
    function(
      Notebooks,
      MarketplaceRestangular,
      Factories) {

      var defaultMeta = [
        'title',
        'description',
        'vendor',
        'format',
        'releaseDate',
        'startDate',
        'updateFrequency',
        'tags',
        'categories',
        'remoteFile',
        'dataPreviews'
      ];

      return {
        restrict: 'E',
        template: templates['directives/admin/datasets/editor'],
        scope: {
          dataset: '=',
          creating: '=',
          onEdit: '&',
          catalogs: '='
        },
        controller: ['$scope', '$state', function($scope, $state) {
          function vendorIsPresent(dataset) {
            return _.has(dataset, 'vendor');
          }

          function getDatasetVendor(dataset) {
            if (vendorIsPresent(dataset)) {
              return $scope.dataset.vendor.name;
            }
          }

          function setDatasetVendor(dataset) {
            if (vendorIsPresent(dataset)) {
              $scope.dataset.vendor = $scope.dataset.vendor.id;
            }
          }

          $scope.$watch('dataset', function(newVal) {
            if (!newVal) {
              return;
            }

            $scope.vendorName = getDatasetVendor($scope.dataset);
            setDatasetVendor($scope.dataset);
          });

          Factories.Formats.getFormats()
          .then(function(formats) {
            $scope.formats = formats.data;
          });

          Factories.Vendors.getMarketplaceVendors()
          .then(function(vendors) {
            $scope.vendors = vendors.data;
          });

          $scope.datasetHas = function(attr) {
            return _.contains(defaultMeta, attr);
          };

          $scope.updateVendor = function(vendor) {
            $scope.dataset.vendor = vendor['public-id'];
            $scope.vendorName = vendor.name;
          };

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
            return Factories.Categories.typeahead({
              'index-name': $scope.dataset.index,
              'search-term': searchTerm
            }).then(function(categories) {
              return categories.data;
            });
          };

          $scope.setNewCatalog = function(val, dataset) {
            dataset.index = val;
            delete dataset.categories;
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
            // When creating a new dataset we need to ensure that
            // we have the values set to an inital empty array, otherwise
            // we get an error since we are trying to access [0] of undefined.
            $scope.dataset.categories = $scope.dataset.categories || [];
            $scope.dataset.categoryIds = $scope.dataset.categoryIds || [];

            $scope.dataset.categories[0] = _.pick(category, 'id', 'name', 'path');
            $scope.dataset.categoryIds[0] = category.id;
          };
        }]
      };
    }
  ]);
})(angular, window.bunsen);
