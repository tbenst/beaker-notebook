module.exports = function(app) {

  var Category = app.Models.Category;

  return {
    idParam: function(req, res, next, id) {
      Category.find({where: {id: req.params.category_id}})
        .then(function(category) {
          if (!category) throw new Error('Category not found');
          req.category = category;
        })
        .done(next, next);
    }
  };
};
