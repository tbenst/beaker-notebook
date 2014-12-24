module.exports = function(app) {
  var UsersController = app.Controllers.UsersController;

  app.put('/api/subscriptions/:index/:data_set_id', UsersController.subscribe);
  app.del('/api/subscriptions/:index/:data_set_id', UsersController.unsubscribe);
  app.get('/api/users/current', UsersController.get);
  app.get('/api/users/scratchspace_files', UsersController.scratchSpaceFiles);
  app.put('/api/users/:id', UsersController.update);
  app.get('/api/contributors', UsersController.contributors);
  app.get('/api/contributors/:cat_id', UsersController.contributorsByCat);

};
