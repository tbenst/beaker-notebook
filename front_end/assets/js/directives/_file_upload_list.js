;(function(angular, app) {
  app.directive("fileUploadList", function() {
    return {
      restrict: "E",
      template: templates['directives/file_upload_list'],
      controller: [
        '$compile',
        'FilesFactory',
        'Restangular',
        '$scope',
        function(
          $compile,
          FilesFactory,
          Restangular,
          $scope) {

        function fetchScratchSpaceFiles() {
          return FilesFactory.getScratchSpaceFiles()
          .then(function(files) {
            $scope.scratchSpaceFiles = files;
          });
        }

        function selectedFiles() {
          return _(Restangular.stripRestangular($scope.scratchSpaceFiles))
          .filter('selected')
          .pluck('name')
          .value()
        }

        $scope.deleteCheckedFiles = function() {
          FilesFactory.deleteChecked(selectedFiles())
          .then(function() {
            $scope.hideConfirmation();
            $scope.masterCheck = false;
            fetchScratchSpaceFiles();
          })
        }

        $scope.openFileModal = function() {
          $scope.confirmVisible = false;
          $scope.masterCheck = false;
          fetchScratchSpaceFiles()
          .then(function() {
            $scope.$emit('openModal',
              $compile(templates.scratch_space_file_list_modal())($scope),
              { width: '650px', class: 'file-upload-list' }
            );
          })
        }

        $scope.showConfirmation = function() {
          if (selectedFiles().length > 0) { $scope.confirmVisible = true; }
        }

        $scope.hideConfirmation = function() {
          $scope.confirmVisible = false;
        }

        $scope.toggleAll = function() {
          $scope.masterCheck = !$scope.masterCheck;
          return _.each($scope.scratchSpaceFiles, function(file) {
            file.selected = $scope.masterCheck;
          });
        }

        fetchScratchSpaceFiles();
      }]
    }
  })
})(angular, window.bunsen);
