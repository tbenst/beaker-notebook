;(function(angular) {
  angular.module("beakerNotebook", [])
  .directive('beakernotebook', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        attrs.$observe("src", function(v) {

          var frameId = 'beaker-frame-'+attrs.notebookId;
          var frameSelector = '#'+frameId;

          if (v.length) {
            if (cached = document.querySelector(frameSelector)) {
              cached.style.display="block";
            } else {
              var frame = document.createElement("iframe")
              frame.setAttribute('id', frameId);
              frame.src = v;
              frame.setAttribute('width', attrs.width);
              frame.setAttribute('height', attrs.height);
              frame.setAttribute('class', 'beaker');
              document.getElementById('root').appendChild(frame);
            }

            element.on('$destroy', function() {
              var frame = document.querySelector(frameSelector);

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
