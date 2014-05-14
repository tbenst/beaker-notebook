;(function(angular) {
  angular.module("filterMarketPlace", [])
  .directive('multiFilter', function() {
    return {
      restrict: 'E',
      template: templates.multi_select,
      compile: function(element, attrs)
      {
        var type = attrs.type || 'text';
        attrs.iteratorDisplayName = attrs.iteratorDisplayName || attrs.iteratorName;
        element.replaceWith(this.template(attrs));
      }
    }
  });
})(angular);
