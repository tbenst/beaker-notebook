var Seed            = require('./seed.js');
var when            = require('when');
var notebook        = require('./lib/notebook');
var notebookData    = require('./seed_files/notebooks.json');
var data            = Array.prototype.concat(
  require('./seed_files/users'),
  require('./seed_files/projects'),
  require('./seed_files/vendors'),
  require('./seed_files/data_previews'),
  require('./seed_files/data_tags'),
  require('./seed_files/categories'),
  require('./seed_files/data_sets')
);

Seed(data)
.then(function(models) {
  return createNotebooks(models);
})
.done(function() {
  console.log("DB seeded.")
  process.exit();
});

function createNotebooks(models) {
  return new models.User({email: 'dummy@example.com'})
  .fetch()
  .then(function(user) {
    return user.projects()
    .fetch()
    .then(function(projects) {
      return when.map(notebookData, function(n) {
        return notebook.create({userId: user.id,
          projectId: projects.models[0].id,
          name: n.name,
          data: n.data
        });
      });
    });
  });
}
