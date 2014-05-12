var Promise = require("bluebird");

module.exports = {
  up: function(knex) {
    return Promise.all([
      knex.schema.createTable("Notebooks", function(table) {
        table.increments('id').primary();
        table.timestamps();
        table.string("name");
        table.integer("projectId");
        table.integer("userId");
        table.boolean("open").defaultTo(false);
      }),
      knex.schema.dropTable("OpenNotebooks")
    ]);
  },

  down: function(knex) {
    return Promise.all([
      knex.schema.dropTable("Notebooks"),
      knex.schema.createTable("OpenNotebooks", function(table) {
        table.increments('id').primary();
        table.string("notebookName");
        table.integer("projectId");
        table.integer("userId");
        table.timestamps();
      })
    ]);
  }
}
