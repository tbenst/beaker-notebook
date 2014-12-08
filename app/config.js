var config = {};
var env = process.env.NODE_ENV;
var capitalEnv = env.charAt(0).toUpperCase() + env.slice(1);

config[env] = {
  client: 'pg',
  debug : true,
  connection: {
    host     : process.env.EXTERNAL_DB_HOST || process.env.DB_PORT_5432_TCP_ADDR || '127.0.0.1',
    port     : process.env.EXTERNAL_DB_PORT || process.env.DB_PORT_5432_TCP_PORT || 5432,
    user     : process.env.EXTERNAL_DB_USER || 'postgres',
    password : process.env.EXTERNAL_DB_PASS || null,
    database : process.env.EXTERNAL_DB_NAME || "bunsen" + capitalEnv,
  },
  directory: './migrations',
  tableName: 'migrations',

  provisioner: {
    host : process.env.PROVISIONER_PORT_3001_TCP_ADDR || '127.0.0.1',
    port : process.env.PROVISIONER_PORT_3001_TCP_PORT || '3001'
  },
  beakerHost: "localhost"
};

module.exports = config;
