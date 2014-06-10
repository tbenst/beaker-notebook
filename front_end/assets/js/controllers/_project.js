!(function(angular, app) {
  app.controller('project', ['$scope', '$state', 'Factories', '$localStorage', '$upload', 'Restangular', '$sessionStorage', 'WindowMessageService', function($scope, $state, Factories, $localStorage, $upload, Restangular, $sessionStorage, WindowMessageService) {
    var F = Factories;
    $scope.editMode = false;

    // Save last visited project
    $localStorage.projects = $localStorage.projects || {};
    $localStorage.projects.last = $state.params.id;

    $scope.loadProject = function() {
      F.Projects.getProject($state.params.id).then(function(d) {
        $scope.project = d;
      });
    }

    $scope.loadProject();
    WindowMessageService.addNotebookCallback($state.params.id, $scope.loadProject);

    $scope.alreadyExistsError = function(notebook, project) {
      $scope.error = "A notebook named '" + notebook + "' already exists in project '" + project + "'";
    }

    $scope.createNotebook = function() {
      Restangular.one('projects', $scope.project.id)
      .all('notebooks')
      .post()
      .then(function(notebook) {
        $state.go('projects.items.item.notebook', {
          notebook_id: notebook.id
        });
      });
    };

    $scope.editProject = function() {
      $scope.editMode = true;
    };

    function loadProjectList() {
      F.Projects.getProjects($scope).then(function(d) {
        $scope.projects.list = d;
      });
    }

    $scope.updateProject = function() {
      $scope.project.put().then(function() {
        loadProjectList();
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
          $scope.loadProject();
        });
      })
    };
  }]);
})(angular, window.bunsen);
