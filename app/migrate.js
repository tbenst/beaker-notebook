var exec  = require('child_process').exec;
var env   = process.env['NODE_ENV'] || "development";

exec('./node_modules/knex/bin/knex migrate:latest -v --environment='+env,
  function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(error);
    }
  }
);
