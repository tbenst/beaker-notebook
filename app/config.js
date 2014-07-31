var config = {};
var env = process.env.NODE_ENV;
var capitalEnv = env.charAt(0).toUpperCase() + env.slice(1);

config[env] = {
  client: 'pg',
  debug : env != 'test',
  connection: {
    host     : process.env.DB_PORT_5432_TCP_ADDR || '127.0.0.1',
    user     : process.env.DB_USER || 'postgres',
    password : null,
    database : "bunsen" + capitalEnv,
  },
  directory: './migrations',
  tableName: 'migrations',

  provisioner: {
    host : process.env.PROVISIONER_PORT_3001_TCP_ADDR || '127.0.0.1',
    port : process.env.PROVISIONER_PORT_3001_TCP_PORT || '3001'
  }
};

module.exports = config;
