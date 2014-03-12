module.exports = function(app) {
  var SeedsController = app.Controllers.SeedsController;
  app.post('/seeds/:model', SeedsController.create);
  app.del('/seeds/', SeedsController.clear);
};

