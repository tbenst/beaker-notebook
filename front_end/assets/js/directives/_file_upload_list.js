;(function(angular, app) {
  app.directive("fileUploadList", function() {
    return {
      restrict: "E",
      template: templates['directives/file_upload_list'],
      controller: [
        '$compile',
        'FilesFactory',
        '$scope',
        function(
          $compile,
           FilesFactory,
          $scope) {

        function fetchScratchSpaceFiles() {
          FilesFactory.getScratchSpaceFiles()
          .then(function(files) {
            $scope.scratchSpaceFiles = files;
          });
        }

        $scope.openFileModal = function() {
          fetchScratchSpaceFiles();
          $scope.$emit('openModal',
            $compile(templates.scratch_space_file_list_modal())($scope),
            { width: '650px', class: 'file-upload-list' }
          );
        }

        fetchScratchSpaceFiles();
      }]
    }
  })
})(angular, window.bunsen);
