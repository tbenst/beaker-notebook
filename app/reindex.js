var indexer = require('./lib/indexer');

indexer.index()
.catch(function(err) {
  console.log(err.stack);
  process.exit(1);
})
.done(function() {
  process.exit(0);
});
