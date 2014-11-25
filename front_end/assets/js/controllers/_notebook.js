!(function(angular, app) {
  app.controller('notebook', [
    '$scope',
    '$rootScope',
    '$state',
    '$sce',
    'Factories',
    'UrlGeneratorService',
    'Restangular',
    '$compile',
    '$sessionStorage',
    '$location',
    'Notebooks',
    'WindowMessageService',
    'Beaker', function(
      $scope,
      $rootScope,
      $state,
      $sce,
      Factories,
      UrlGeneratorService,
      Restangular,
      $compile,
      $sessionStorage,
      $location,
      Notebooks,
      WindowMessageService,
      Beaker) {

    var F = Factories;
    var frame;
    var uiUrl = $location.absUrl().split("#")[0];
    var prjId = $state.params.id;

    $scope.projects.search = '';

    $scope.loading = true;

    $scope.menu = false;

    $scope.edited = false;

    $scope.showMenu = function() {
      this.menu = true;
    };

    $scope.hideMenu = function() {
      this.menu = false;
    };

    var beakerUrl = function(url, subPath, params) {
      return url + "#/" +
        subPath + "?" + UrlGeneratorService.toParams(_.extend(params,
          {bunsenUiUrl: uiUrl}));
    };

    var notebookLocation = function(url, userToken, projectId, notebookId) {
      var notebookPath = Restangular.one('notebooks', notebookId).one('contents').getRestangularUrl();
      var notebookUrl = $location.protocol() + "://" + $location.host();
      if ($location.port() && $location.port() != 80) {
        notebookUrl += ':' + $location.port();
      }
      notebookUrl += notebookPath;

      return beakerUrl(url, "open", {
        uri: notebookUrl,
        userToken: userToken,
        projectId: projectId,
        notebookId: notebookId
      });
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

    var notebookWindow = function() {
      return document.getElementById('beaker-frame-' + $scope.notebook.current.id).contentWindow;
    };

    if ($scope.cachedNotebooks[$state.params.notebook_id]) {
      Notebooks.update({id: $state.params.notebook_id, open: true});
      $scope.notebook = $scope.cachedNotebooks[$state.params.notebook_id];
      $scope.loading = false;
    } else {
      F.Notebooks.getNotebook($state.params.notebook_id).then(function(notebook) {
        var userToken = $sessionStorage.currentUser.token

        $scope.notebook = { current: notebook };

        Notebooks.update({id: notebook.id, open: true});

        Beaker.whenReady().then(function(url) {
          $scope.notebook.current.location = $sce.trustAsResourceUrl(notebookLocation(url, userToken, prjId, notebook.id));
          $scope.cachedNotebooks[notebook.id] = $scope.notebook;
          $scope.loading = false;
        });
      });
    }

    $scope.save = function(newName) {
      var data = { action: 'save' };
      if (newName) {
        data.name = newName;
      }

      WindowMessageService.sendToIFrame(notebookWindow(), data);
      $scope.hideMenu();
    };

    $scope.showStdoutStderr = function() {
      var data = { action: 'showStdoutStderr' };

      WindowMessageService.sendToIFrame(notebookWindow(), data);
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
      F.Publications.destroy($scope.notebook.current.publication).then(function(notebook) {
        $scope.notebook.current = notebook;
      });
    };

    $scope.openPublishModal = function() {
      $scope.$emit('openModal', $compile(templates.publish_notebook_modal())($scope), { width: '400px' });
    };

    $rootScope.$on('notebook-edited', function(event, data) {
      if ($scope.notebook && $scope.notebook.current.id == data.notebookId) {
        $scope.edited = data.value;
      }
    });

    $scope.$watch('notebook.current', function(newVal) {
      if (!newVal) return;

      $scope.published = !_.isEmpty($scope.notebook.current.publication);
    });

  }]);
} (angular, window.bunsen));
