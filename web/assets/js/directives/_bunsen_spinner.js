;(function(angular, app) {

  app.directive('bunsenSpinner', function() {
    return {
      restrict: "E",
      template: templates['directives/bunsen_spinner']
    }
  });

})(angular, window.bunsen);
