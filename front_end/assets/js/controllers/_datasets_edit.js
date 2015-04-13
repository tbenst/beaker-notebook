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
        Factories.DataSets.updateDataSet(dataset);
      };

      Factories.DataSets.getDataSet(state.params.index, state.params.id)
      .then(function(v) {
        $scope.dataset = v;
      });
    }
  ]);
})(angular, window.bunsen);
