;(function(angular) {
  angular.module("beakerNotebook", [])
  .directive('beakernotebook', function() {
    return {
      restrict: 'E',
      scope: {
        notebook: "=",
        width: "@",
        height: "@"
      },
      link: function(scope, element) {
        scope.$watch("notebook", function(nu, old) {
          if (nu == void 0) {
            return ;
          }

          var notebook      = scope.notebook.current;
          var id            = notebook.id;
          var location      = notebook.location;
          var frameId       = 'beaker-frame-'+id;
          var frameSelector = '#'+frameId;
          var cached        = document.querySelector(frameSelector);

          if (location == void 0 && cached == void 0) {
            return ;
          }

          if (cached) {
            cached.style.display="block";
          } else {
            var frame = document.createElement("iframe")
            frame.setAttribute('id', frameId);
            frame.src = location.toString();
            frame.setAttribute('width', scope.width);
            frame.setAttribute('height', scope.height);
            frame.setAttribute('scrolling', 'no');
            frame.setAttribute('class', 'beaker');
            document.getElementById('beaker-container').appendChild(frame);
          }

          element.on('$destroy', function() {
            var frame = document.querySelector(frameSelector);

            if (frame) {
              frame.style.display="none";
            }
          });

        }, true)
      }
    }
  });
})(angular);
