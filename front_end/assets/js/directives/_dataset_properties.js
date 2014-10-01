;(function(angular, app) {
  app.directive('datasetProperties', function() {
    return {
      restrict: 'E',
      scope: {
        item:  "="
      },
      template: templates.dataset_properties,
      controller: ['$scope', function($scope) {

        var uiOmittedMetadata = ['csvPreview','description', 'numColumns', 'remoteFile', 'rows', 'startDate', 'tags','title'];
        $scope.item.filteredMeta = _.omit($scope.item.metadata, uiOmittedMetadata);

        if ($scope.item.metadata.startDate) {
          $scope.item.metadata.startDate = moment().utc($scope.item.metadata.startDate).format("M/DD/YY");
        }

        if ($scope.item.metadata.tags) {
          $scope.item.metadata.tags = $scope.item.metadata.tags.toString();
        }

      }]
    }
  });
})(angular, window.bunsen);
