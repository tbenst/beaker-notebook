;(function(app) {

  app.factory('CategoriesFactory', ['Restangular', 'MarketplaceRestangular', function(Restangular, MR) {

    function initNodes(categories) {
      var nodes = {};
      _.each(categories, function(category) {
        category = Restangular.stripRestangular(category);
        nodes[category['public-id']] = _.extend(category, {
          count: +category.count,
          children: []
        });
      });

      return nodes;
    }

    function generateTree(categories) {
      categories = categories.data;

      var nodes = initNodes(categories);
      var rootNodes = [];

      _.each(categories.reverse(), function(category) {
        var parentNode;
        category = Restangular.stripRestangular(category);
        if (category.parent) {
          parentNode = nodes[category.parent['public-id']];
        }
        var node = nodes[category['public-id']];
        if (parentNode) {
          node.parent = parentNode;
          parentNode.children.unshift(node);
        } else {
          rootNodes.unshift(node);
        }
      });

      return rootNodes;
    }

    return {
      getCategories: function(queryParams) {
        return MR.all('categories').getList(_.extend(queryParams, {size: 9999}))
                .then(generateTree);
      },
      typeahead: function(params) {
        return MR.all('categories').getList(params);
      },
      remove: function(publicId) {
        return MR.one('categories', publicId).remove();
      },
      createOrUpdate: function(params) {
        if (params['public-id']) {
          return MR.one('categories', params['public-id']).customPUT(_.omit(params, 'public-id', 'catalog-id'));
        } else {
          return MR.all('categories').post(params);
        }
      }
    };
  }]);

})(window.bunsen);
