;(function(angular, app) {
  app.controller('datasetsEdit', [
    '$scope',
    '$state',
    'Factories',
    'DatasetHelper',
    function(
      $scope,
      state,
      Factories,
      DatasetHelper) {

      $scope.onEdit = function(dataset) {
        if (DatasetHelper.validateDataset(dataset)) {
          Factories.DataSets.updateDataSet(dataset).then(function(res) {
            if (res.status === 201) {
              $scope.editMessage = 'Dataset updated.';
              $scope.messageClass = 'success';
            } else {
              $scope.editMessage = 'Error updating dataset.';
              $scope.messageClass = 'error';
            }
          });
        } else {
          _.extend($scope, DatasetHelper.generateError());
        }
      };

      Factories.DataSets.getDataSet(state.params.catalogId, state.params.id)
      .then(function(v) {
        $scope.dataset = v;
      });
    }
  ]);
})(angular, window.bunsen);
