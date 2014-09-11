module.exports.init = function(app) {
  app.Controllers = {
    AuthController: require('./auth_controller.js')(app),
    DataSetsController: require('./data_sets_controller.js')(app),
    CategoriesController: require('./categories_controller.js')(app),
    PublicationCategoriesController: require('./publication_categories_controller.js')(app),
    ProjectsController: require('./projects_controller.js')(app),
    NotebooksController: require('./notebooks_controller.js')(app),
    SubscriptionsController: require('./subscriptions_controller.js')(app),
    PublicationsController: require('./publications_controller.js')(app),
    UsersController: require('./users_controller.js')(app),
    DataTagsController: require('./data_tags_controller.js')(app),
    BeakerInstancesController: require('./beaker_instances_controller.js')(app),
  };

  return app;
};
