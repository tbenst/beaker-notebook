;(function(angular, app) {
  app.directive('datasetEditor', [
    'Notebooks',
    '$rootScope',
    '$compile',
    function(
      Notebooks,
      $rootScope,
      $compile) {

    return {
      restrict: 'E',
      template: templates['directives/admin/datasets/editor'],
      scope: {
        dataset: '=',
        creating: '=',
        onEdit: '&'
      }
    };
  }]);
})(angular, window.bunsen);

