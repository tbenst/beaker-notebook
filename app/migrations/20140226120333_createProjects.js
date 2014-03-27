module.exports = {
  up: function(knex) {
    return knex.schema.createTable("Projects", function(table) {
      table.increments('id').primary();
      table.string("name");
      table.string("description");
      table.dateTime("lastExecuted");
      table.integer("ownerId");
      table.timestamps();
    });
  },

  down: function(knex) {
    return knex.schema.dropTable("Projects");
  }
};
