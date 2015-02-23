;(function(angular, app) {
  app.directive("diskUsage", function() {
    return {
      restrict: "E",
      template: templates['directives/disk_usage'],
      controller: [
        'FilesFactory',
        '$scope',
        function(
           FilesFactory,
          $scope) {

        $scope.updateUsage = function() {
          FilesFactory.quota()
          .then(function(quota) {
            FilesFactory.getScratchSpaceFiles()
            .then(function(files) {
              var total = _.reduce(files, function(memo, file) {return memo + file.stat.size}, 0);
              $scope.diskUsage = {
                quota: quota,
                total: total,
                percent: total * 100 / quota
              };
            });
          });
        }

        $scope.updateUsage();
      }]
    }
  })
})(angular, window.bunsen);
