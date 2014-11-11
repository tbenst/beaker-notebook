module.exports = function(app) {
  var PublicationCategoriesController = app.Controllers.PublicationCategoriesController;

  app.param('category_id', PublicationCategoriesController.categoryIdParam);

  app.get('/api/publication_categories', PublicationCategoriesController.index);
  app.get('/api/publication_categories/:category_id', PublicationCategoriesController.get);
};
