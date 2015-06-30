;(function(angular, app) {
  app.controller('publication', [
    '$scope',
    '$state',
    '$compile',
    'Factories',
    'FullscreenState',
    'UserPreferences',
    '$window',
    '$sessionStorage',
    function(
      $scope,
      $state,
      $compile,
      Factories,
      FullscreenState,
      UserPreferences,
      $window,
      $sessionStorage) {

    var F = Factories;

    FullscreenState.toggleFullscreen(UserPreferences.get('fullscreenView'));

    $scope.ratingAttrs = {
      rateableId: $state.params.id.toString()
    };

    F.Publications.getPublication($state.params.id).then(function(publication) {
      $scope.publication = publication;
      F.Users.getUser(publication['author-id']).then(function(author) {
        $scope.author = author;
        $scope.isOwner = ($sessionStorage.user && author['public-id'] === $sessionStorage.user.id);
        $scope.isBunsenUser = $sessionStorage.user && _.contains($sessionStorage.user.roles, "bunsen");
      })

      F.Ratings.averagePubRating(publication['public-id'])
      .then(function(count) {
        _.extend($scope.publication, {averageRating: parseFloat(count.rating)});
      });

      if ($sessionStorage.user) {
        F.Ratings.userPubRating(publication['public-id'])
        .then(function(rate) {
          score = rate ? rate.score : 0;
          _.extend($scope.publication, {userRating: score});
        });
      }
    });

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

    $scope.downloadNotebookUrl = function() {
      return F.Publications.publicationNotebookUrl($state.params.id);
    };

    $scope.goBack = function() {
      $window.history.back();
    }

    $scope.$on('$destroy', function() {
      FullscreenState.toggleFullscreen(false);
    });
  }]);
})(angular, window.bunsen);
