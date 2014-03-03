module.exports.init = function(app) {

  require('./data_sets_routes.js')(app);
  require('./projects_routes.js')(app);
  require('./users_routes.js')(app);

  return app;
};
