var config = {};
var env = process.env.NODE_ENV;
var capitalEnv = env.charAt(0).toUpperCase() + env.slice(1);

config[env] = {
  client: 'pg',
  debug : true,
  connection: {
    host     : process.env.POSTGRES_HOST || process.env.EXTERNAL_DB_HOST || process.env.DB_PORT_5432_TCP_ADDR || '127.0.0.1',
    port     : process.env.POSTGRES_PORT || process.env.EXTERNAL_DB_PORT || process.env.DB_PORT_5432_TCP_PORT || 5432,
    user     : process.env.POSTGRES_USER || process.env.EXTERNAL_DB_USER || 'postgres',
    password : process.env.POSTGRES_PASS || process.env.EXTERNAL_DB_PASS || null,
    database : process.env.POSTGRES_NAME || process.env.EXTERNAL_DB_NAME || "bunsen" + capitalEnv,
  },
  directory: './migrations',
  tableName: 'migrations',

  provisioner: {
    host : process.env.PROVISIONER_HOST || process.env.PROVISIONER_PORT_3001_TCP_ADDR || '127.0.0.1',
    port : process.env.PROVISIONER_PORT || process.env.PROVISIONER_PORT_3001_TCP_PORT || 3001
  },
  elasticsearch: {
    host: process.env.ELASTICSEARCH_HOST || process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR || '127.0.0.1',
    port: process.env.ELASTICSEARCH_PORT || process.env.ELASTICSEARCH_PORT_9200_TCP_PORT || 9200,
    apiVersion: process.env.ELASTICSEARCH_VERSION || '1.4'
  },
  beakerHost: "localhost"
};

module.exports = config;
