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

    var unbindWatcher = $scope.$watch('user', function(v) {
      if (v) {
        getPublicationWithRatings();
        unbindWatcher();
      }
    });

    function getPublicationWithRatings() {
      $scope.ratingAttrs = {
        rateableId: $state.params.id.toString()
      };

      F.Publications.getPublication($state.params.id).then(function(publication) {
        $scope.publication = publication;
        F.Users.getUser(publication['author-id']).then(function(author) {
          $scope.author = author;
          $scope.isOwner = (author['public-id'] === $sessionStorage.user.id);
        })

        F.Ratings.averagePubRating(publication['public-id'])
        .then(function(count) {
          _.extend($scope.publication, {averageRating: parseFloat(count.rating)});
        });

        F.Ratings.userPubRating(publication['public-id'])
        .then(function(rate) {
          score = rate ? rate.score : 0;
          _.extend($scope.publication, {userRating: score});
        });
      });
    }


    $scope.copyNotebook = function() {
      $scope.$emit('openModal', $compile(templates.copy_notebook_modal())($scope));
    };

    $scope.commaNeeded = function() {
      if ($scope.author) {
        return $scope.author['job-title'] && $scope.author.company;
      }
    };

    $scope.destroyPublication = function() {
      F.Publications.destroy($scope.publication['public-id']).then(function() {
        $state.go('^');
      });
    };
  }]);
})(angular, window.bunsen);
