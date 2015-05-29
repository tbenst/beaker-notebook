;(function(angular, app) {
  app.controller('datasetsCreate', [
    '$scope',
    'Factories',
    function(
      $scope,
      factories) {

      factories.Marketplace.getCatalogs().then(function(v) {
        $scope.catalogs = v.data;
      });
      $scope.creating = true;
      $scope.dataset = {};
      $scope.onEdit = function(dataset) {
        factories.DataSets.createDataSet(dataset).then(function(res) {
          if (res.status === 201) {
            $scope.editMessage = 'Dataset created.';
            $scope.messageClass = 'success';
          } else {
            $scope.editMessage = 'Error creating dataset.';
            $scope.messageClass = 'error';
          }
        });
      };
    }]);
})(angular, window.bunsen);
