;(function(angular, app) {
  app.controller('datasetsCreate', [
    '$scope',
    'Factories',
    'DatasetHelper',
    function(
      $scope,
      factories,
      DatasetHelper) {

      factories.Marketplace.getCatalogs().then(function(v) {
        $scope.catalogs = v.data;
      });
      $scope.creating = true;
      $scope.dataset = {};
      $scope.onEdit = function(dataset) {
        if (DatasetHelper.validateDataset(dataset)) {
          factories.DataSets.createDataSet(dataset).then(function(res) {
            if (res.status === 201) {
              $scope.editMessage = 'Dataset created.';
              $scope.messageClass = 'success';
            } else {
              $scope.editMessage = 'Error creating dataset.';
              $scope.messageClass = 'error';
            }
          });
        } else {
          _.extend($scope, DatasetHelper.generateError());
        }
      };
    }]);
})(angular, window.bunsen);
