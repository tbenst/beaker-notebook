;(function(angular, app) {
  app.controller('help', [
    '$scope',
    '$state',
    function(
      $scope,
      $state) {

      $scope.helpState = $scope.helpState || {};

      $scope.topics = [
        { title: 'Example and Styles',
          state: 'help.main.topic1',
          sections: [
            {
              title: 'Styles',
              directiveName:'styles'
            },
            {
              title: 'Example',
              directiveName: 'example'
            }
          ]
        }
      ];

      function currentTopic() {
        var currentStateArr = $state.current.name.split('.');
        if (currentStateArr.length < 3) return;
        var currentTopicState = currentStateArr.splice(0,3).join('.');
        $scope.helpState.currentTopic = _.findWhere($scope.topics, { state: currentTopicState });
      }

      currentTopic();

      $scope.changeSection = function(section) {
        if(section === undefined) return;
        $scope.helpState.currentSection = section;
      }

      $scope.nextSection = function () {
        var sections = $scope.helpState.currentTopic.sections;
        var currentSectionIndex = _.findIndex(sections, { title: $scope.helpState.currentSection.title });
        if (currentSectionIndex < sections.length - 1 ) return sections[currentSectionIndex + 1];
      }

      $scope.previousSection = function () {
        var sections = $scope.helpState.currentTopic.sections;
        var currentSectionIndex = _.findIndex(sections, { title: $scope.helpState.currentSection.title });
        if (currentSectionIndex >= 1) return sections[currentSectionIndex - 1];
      }

      $scope.$watch('$state.current', function() {
        currentTopic();
        if (!$scope.helpState.currentTopic) return;
        $scope.helpState.currentSection = $scope.helpState.currentTopic.sections[0];
      })
  }]);
})(angular, window.bunsen);
