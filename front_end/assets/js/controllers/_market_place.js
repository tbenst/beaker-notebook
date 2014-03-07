!(function(angular, app) {
  app.controller('marketPlace', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.one('data_sets').getList().then(function(d) {
      $scope.data = d;
    });

    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
    }

    $scope.onTreeSelection = function(node) {
      $scope.categoryFilterBy = node.category;
    }

    $scope.categoryFilter = function() {
      return true;
    }

    $scope.treeData = [
      { "category" : "hats", "count" : "2", "children" : [
        {
          "category": "top hats", "count" : 1, children: []
        },
        {
          "category": "baseball hats", "count" : 1, children: []
        },
      ]},
      { "category" : "pants", "count": 4, children: []},
      { "category" : "shirts", "count": 4, children: []},
    ];

  }]);
})(angular, window.bunsen);
