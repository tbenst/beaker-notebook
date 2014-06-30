module.exports = function(app) {
  var SubscriptionsController = app.Controllers.SubscriptionsController;

  app.get('/api/subscriptions', SubscriptionsController.index);
};
