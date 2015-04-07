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
        factories.DataSets.createDataSet(dataset);
      };
    }]);
})(angular, window.bunsen);
