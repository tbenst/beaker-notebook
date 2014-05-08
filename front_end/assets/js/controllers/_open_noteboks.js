;(function(angular, app) {
  app.controller('openNotebooks', ['$scope', 'Factories', 'Notebooks', function($scope, Factories, Notebooks) {
    Factories.Notebooks.getOpenNotebooks().then(function(openNotebooks) {
      $scope.openNotebooks = Notebooks.setOpenNotebooks(openNotebooks);

      $scope.$on('openNotebookChange', function() {
        $scope.openNotebooks = Notebooks.getOpenNotebooks();
      });
    });
  }]);
})(angular, window.bunsen);
