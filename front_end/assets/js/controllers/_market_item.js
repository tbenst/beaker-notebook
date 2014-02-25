!(function(angular, app) {
  app.controller('marketItem', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
    $scope.item = {
      title: "a sample title",
      vendor: "vendor X",
      description: "this is the description"
    };
  }]);
})(angular, window.bunsen);
