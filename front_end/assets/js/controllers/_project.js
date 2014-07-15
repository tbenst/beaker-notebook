!(function(angular, app) {
  app.controller('project', ['$scope', '$rootScope', '$state', '$q', 'Factories', 'Notebooks', '$upload', 'Restangular', '$sessionStorage', 'WindowMessageService', function($scope, $rootScope, $state, $q, Factories, Notebooks, $upload, Restangular, $sessionStorage, WindowMessageService) {
    var F = Factories;
    $scope.editMode = false;
    $scope.importError = null;

    $scope.loadProject = function() {
      F.Projects.getProject($state.params.id).then(function(d) {
        $scope.project = d;
      });
    };

    $rootScope.$on('window-message-notebook-create', function(event, notebook) {
      $state.go('projects.items.item.notebook', { notebook_id: notebook.id });
    });

    $scope.alreadyExistsError = function(notebook, project) {
      $scope.error = "A notebook named '" + notebook + "' already exists in project '" + project + "'";
    };

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

    $scope.deleteNotebook = function(notebook) {
      (notebook.open ? Notebooks.closeNotebook(notebook.id) : resolvedPromise())
      .then(function() { return Notebooks.destroy(notebook.id); })
      .then(function() { _.pull($scope.project.notebooks, notebook); })
      .catch(function(response) {
        alert(response.data);
      });
    };

    function resolvedPromise() {
      deferred = $q.defer();
      deferred.resolve(true);
      return deferred.promise;
    }

    $scope.editProject = function() {
      $scope.editMode = true;
    };

    function loadProjectList() {
      F.Projects.getProjects($scope).then(function(d) {
        $scope.projects.list = d;
      });
    }

    $scope.updateProject = function() {
      $scope.project.customPUT($scope.newAttributes).then(function() {
        loadProjectList();
        $scope.editMode = false;
        $scope.error = null;
      }, function(response) {
        $scope.error = response.data.error;
      });
    }

    $scope.deleteProject = function() {
      F.Projects.deleteProject($state.params.id).then(function() {
        // We have to make sure to delete the project and all its notebooks
        // from the internal scope lists.
        $scope.projects.list =  _.where($scope.projects.list, function(p) {
          return p.id !== +$state.params.id;
        });
        $scope.notebooks.list = _.where($scope.notebooks.list, function(n) {
          return n.projectId !== +$state.params.id;
        });
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
        }).success(function() {
          $scope.importError = null;
          $scope.loadProject();
        }).error(function(e) {
          $scope.importError = e.error;
        });
      })
    };

    $scope.$watch('project', function() {
      var editableAttributes = ['name', 'description'];

      $scope.newAttributes = _.pick($scope.project, editableAttributes);
    });

    $scope.$watchCollection('projects.list', function() {
      $scope.project = _.find($scope.projects.list, {id: parseInt($state.params.id)});
    });

    $scope.$watchCollection('notebooks.list', function() {
      $scope.project = $scope.project || {};

      $scope.project.notebooks = _.where($scope.notebooks.list, {projectId: parseInt($state.params.id)});
    });
  }]);
})(angular, window.bunsen);
