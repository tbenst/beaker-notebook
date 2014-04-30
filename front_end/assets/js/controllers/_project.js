!(function(angular, app) {
  app.controller('project', ['$scope', '$state', 'Factories', '$localStorage', '$upload', 'Restangular', '$sessionStorage', function($scope, $state, Factories, $localStorage, $upload, Restangular, $sessionStorage) {
    var F = Factories;
    $scope.editMode = false;
    $scope.importMode = false;

    // Save last visited project
    $localStorage.projects = $localStorage.projects || {};
    $localStorage.projects.last = $state.params.id;

    function loadNotebooks() {
      F.Notebooks.getNotebooks($state.params.id).then(function(notebooks) {
        $scope.notebooks = notebooks.list;
        $scope.numCommits = notebooks.numCommits;
        $scope.notebookUpdated = notebooks.lastUpdated;
      });
    }

    F.Projects.getProject($state.params.id).then(function(d) {
      $scope.project = d;
      $scope.updatedAt = new Date(d.updated_at);
    });

    loadNotebooks();

    $scope.$watch('updatedAt + notebookUpdated', function() {
      $scope.lastUpdated = new Date(Math.max($scope.updatedAt, $scope.notebookUpdated));
    });

    $scope.editProject = function() {
      $scope.editMode = true;
    };

    $scope.importNotebooks = function() {
      $scope.importMode = true;
    };

    $scope.updateProject = function() {
      $scope.project.put().then(function() {

        _.extend(
          _.findWhere($scope.projects.list),
          _.pick($scope.project, ['name', 'description'])
        );

        $scope.editMode = false;
      });
    }

    $scope.deleteProject = function() {
      F.Projects.deleteProject($state.params.id).then(function() {
        // We have to make sure to delete the
        // project from the internal
        // scope project list.
        $scope.projects.list =  _.where($scope.projects.list, function(p) {
          return p.id !== +$state.params.id;
        });
        delete $localStorage.projects.last
        $state.go('projects.items');
      });
    };

    $scope.onFileSelect = function($files) {
      _.each($files, function(file) {
        var url = Restangular.one('projects', $scope.project.id).all('notebooks').one('import').getRestangularUrl();
        $scope.upload = $upload.upload({
          url: url,
          method: 'POST',
          headers: {'Authorization': $sessionStorage.currentUser.token},
          file: file
        }).then(function() {
          $scope.importMode = false;
          loadNotebooks();
        });
      })
    };
  }]);
})(angular, window.bunsen);
