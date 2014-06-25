module.exports = function(app) {

  var Category = app.Models.Category;
  var cachedTree = {key: null, data: null};

  return {
    idParam: function(req, res, next, id) {
      new Category({id: req.params.category_id}).fetch()
        .then(function(category) {
          if (!category) throw new Error('Category not found');
          req.category = category;
        })
        .done(next, next);
    },

    index: function(req, res, next) {
      app.DB.knex('Categories').max('updated_at').then(function(result) {
        var key = (result[0].max || 'empty').toString();
        if (cachedTree.data && cachedTree.key == key) {
          return cachedTree.data;
        }
        else {
          return Category.tree()
            .then(function(tree) {
              cachedTree.key = key;
              cachedTree.data = tree;
              return tree;
            });
        }
      })
      .then(function(treeData) {
        res.json(treeData);
      })
      .catch(next);
    }
  };
};
