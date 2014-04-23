var Seed            = require('./seed.js');
var when            = require('when');
var data            = Array.prototype.concat(
  require('./seed_files/users'),
  require('./seed_files/projects'),
  require('./seed_files/vendors'),
  require('./seed_files/data_previews'),
  require('./seed_files/data_tags'),
  require('./seed_files/categories'),
  require('./seed_files/data_sets'),
  require('./seed_files/notebooks')
);

Seed(data)
.catch(function(e) {
  console.log(e);
  process.exit(1);
})
.done(function() {
  console.log("DB seeded.")
  process.exit(0);
});
