;(function(angular, app) {
  angular.module("showOnHoverParent", [])
  .directive('showOnHoverParent', function() {
    return {
      restrict: 'AE',
      link : function(scope, element, attrs) {
        var isMouseOff = true;
        var childMenu = element[0].parentNode.childNodes[1];
        element.bind('mouseenter', function() {
          childMenu.style.display = 'block'
          isMouseOff = false;
        });
        element.bind('mouseleave', function() {
          setTimeout(function() {
            if(!isMouseOff) {
              childMenu.style.display = 'none'
            }
          }, 2000);
        });
        element.on('$destroy', function() {
          this.removeEventListener('mouseleave');
          this.removeEventListener('mouseenter');
        });
      }
    }
  });
})(angular, window.bunsen);
