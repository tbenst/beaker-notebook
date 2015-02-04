;(function(angular, app) {
  app.controller('projects', [
    '$scope',
    'Factories',
    '$state',
    function(
      $scope,
      Factories,
      $state) {
    delete $scope.projects.search;

    function stateGo(item) {
      if(item.route == "notebooks") {
        $state.go('projects.items.item.notebook', { id: item.projectId, notebook_id: item.id})
      }else {
        $state.go('projects.items.item', { id: item.id})
      }
    }

    function goToLast() {
      var union = $scope.projects.list.concat($scope.notebooks.list);
      var omniList = _.filter(union, 'openedAt'),
          mostRecentItem = _.last(_.sortBy(omniList, 'openedAt'));

      stateGo(mostRecentItem || _.last(_.sortBy(union, 'createdAt')))
    }

    $scope.projects.ready.then(goToLast);
  }]);
})(angular, window.bunsen);
