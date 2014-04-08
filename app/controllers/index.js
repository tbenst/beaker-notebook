module.exports.init = function(app) {
  app.Controllers = {
    DataSetsController: require('./data_sets_controller.js')(app),
    CategoriesController: require('./categories_controller.js')(app),
    ProjectsController: require('./projects_controller.js')(app),
    NotebooksController: require('./notebooks_controller.js')(app),
    UsersController: require('./users_controller.js')(app),
    VendorsController: require('./vendors_controller.js')(app),
    DataTagsController: require('./data_tags_controller.js')(app)
  };

  return app;
};
