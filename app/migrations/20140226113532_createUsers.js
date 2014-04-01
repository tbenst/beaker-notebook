module.exports = {
  up: function(knex, Promise) {
    return knex.schema.createTable("Users", function(table) {
      table.increments('id').primary();
      table.string("name");
      table.string("email");
      table.timestamps();
    });
  },

  down: function(knex, Promise) {
    return knex.schema.dropTable("Users");
  }
};
