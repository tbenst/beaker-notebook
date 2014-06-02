;(function(angular) {
  angular.module("stopEvent", [])
   .directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
              element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
              });
              element.on('$destroy', function() {
                this.removeEventListener(attr.stopEvent);
              });
            }
        };
     });
})(angular);
