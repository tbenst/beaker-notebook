;(function(angular, app) {
  app.controller('datasetsEdit', [
    '$scope',
    '$state',
    'Factories',
    '$q',
    function(
      $scope,
      state,
      Factories,
      q) {

      $scope.onEdit = function(dataset) {
        Factories.DataSets.updateDataSet(dataset);
      };

      Factories.DataSets.getDataSet(state.params.index, state.params.id)
      .then(function(v) {
        v.startDate = moment(v.startDate).format('YYYY-MM-DD');
        v.releaseDate = moment(v.releaseDate).format('YYYY-MM-DD');
        $scope.dataset = v;
      });
    }
  ]);
})(angular, window.bunsen);

