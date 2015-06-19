;(function(app) {

  app.factory('CategoriesFactory', ['Restangular', 'MarketplaceRestangular', function(Restangular, MR) {

    function initNodes(categories) {
      var nodes = {};
      _.each(categories, function(category) {
        category = Restangular.stripRestangular(category);
        nodes[category.index + '_' + category.path] = _.extend(category, {
          count: +category.count,
          children: []
        });
      });

      return nodes;
    }

    function parent(nodes, index, path) {
      var items = path.split('.');
      if (items.length == 1) {
        return null;
      } else {
        items.pop();
        return nodes[index + '_' + items.join('.')];
      }
    }

    function generateTree(categories) {
      categories = categories.data;

      var nodes = initNodes(categories);
      var roots = [];

      _.each(categories.reverse(), function(category) {
        category = Restangular.stripRestangular(category);
        var parentNode = parent(nodes, category.index, category.path);
        var node = nodes[category.index + '_' + category.path];
        if (parentNode) {
          parentNode.children.unshift(node);
        } else {
          roots.unshift(node);
        }
      });

      return _.map(roots, function(root) {
        return nodes[root.index + '_' + root.path];
      });
    }

    return {
      getCategories: function(queryParams) {
        return MR.all('categories').getList(_.extend(queryParams, {size: 9999}))
                .then(generateTree);
      },
      typeahead: function(params) {
        return MR.all('categories').getList(params);
      }
    };
  }]);

})(window.bunsen);
