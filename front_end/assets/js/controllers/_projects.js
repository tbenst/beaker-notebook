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
        $state.go('projects.items.item.notebook', { id: item.project['public-id'], notebook_id: item['public-id']})
      }else {
        $state.go('projects.items.item', { id: item['public-id']})
      }
    }

    function goToLast() {
      var union = $scope.projects.list.concat($scope.notebooks.list);
      var omniList = _.filter(union, 'opened-at'),
          mostRecentItem = _.last(_.sortBy(omniList, 'opened-at'));

      stateGo(mostRecentItem || _.last(_.sortBy($scope.projects.list, 'created-at')))
    }

    $scope.projects.ready.then(goToLast);
  }]);
})(angular, window.bunsen);
