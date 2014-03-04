module.exports = function(app) {
  var UsersController = app.Controllers.UsersController;

  app.param('user_id', UsersController.userIdParam);

  app.put('/api/users/:user_id/subscriptions/:data_set_id', UsersController.subscribe);
  app.del('/api/users/:user_id/subscriptions/:data_set_id', UsersController.unsubscribe);
};
