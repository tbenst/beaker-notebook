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
        rateableId: 'publications' + ':' + $state.params.id.toString()
      };

      F.Publications.getPublication($state.params.id).then(function(publication) {
        $scope.publication = publication;
        F.Users.getUser(publication.userId).then(function(author) {
          $scope.author = author;
          $scope.isOwner = (author['public-id'] === $sessionStorage.user.id);
        })

        F.Ratings.averageRating($scope.ratingAttrs)
        .then(function(count) {
          _.extend($scope.publication, {averageRating: parseFloat(count)});
        });

        F.Ratings.userRating($scope.ratingAttrs)
        .then(function(rate) {
          _.extend($scope.publication, {userRating: rate});
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
      F.Publications.destroy($scope.publication.id).then(function() {
        $state.go('^');
      });
    };
  }]);
})(angular, window.bunsen);
