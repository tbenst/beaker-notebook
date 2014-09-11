module.exports = function(app) {
  var PublicationCategoriesController = app.Controllers.PublicationCategoriesController;

  app.get('/api/publication_categories', PublicationCategoriesController.index);
};
