;(function(angular, app) {
  app.controller('projects', ['$scope', 'Factories', '$state', function($scope, Factories, $state) {
    delete $scope.projects.search;

    function goToLast(list) {
      if (!(list && list[0])) {return}
      var lastProject = _.last(_.sortBy(list, 'opened_at'));
      var lastNotebook = _.last(_.sortBy($scope.notebooks.list, 'openedAt'));
      if (lastProject == null && lastNotebook == null ) {
        lastProject = _.last(_.sortBy(list, 'created_at'));
        $state.go('projects.items.item', {id: lastProject.id} )
      }
      else if (lastNotebook == null || lastProject.opened_at > lastNotebook.openedAt) {
        $state.go('projects.items.item', { id: lastProject.id})
      } else {
        $state.go('projects.items.item.notebook', { id: lastNotebook.projectId, notebook_id: lastNotebook.id })
      }
    }

    $scope.$watch('projects.list', goToLast);
  }]);
})(angular, window.bunsen);
