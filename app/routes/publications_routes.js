module.exports = function(app) {
  var PublicationsController = app.Controllers.PublicationsController;

  app.post('/api/publications', PublicationsController.create);
};
