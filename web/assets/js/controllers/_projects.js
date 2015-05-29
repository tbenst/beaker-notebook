;(function(angular, app) {
  app.controller('projects', [
    '$scope',
    'LastViewed',
    '$state',
    function(
      $scope,
      LastViewed,
      $state) {
    $scope.projects.search = null;

    $scope.projects.ready.then(function() {
      var lastViewed = LastViewed.get('projects');
      var redirectTo = lastViewed || {
        name: 'projects.items.item',
        params: { id: _.last(_.sortBy($scope.projects.list, 'created-at'))['public-id'] }
      }

      $state.go(redirectTo.name, redirectTo.params);
    });
  }]);
})(angular, window.bunsen);
