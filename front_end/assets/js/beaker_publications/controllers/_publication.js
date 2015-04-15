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

      F.Ratings.averageRating(publication.id)
      .then(function(count) {
        _.extend($scope.publication, {averageRating: parseFloat(count.rating)});
      });

      F.Ratings.userRating(publication.id)
      .then(function(rate) {
        score = rate ? rate.score : 0;
        _.extend($scope.publication, {userRating: score});
      });
    });

    $scope.commaNeeded = function() {
      if ($scope.publication) {
        return $scope.publication.author.jobTitle && $scope.publication.author.company;
      }
    };

    $scope.destroyPublication = function() {
      F.Publications.destroy($scope.publication.id).then(function() {
        $state.go('^');
      });
    };

    $scope.downloadNotebookUrl = function() {
      return F.Publications.publicationNotebookUrl($state.params.id);
    };
  }]);
})(angular, window.bunsen);
