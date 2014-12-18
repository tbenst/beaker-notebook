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

    function goToLast(list) {
      if (!(list && list[0])) {return}
      var omniList = _.filter(list.concat($scope.notebooks.list || []), 'openedAt'),
          mostRecentItem = _.last(_.sortBy(omniList, 'openedAt'));

      stateGo(mostRecentItem || _.last(_.sortBy(list, 'createdAt')))
    }

    $scope.$watch('projects.list', goToLast);
  }]);
})(angular, window.bunsen);
