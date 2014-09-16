;(function(angular) {
  angular.module("filterMarketPlace", [])
  .directive('multiFilter', function() {
    return {
      restrict: 'E',
      template: templates.multi_select,
      scope: {
        filterScope: '=',
        collection: '='
      },
      link: function(scope, element, attrs) {

        scope.isItemSelected = function(item) {
          if (scope.filterScope) {
            return scope.filterScope.indexOf(item) != -1;
          }
        }

        scope.selectItem = function(item) {
          if(!scope.isItemSelected(item)) {
            scope.filterScope = scope.filterScope || [];
            scope.filterScope.push(item);
          } else {
            var removeIndex = scope.filterScope.indexOf(item);
            if (removeIndex != -1) {
              scope.filterScope.splice(removeIndex, 1);
            }
          }
        }
      }

    }
  });
})(angular);
