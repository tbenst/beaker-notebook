!(function(app) {

  app.controller('projectsRoot', ['$scope', 'Factories', '$state', function($scope, Factories, $state) {
    var F = Factories;

    function setProjects() {
      if ($scope.projects.list) return;

      F.Projects.getProjects().then(function(projects) {
        $scope.projects.list = projects;
      });
    }

    function setNotebooks() {
      if ($scope.notebooks.list) return;

      F.Notebooks.getNotebooks().then(function(notebooks) {
        $scope.notebooks.list = notebooks;
      });
    }

    $scope.projects = $scope.projects || {};
    $scope.notebooks = $scope.notebooks || {};

    setProjects();
    setNotebooks();

    $scope.openProject = function(notebookId) {
      $state.go('projects.items.item.notebook', {
        notebook_id: notebookId
      });
    }

    $scope.$watch('projects.search', function(v) {
      if (v !== void(0) && v !== '') {
        if (!$state.includes('**.search')) {
          $state.go($state.current.name + '.search');
        }
        F.Projects.getProjects($scope, v).then(function(d) {
          $scope.projects.searchResults = d;
        });
      } else if (!$state.includes('**.items') && !$state.is("projects.items.item.notebook")) {
        // Empty search term, go back to the parent state
        $state.go('^');
      }
    });

    $scope.$on('notebookUpdated', function(e, notebook) {
      $scope.notebooks.list = _.reject($scope.notebooks.list, function(n) {
        return n.id == notebook.id;
      });

      $scope.notebooks.list.push(notebook);
    });

    $scope.$on('notebookDeleted', function(e, notebookId) {
      $scope.notebooks.list = _.reject($scope.notebooks.list, function(n) {
        return n.id == notebookId;
      });
    });
  }]);
})(window.bunsen);
