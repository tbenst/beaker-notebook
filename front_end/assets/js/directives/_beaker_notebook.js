;(function(angular) {
  angular.module("beakerNotebook", [])
  .directive('beakernotebook', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        attrs.$observe("src", function(v) {

          if (v.length) {
            if (cached = document.querySelector("iframe[src='"+attrs.src+"']")) {
              cached.style.display="block";
            } else {
              var frame = document.createElement("iframe")
              frame.src = v;
              frame.setAttribute('width', attrs.width);
              frame.setAttribute('height', attrs.height);
              document.body.appendChild(frame);
            }

            element.on('$destroy', function() {
              var frame = document.querySelector("iframe[src='"+attrs.src+"']");

              if (frame) {
                frame.style.display="none";
              }
            });
          }
        })
      }
    }
  });
})(angular);
