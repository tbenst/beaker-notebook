;(function(angular, app) {
  app.controller('recentNotebooks', ['$scope', 'Factories', 'Notebooks', function($scope, Factories, Notebooks) {
    Factories.Notebooks.getRecentNotebooks().then(function(d) {
      $scope.recentNotebooks = Notebooks.setRecentNotebooks(d);

      $scope.$on('recentNotebookChange', function() {
        $scope.recentNotebooks = Notebooks.getRecentNotebooks();
      });
    });
  }]);
})(angular, window.bunsen);
