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
      Category.tree(req.query.root, req.query.limit)
      .then(res.json.bind(res))
      .catch(next);
    }
  };
};
