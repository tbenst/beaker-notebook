;(function(angular, app) {
  app.directive('tags', [
    'Factories',
    function(
      Factories) {
      return {
        restrict: 'E',
        scope: {
          datasetTags:  '='
        },
        template: templates['directives/tag_display'],
        controller: ['$scope', function($scope) {
          function getTags() {
            Factories.Tags.getTags()
            .then(function(tags) {
              $scope.allTags = _.difference(tags.data, $scope.datasetTags);
            });
          }

          $scope.add = function() {
            $scope.datasetTags = $scope.datasetTags || [];

            if (_.indexOf($scope.datasetTags, $scope.newTag) !== -1 || !$scope.newTag) {return;}
            $scope.datasetTags.push($scope.newTag);
            $scope.newTag = '';
          };

          $scope.remove = function(index) {
            $scope.datasetTags.splice(index, 1);
          };

          $scope.$watchCollection('datasetTags', function() {
            getTags();
          });
        }]
      };
    }]);
})(angular, window.bunsen);
