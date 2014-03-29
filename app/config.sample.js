module.exports = {
  "development": {
    database: {
      client: 'pg',
      debug : true,
      connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : null,
        database : "bunsenDevelopment",
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
        host     : '127.0.0.1',
        user     : 'root',
        password : null,
        database : "bunsenProduction",
      },
      directory: './migrations',
      tableName: 'migrations'
    }
  }
}
