;(function(angular, app) {
  app.directive('datasetProperties', function() {
    return {
      restrict: 'E',
      scope: {
        item:  "="
      },
      template: templates.dataset_properties,
      controller: ['$scope', function($scope) {

        var specialUiAttrs = ['csvPreview', 'description', 'numColumns', 'remoteFile', 'rows', 'startDate', 'tags', 'title', 'dataPreviews', 'categories', 'vendor'];
        var ignoreAttrs = ['subscriberIds', 'id', 'tabView']
        var omitAttrs = specialUiAttrs.concat(ignoreAttrs);

        $scope.item.filteredMeta = _.omit($scope.item, omitAttrs);
        if ($scope.item.startDate) {
          $scope.item.startDate = moment().utc($scope.item.startDate).format("M/DD/YY");
        }

        if ($scope.item.tags) {
          $scope.item.tags = $scope.item.tags.toString();
        }

      }]
    }
  });
})(angular, window.bunsen);
