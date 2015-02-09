;(function(angular, app) {
  app.directive('ratings', ['Factories', function(Factories) {
    return {
      restrict: 'AE',
      template: templates['rating'],
      scope: {
        average: "=",
        max: "=",
        ratingAttrs: "=",
        score: "="
      },
      controller: ['$scope', function($scope) {
        $scope.stars = [];
        $scope.avgStars = [];

        function setStars(starArr, score) {
          _.times($scope.max, function(i) {
            starArr[i] = { full: Math.round(score) > i };
          });
        }

        $scope.hover = function(index) {
          $scope.hoverIndex = index;
        };

        $scope.stopHover = function() {
          $scope.hoverIndex = -1;
        };

        $scope.starClass = function(star, index) {
          var starClass = 'rating-normal';
          if (star.full || index <= $scope.hoverIndex) {
            starClass = 'rating-highlight';
          }
          return starClass;
        };

        $scope.setRating = function(index) {
          if ($scope.score === index + 1) return;
          $scope.ratingAttrs.score = index + 1;
          Factories.Ratings.createRating($scope.ratingAttrs)
          .then(function() {
            return Factories.Ratings.averageRating($scope.ratingAttrs)
          })
          .then(function(average) {
            $scope.average = average;
            $scope.score = index + 1;
          });
        };

        $scope.$watch('score', function(newValue, oldValue) {
          if (newValue !== void(0)) {
            setStars($scope.stars, $scope.score);
            setStars($scope.avgStars, $scope.average);
          }
        });
      }]
    };
  }]);
})(angular, window.bunsen);
