;(function(angular, app) {
  app.directive('categoryEditor', [
    'Factories',
    function(
      Factories) {
      return {
        restrict: 'E',
        template: templates['directives/admin/categories/editor'],
        controller: ['$scope', function($scope) {
          function setModelToNode() {
            $scope.updatedNode = _.pick($scope.node,
                'public-id',
                'parent-id',
                'name');
            $scope.updatedNode['catalog-id'] = $scope.node.catalog['public-id'];
          }

          $scope.editMode = false;

          $scope.checkTarget = function($event) {
            if (_.contains(['INPUT', 'BUTTON'], $event.target.tagName)) $event.stopPropagation();
          };

          $scope.edit = function() {
            $scope.editMode = true;
          };

          $scope.save = function() {
            Factories.Categories.createOrUpdate($scope.updatedNode).then(function(response) {
              if (response.data && response.data['public-id']) {
                $scope.node['public-id'] = response.data['public-id'];
              }
              _.extend($scope.node, $scope.updatedNode, {
                children: []
              });
              $scope.editMode = false;
            });
          };

          $scope.cancel = function() {
            if ($scope.isSaved()) {
              setModelToNode();
            } else {
              $scope.node.parentNode.children = _.without($scope.node.parentNode.children, $scope.node);
            }
            $scope.editMode = false;
          };

          $scope.isSaved = function() {
            return !!$scope.node['public-id'];
          };

          $scope.add = function() {
            $scope.node.children.push({
              'parent-id': $scope.node['public-id'],
              parentNode: $scope.node,
              catalog: {
                'public-id': $scope.node.catalog['public-id'],
              }
            });

            $scope.$emit('treecontrol.open.node', $scope.node);
          };

          setModelToNode();

          // If this node was just added...
          if (!$scope.updatedNode.name) {
            $scope.editMode = true;
          }
        }],
        link: function(scope, element) {
          scope.remove = function() {
            Factories.Categories.remove(scope.node['public-id']).then(function() {
              // There's no good way to remove this node from the tree with the
              // library, so we're just making it so it visually looks like it's
              // gone after deleting
              element.closest('li').remove();
            });
          };
        }
      };
    }
  ]);
})(angular, window.bunsen);
