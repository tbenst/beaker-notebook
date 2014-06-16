!(function(angular, app) {
  app.controller('notebook', ['$scope', '$state', '$sce','Factories', 'UrlGeneratorService', 'Restangular', '$sessionStorage', '$location', 'Notebooks', function($scope, $state, $sce, Factories, UrlGeneratorService, Restangular, $sessionStorage, $location, Notebooks) {
    var F = Factories;
    var frame;
    var uiUrl = $location.absUrl().split("#")[0];
    var prjId = $state.params.id;

    $scope.projects.search = '';
    $scope.projects.list = [];

    var beakerUrl = function(subPath, params) {
      return window.BUNSEN_SERVICES.beaker + "#/" +
        subPath + "?" + UrlGeneratorService.toParams(_.extend(params,
          {bunsenUiUrl: uiUrl}));
    };

    var notebookLocation = function(userId, projectId, notebookId) {
      var bunsenUri = Restangular.one('notebooks', notebookId).one('contents').getRestangularUrl();

      return beakerUrl("open", {
        uri: bunsenUri,
        userId: userId,
        projectId: projectId,
        notebookId: notebookId
      });
    };

    F.Projects.getProject($state.params.id).then(function(project) {
      $scope.project = project;
    });

    F.Notebooks.getNotebook($state.params.notebook_id).then(function(notebook) {
      var userId    = $sessionStorage.currentUser.id

      $scope.notebookLocation = $sce.trustAsResourceUrl(notebookLocation(userId, prjId, notebook.id));

      F.Notebooks.open(notebook.id).then(function(openNotebooks) {
        Notebooks.setOpenNotebooks(openNotebooks);
        F.Notebooks.getRecentNotebooks().then(function(recent) {
          Notebooks.setRecentNotebooks(recent);
        });
      });

      $scope.notebook = notebook;
    });
  }]);
} (angular, window.bunsen));
