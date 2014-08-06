!(function(angular, app) {
  app.controller('notebook', [
    '$scope',
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

    var beakerUrl = function(url, subPath, params) {
      return url + "#/" +
        subPath + "?" + UrlGeneratorService.toParams(_.extend(params,
          {bunsenUiUrl: uiUrl}));
    };

    var notebookLocation = function(url, userId, projectId, notebookId) {
      var notebookPath = Restangular.one('notebooks', notebookId).one('contents').getRestangularUrl();
      var notebookUrl = $location.protocol() + "://" + $location.host();
      if ($location.port() && $location.port() != 80) {
        notebookUrl += ':' + $location.port();
      }
      notebookUrl += notebookPath;

      return beakerUrl(url, "open", {
        uri: notebookUrl,
        userId: userId,
        projectId: projectId,
        notebookId: notebookId
      });
    };

    if ($scope.cachedNotebooks[$state.params.notebook_id]) {
      Notebooks.update({id: $state.params.notebook_id, open: true});
      $scope.notebook = $scope.cachedNotebooks[$state.params.notebook_id];
      $scope.loading = false;
    } else {
      F.Notebooks.getNotebook($state.params.notebook_id).then(function(notebook) {
        var userId = $sessionStorage.currentUser.id

        $scope.notebook = { current: notebook };

        Notebooks.update({id: notebook.id, open: true});

        Beaker.whenReady().then(function(url) {
          $scope.notebook.current.location = $sce.trustAsResourceUrl(notebookLocation(url, userId, prjId, notebook.id));
          $scope.cachedNotebooks[notebook.id] = $scope.notebook;
          $scope.loading = false;
        });
      });
    }

    $scope.publish = function() {
      F.Notebooks.publish($scope.notebook).then(function(notebook) {
        $scope.notebook.current = notebook;
        $scope.$emit('closeModal');
      });
    };

    $scope.cancelPublish = function() {
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

    $scope.$watchCollection('projects.list', function() {
      $scope.project = _.find($scope.projects.list, {id: parseInt($state.params.id)});
    });

    $scope.$watch('notebook.current', function(newVal) {
      if (!newVal) return;

      $scope.published = !_.isEmpty($scope.notebook.current.publication);
    });

  }]);
} (angular, window.bunsen));
