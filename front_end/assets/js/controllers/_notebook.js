!(function(angular, app) {
  app.controller('notebook', [
    '$scope',
    '$rootScope',
    '$state',
    '$sce',
    'Factories',
    '$compile',
    '$location',
    'Notebooks',
    'Beaker',
    'BeakerNotebookService',
    function(
      $scope,
      $rootScope,
      $state,
      $sce,
      F,
      $compile,
      $location,
      Notebooks,
      Beaker,
      BeakerNotebookService) {

    var frame;
    var prjId = $state.params.id;

    $scope.projects.search = '';

    $scope.loading = true;

    $scope.menu = false;

    $scope.warning = ""

    $scope.edited = function() {
      return $scope.notebook.current.edited;
    };

    $scope.showMenu = function() {
      this.menu = true;
    };

    $scope.hideMenu = function() {
      this.menu = false;
    };

    var notebookNameTaken = function() {
      return !!_.find($scope.notebooks.list, { name: $scope.saveAsName, projectId: $scope.notebook.current.projectId });
    };

    var scrollToBottom = function() {
      var body = document.body,
          html = document.documentElement;
      var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

      window.scrollTo(window.pageXOffset, height);
    };

    F.Projects.getProject($state.params.id).then(function(project) {
     $scope.project = project;
    });

    if ($rootScope.cachedNotebooks[$state.params.notebook_id]) {
      Notebooks.update({id: $state.params.notebook_id, open: true});
      $scope.notebook = $rootScope.cachedNotebooks[$state.params.notebook_id];
      $scope.loading = false;
    } else {
      F.Notebooks.getNotebook($state.params.notebook_id).then(function(notebook) {
        $scope.notebook = { current: notebook };

        Notebooks.update({id: notebook.id, open: true});

        Beaker.whenReady().then(function(result) {
          $scope.loading = false;
          if (result === 'timeout') {
            return $scope.warning = 'Beaker has timed out.  Please refresh to try again.';
          } else if (result === 'error') {
            return $scope.warning = 'An Error has occurred';
          }
          $scope.notebook.current.location = $sce.trustAsResourceUrl(BeakerNotebookService.notebookLocation(result, prjId, notebook.id));
          $rootScope.cachedNotebooks[notebook.id] = $scope.notebook;
        });
      });
    }

    $scope.save = function(newName) {
      Notebooks.save($scope.notebook.current.id, newName);
      $scope.hideMenu();
    };

    $scope.showStdoutStderr = function() {
      var data = { action: 'showStdoutStderr' };

      Notebooks.sendToIFrame($scope.notebook.current.id, data);
      scrollToBottom();
    };

    $scope.saveAs = function() {
      $scope.saveAsName = $scope.notebook.current.name + ' 2';
      $scope.$emit('openModal', $compile(templates.save_as_modal())($scope));
    };

    $scope.checkSaveAs = function() {
      if (notebookNameTaken()) {
        $scope.error = 'That notebook name is already taken in this project.';
      } else {
        $scope.save($scope.saveAsName);
        $scope.$emit('closeModal');
      }
    };

    $scope.saveAsCancel = function() {
      $scope.$emit('closeModal');
    };

    $scope.destroyPublication = function() {
      F.Publications.destroy($scope.notebook.current.publication.id).then(function() {
        F.Notebooks.getNotebook($scope.notebook.current.id).then(function(notebook) {
          $scope.notebook.current = notebook;
        });
      });
    };

    $scope.openPublishModal = function() {
      $scope.$emit('openModal', $compile(templates.publish_notebook_modal())($scope), { width: '400px' });
    };

    $rootScope.$on('notebook-edited', function(event, data) {
      if ($scope.notebook && $scope.notebook.current.id == data.notebookId) {
        $scope.notebook.current.edited = data.value;
      }
    });

    $scope.$watch('notebook.current', function(newVal) {
      if (!newVal) return;

      $scope.published = !_.isEmpty($scope.notebook.current.publication);
    });

  }]);
} (angular, window.bunsen));
