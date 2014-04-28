module.exports = {
  up: function(knex, Promise) {
    return knex.schema.createTable("OpenNotebooks", function(table) {
      table.increments('id').primary();
      table.string("notebookName");
      table.integer("projectId");
      table.integer("userId");
      table.timestamps();
    });
  },

  down: function(knex, Promise) {
    return knex.schema.dropTable("OpenNotebooks");
  }
}
