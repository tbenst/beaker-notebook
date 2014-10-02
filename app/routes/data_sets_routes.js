module.exports = function(app) {

  var DataSetsController    = app.Controllers.DataSetsController;

  app.get('/api/data_sets', DataSetsController.index);
  app.get('/api/data_sets/:data_set_id', DataSetsController.get);
};
