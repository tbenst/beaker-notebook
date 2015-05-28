;(function(angular, app) {
  app.controller('datasetsEdit', [
    '$scope',
    '$state',
    'Factories',
    function(
      $scope,
      state,
      Factories) {

      $scope.onEdit = function(dataset) {
        Factories.DataSets.updateDataSet(dataset).then(function(res) {
          if (res.status === 201) {
            $scope.editMessage = 'Dataset updated.';
            $scope.messageClass = 'success';
          } else {
            $scope.editMessage = 'Error updating dataset.';
            $scope.messageClass = 'error';
          }
        });
      };

      Factories.DataSets.getDataSet(state.params.index, state.params.id)
      .then(function(v) {
        $scope.dataset = v;
      });
    }
  ]);
})(angular, window.bunsen);
