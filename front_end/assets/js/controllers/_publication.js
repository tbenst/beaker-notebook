;(function(angular, app) {
  app.controller('publication', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    F.Publications.getPublication($state.params.id).then(function(publication) {
      $scope.publication = publication;
    });
  }]);
})(angular, window.bunsen);
