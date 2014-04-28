;(function(angular, app) {
  app.controller('openNotebooks', ['$scope', 'Factories', function($scope, Factories) {
    Factories.Notebooks.getOpenNotebooks().then(function(openNotebooks) {
      $scope.$parent.openNotebooks = openNotebooks;
    });
  }]);
})(angular, window.bunsen);
