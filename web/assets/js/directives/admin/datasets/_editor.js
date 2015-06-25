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
        'category',
        'categories',
        'remoteFile',
        'dataPreviews'
      ];

      var twoSigmaMeta = [
        'title',
        'categories',
        'vendor',
        'description',
        'remoteFile',
        'lastUpdated',
        'createdAt',
        'businessOwner',
        'metaDataChanged',
        'public'
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
            var meta = defaultMeta;

            if ($scope.dataset && $scope.dataset.catalog && $scope.dataset.catalog.name == 'Two Sigma') {
              meta = twoSigmaMeta;
            }

            return _.contains(meta, attr);
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
            .one('catalogs', dataset.catalog['public-id'])
            .one('datasets/' +  dataset.id)
            .remove()
            .then(function() {
              $state.go('admin.index');
            });
          };

          $scope.getCategories = function(searchTerm) {
            return Factories.Categories.typeahead({
              'catalog-id': $scope.dataset.catalog['public-id'],
              'search-term': searchTerm
            }).then(function(categories) {
              return categories.data;
            });
          };

          $scope.setNewCatalog = function(val, dataset) {
            dataset.index = val;
            dataset.catalog = _.find($scope.catalogs, { name: val });
            delete dataset.categories;
          };

          //This function is used for angular bootstrap typeahead
          //The first return is a guard against trying to access category if it doesn't exist
          //When no input is entered, It returns the current ng-model "category"
          //When input is entered, it returns the formatted results from the search "name"
          $scope.label = function(category) {
            if (!category) { return; }
            if (!category.name) { return category; }
            return category.name;
          };

          $scope.onSelect = function(category) {
            $scope.dataset.categoryId = category['public-id'];
          };
        }]
      };
    }
  ]);
})(angular, window.bunsen);
