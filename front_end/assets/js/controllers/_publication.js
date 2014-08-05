;(function(angular, app) {
  app.controller('publication', ['$scope', '$state', '$compile', 'Factories', function($scope, $state, $compile, Factories) {
    var F = Factories;

    F.Publications.getPublication($state.params.id).then(function(publication) {
      $scope.publication = publication;
    });

    $scope.copyNotebook = function() {
      $scope.$emit('openModal', $compile(templates.copy_notebook_modal())($scope));
    };
  }]);
})(angular, window.bunsen);
