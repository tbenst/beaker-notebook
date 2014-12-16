;(function(angular, app) {
  app.controller('publication', [
    '$scope',
    '$state',
    '$compile',
    'Factories',
    '$sessionStorage',
    function(
      $scope,
      $state,
      $compile,
      Factories,
      $sessionStorage) {

    var F = Factories;

    F.Publications.getPublication($state.params.id).then(function(publication) {
      $scope.publication = publication;
      $scope.isOwner = (publication.author.id === $sessionStorage.user.id);
    });

    $scope.copyNotebook = function() {
      $scope.$emit('openModal', $compile(templates.copy_notebook_modal())($scope));
    };

    $scope.commaNeeded = function() {
      return $scope.publication.author.jobTitle && $scope.publication.author.company;
    };

    $scope.destroyPublication = function() {
      F.Publications.destroy($scope.publication.id).then(function() {
        $state.go('^');
      });
    };
  }]);
})(angular, window.bunsen);
