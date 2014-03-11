module.exports = function(app) {

  var CategoriesController = app.Controllers.CategoriesController;

  app.get('/api/categories', CategoriesController.index);
};
