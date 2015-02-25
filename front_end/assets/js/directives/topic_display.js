;(function(angular, app) {
  app.directive("topicDisplay", function($compile){
    function compileAndAppendTemplate(scope, element) {
      var template = "<" + scope.directiveName + "></" + scope.directiveName +">";
      var linkFn = $compile(template);
      var content = linkFn(scope);
      element.append(content);
    }

    return{
      scope: {
        directiveName: "="
      },
      restrict: "E",
      link: function(scope, element){
        compileAndAppendTemplate(scope,element);

        scope.$watch('directiveName', function() {
          element.children().remove();
          compileAndAppendTemplate(scope, element);
        });
      }
    }
  });

  app.directive('example', function() {
    return {
      restrict: "E",
      template: templates['help/example']
    }
  });

  app.directive('styles', function() {
    return {
      restrict: "E",
      template: templates['help/styles']
    }
  });
})(angular, window.bunsen);
