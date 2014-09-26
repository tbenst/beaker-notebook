;(function(angular, app) {
  app.directive('datasetProperties', function() {
    return {
      restrict: 'E',
      scope: {
        item:  "="
      },
      template: templates.dataset_properties,
      controller: ['$scope', function($scope) {
        var toUTCDate = function(date){
          var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
          return utc;
        };

        var millisToUTCDate = function(millis){
          return toUTCDate(new Date(millis));
        };

        var uiOmittedMetadata = ['csvPreview','description', 'numColumns', 'remoteFile', 'rows', 'startDate', 'tags','title'];
        $scope.item.filteredMeta = _.omit($scope.item.metadata, uiOmittedMetadata);

        if ($scope.item.metadata.startDate) {
          $scope.item.metadata.startDate = millisToUTCDate($scope.item.metadata.startDate);
        }

        if ($scope.item.metadata.tags) {
          $scope.item.metadata.tags = $scope.item.metadata.tags.toString();
        }

      }]
    }
  });
})(angular, window.bunsen);
