var _ = require('lodash');

module.exports.init = function(app) {

  require('./status_routes.js')(app);
  require('./auth_routes.js')(app);
  require('./data_sets_routes.js')(app);
  require('./categories_routes.js')(app);
  require('./publication_categories_routes.js')(app);
  require('./projects_routes.js')(app);
  require('./subscription_routes.js')(app);
  require('./publications_routes.js')(app);
  require('./users_routes.js')(app);
  require('./notebook_routes.js')(app);
  require('./tag_routes.js')(app);
  require('./beaker_instances_routes.js')(app);
  require('./ratings_routes.js')(app);

  if (app.get('allow seed')) {
    console.log("WARNING! Enabling seed routes!")
    require('./seed_routes.js')(app);
  }

  return app;
};
