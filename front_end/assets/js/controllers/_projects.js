;(function(angular, app) {
  app.controller('projects', ['$scope', 'Factories', '$localStorage', '$state', function($scope, Factories, $localStorage, $state) {
    delete $scope.projects.search;

    function goToLast(list) {
      if (!list) {return}

      var id = list[0].id;
      if ($localStorage.projects && $localStorage.projects.last) {
        id = $localStorage.projects.last;
      }
      $state.go('projects.items.item', {id: id});
    }

    $scope.$watch('projects.list', goToLast);
  }]);
})(angular, window.bunsen);
