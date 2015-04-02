;(function(angular, app) {
  app.directive('datasetEditor', [
    'Notebooks',
    'MarketplaceRestangular',
    function(
      Notebooks,
      MarketplaceRestangular) {

      return {
        restrict: 'E',
        template: templates['directives/admin/datasets/editor'],
        scope: {
          dataset: '=',
          creating: '=',
          onEdit: '&'
        },
        controller: ['$scope', '$state', function($scope, $state) {
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
        }]
      };
    }
  ]);
})(angular, window.bunsen);
