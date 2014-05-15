!(function(angular, app) {
  app.controller('notebook', ['$scope', '$state', '$sce','Factories', 'UrlGeneratorService', 'Restangular', '$sessionStorage', '$location', 'Notebooks', function($scope, $state, $sce, Factories, UrlGeneratorService, Restangular, $sessionStorage, $location, Notebooks) {
    var F = Factories;
    var frame;
    var uiUrl = $location.absUrl().split("#")[0];
    var prjId = $state.params.id;

    $scope.projects.search = '';
    $scope.projects.list = [];

    $scope.closeNotebook = function(projectId, notebookName) {
      F.Notebooks.close.apply(this, arguments).then(function(openNotebooks) {
        Notebooks.setOpenNotebooks(openNotebooks);
        if (frame = document.querySelector("iframe[src='"+$scope.notebookLocation.toString()+"']")) {
          document.body.removeChild(frame);
        }
        $state.go('^');
      });
    }

    var beakerUrl = function(subPath, params) {
      return "http://" + $location.host() + ":8801/beaker/#/" +
        subPath + "?" + UrlGeneratorService.toParams(_.extend(params,
          {bunsenUiUrl: uiUrl}));
    }

    var notebookLocation = function(userId, projectId, notebookName) {
      var bunsenUri = Restangular.one('projects', projectId).
        one('notebooks', notebookName).one('contents').getRestangularUrl();

      return beakerUrl("open", {
        uri: bunsenUri,
        userId: userId,
        projectId: projectId,
        notebookName: notebookName
      });
    };

    F.Projects.getProject($state.params.id).then(function(project) {
      $scope.project = project;
    });

    F.Notebooks.getNotebook(prjId, $state.params.name).then(function(notebook) {
      var userId    = $sessionStorage.currentUser.id

      $scope.notebookLocation = $sce.trustAsResourceUrl(notebookLocation(userId, prjId, notebook.name));

      F.Notebooks.open(prjId, notebook.name).then(function(openNotebooks) {
        Notebooks.setOpenNotebooks(openNotebooks);
      });

      F.RecentNotebooks.add({
        notebookName: notebook.name,
        projectId: prjId
      }).then(function(d) {
        Notebooks.setRecentNotebooks(d.recentNotebooks);
      });

      $scope.notebook = notebook;
    });
  }]);
} (angular, window.bunsen));
