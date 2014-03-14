var _ = require('lodash');

module.exports.init = function(app) {

  require('./data_sets_routes.js')(app);
  require('./categories_routes.js')(app);
  require('./projects_routes.js')(app);
  require('./users_routes.js')(app);
  require('./notebook_routes.js')(app);
  require('./vendor_routes.js')(app);

  if (_.contains(['test', 'development'], app.get('env'))) {
    console.log("Disabling security due to " + app.get('env') + " env; enabling seed route.");
    require('./seeds_routes.js')(app);
  }

  return app;
};
