;(function(angular, app) {
  angular.module("hiddenUpload", [])
  .directive('hiddenUpload', function() {
    return {
      restrict: 'A',
      link : function(scope, element, attrs) {
        var button = element.find('a');
        var upload = element.find('input')[0];
        button.bind('click', function() {
          upload.click();
        });
        element.on('$destroy', function() {
          button.unbind('click');
        });
      }
    }
  });
})(angular, window.bunsen);
