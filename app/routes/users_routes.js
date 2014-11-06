module.exports = function(app) {
  var UsersController = app.Controllers.UsersController;

  app.put('/api/subscriptions/:index/:data_set_id', UsersController.subscribe);
  app.del('/api/subscriptions/:index/:data_set_id', UsersController.unsubscribe);
  app.get('/api/users/current', UsersController.get);
  app.put('/api/users/:id', UsersController.update);
  app.get('/api/contributors', UsersController.contributors);
};
