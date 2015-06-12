!(function(angular, app) {
  app.controller('project', [
    '$scope',
    '$rootScope',
    '$state',
    '$q',
    'Factories',
    'Notebooks',
    '$upload',
    'NotebookRestangular',
    'RenameNotebook',
    'TrackingService',
    'LastViewed',
    'Beaker',
    function(
      $scope,
      $rootScope,
      $state,
      $q,
      Factories,
      Notebooks,
      $upload,
      NR,
      RenameNotebook,
      TrackingService,
      LastViewed,
      Beaker) {

    var F = Factories;
    $scope.editMode = false;
    $scope.importError = null;

    LastViewed.set('projects');

    $scope.loadProject = function() {
      F.Projects.getProject($state.params.id).then(function(d) {
        $scope.project = d;
      });
    };

    $scope.loadProject();

    $scope.updateUsage = function() {
      F.Files.quota()
      .then(function(quota) {
        F.Files.getScratchSpaceFiles()
        .then(function(files) {
          var total = _.reduce(files, function(memo, file) {return memo + parseInt(file.stat.size, 10)}, 0);
          $scope.diskUsage = {
            quota: quota,
            total: total,
            percent: total * 100 / quota
          };
        });
      });
    };

    $scope.updateUsage();

    $scope.alreadyExistsError = function(notebook, project) {
      $scope.error = "A notebook named '" + notebook + "' already exists in project '" + project + "'";
    };

    $scope.createNotebook = function() {
      Beaker.getBeakerInstance().then(function(instance) {
        var markName = instance !== 'null' ? 'CreateProvisionedNotebook' : 'CreateUnprovisionedNotebook';
        TrackingService.mark(markName);
      })
      .then(function() {
        return NR.one('projects', $scope.project['public-id'])
        .all('notebooks')
        .post();
      })
      .then(function(notebook) {
        $state.go('projects.items.item.notebook', {
          notebook_id: notebook['public-id']
        });
      });
    };

    $scope.renameNotebook = function(notebook) {
      RenameNotebook.openModal($scope, notebook);
    };

    $scope.exportNotebook = function(notebookId) {
      Notebooks.export(notebookId);
    };

    $scope.deleteNotebook = function(notebook) {
      return Notebooks.destroy(notebook['public-id'])
      .then(function() { $scope.project.notebooks = _.reject($scope.project.notebooks, notebook); })
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
      F.Projects.update($state.params.id, $scope.newAttributes).then(function() {
        $scope.loadProject();
        loadProjectList();
        $scope.editMode = false;
        $scope.error = null;
      }, function(response) {
        $scope.error = response.data.name[0];
      });
    }

    $scope.deleteProject = function() {
      F.Projects.deleteProject($state.params.id).then(function() {
        // We have to make sure to delete the project and all its notebooks
        // from the internal scope lists.
        $scope.projects.list =  _.where($scope.projects.list, function(p) {
          return p['public-id'] !== $state.params.id;
        });
        $scope.notebooks.list = _.where($scope.notebooks.list, function(n) {
          return n.project['public-id'] !== $state.params.id;
        });

        LastViewed.clear('projects');
        $state.go('projects.items');
      });
    };

    $scope.onFileSelect = function($files) {
      _.each($files, function(file) {
        var url = NR.one('projects', $scope.project['public-id']).all('notebooks').one('import').getRestangularUrl();
        $scope.upload = $upload.upload({
          url: url,
          method: 'POST',
          file: file
        }).success(function() {
          $scope.importError = null;
          $scope.loadProject();
        }).error(function(e) {
          var errors = ['contents', 'name', 'owner-id'];
          _.each(errors, function(error) {
            if (e[error]) {
              $scope.importError = e[error][0];
            }
          });
        });
      });
    };

    $scope.$watch('project', function() {
      var editableAttributes = ['name', 'description'];
      if ($scope.project !== void(0)) {
        $scope.newAttributes = _.pick($scope.project, editableAttributes);
      }
    });
  }]);
})(angular, window.bunsen);
