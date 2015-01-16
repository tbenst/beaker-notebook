!(function(app) {

  app.controller('projectsRoot', [
    '$scope',
    'Factories',
    '$state',
    '$rootScope',
    'TrackingService',
    function(
      $scope,
      Factories,
      $state,
      $rootScope,
      TrackingService) {
    var F = Factories;

    if($rootScope.referrer.fromState.name === "landing") {
      TrackingService.mark('Authenticated');
      TrackingService.measure('BaselineAccountCreation', 'SignUp', 'Authenticated');
      TrackingService.measure('BaselineAccountSignIn', 'SignIn', 'Authenticated');
    }

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

    $scope.openProject = function(notebook) {
      $state.go('projects.items.item.notebook', {
        id: notebook.projectId,
        notebook_id: notebook.id
      });
    }

    $scope.isViewingNotebook = function (notebookId) {
       return $state.includes('projects.items.item.notebook') && $state.params.notebook_id == notebookId;
    };

    $scope.projects = $scope.projects || {};
    $scope.notebooks = $scope.notebooks || {};
    $scope.searchable = $scope.searchable || {}

    setProjects();
    setNotebooks();

    $scope.$watch('searchable.search', function(v) {
      if (v !== void(0) && v !== '') {
        if (!$state.includes('**.search')) {
          $state.go($state.current.name + '.search');
        }
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
