module.exports = {
  "development": {
    database: {
      client: 'pg',
      debug : true,
      connection: {
        host     : process.env.DB_PORT_5432_TCP_ADDR || '127.0.0.1',
        user     : process.env.DB_USER || 'postgres',
        password : null,
        database : "bunsenDevelopment",
      },
      directory: './migrations',
      tableName: 'migrations'
    }
  },
  "test": {
    database: {
      client: 'pg',
      debug : false,
      connection: {
        host     : process.env.DB_PORT_5432_TCP_ADDR || '127.0.0.1',
        user     : process.env.DB_USER || 'postgres',
        password : null,
        database : "bunsenTest",
      },
      directory: './migrations',
      tableName: 'migrations'
    }
  },
  "production": {
    database: {
      client: 'pg',
      debug : true,
      connection: {
        host     : process.env.DB_PORT_5432_TCP_ADDR || '127.0.0.1',
        user     : process.env.DB_USER || 'postgres',
        password : null,
        database : "bunsenProduction",
      },
      directory: './migrations',
      tableName: 'migrations'
    }
  }
}
