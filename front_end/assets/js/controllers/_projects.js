;(function(angular, app) {
  app.controller('projects', ['$scope', 'Factories', '$state', function($scope, Factories, $state) {
    delete $scope.projects.search;

    function goToLast(list) {
      if (!(list && list[0])) {return}
      var lastProject = _.last(_.sortBy(list, 'openedAt'));
      $state.go('projects.items.item', {id: lastProject.id});
    }

    $scope.$watch('projects.list', goToLast);
  }]);
})(angular, window.bunsen);
