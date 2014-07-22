;(function(angular) {
  //directive uses code inspired by https://github.com/d-oliveros/angular-sticky
  angular.module('sticky', [])
  .directive('sticky', ['$timeout', function($timeout){
    return {
      restrict: 'A',
      scope: {
        offset: '@',
      },
      link: function($scope, $elem){
        $timeout(function(){
          var offsetTop = $scope.offset || 0,
            $window = angular.element(window),
            doc = document.documentElement,
            stickyLine,
            scrollTop;

          $elem.css('top', offsetTop +'px');

          function setInitial(){
            stickyLine = $elem[0].offsetTop - offsetTop;
            checkSticky();
          }

          function checkSticky(){
            scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

            if ( scrollTop >= stickyLine ){
              $elem.css('top', scrollTop - stickyLine + 'px');
            }
          }
          $window.on('scroll', checkSticky);

          setInitial();
        });
      },
    };
  }]);
})(angular);
