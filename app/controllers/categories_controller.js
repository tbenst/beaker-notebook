module.exports = function(app) {

  var Category = app.Models.Category;

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
      Category.tree()
        .then(function(tree) {
          res.json(tree);
        })
        .catch(next);
    }
  };
};
