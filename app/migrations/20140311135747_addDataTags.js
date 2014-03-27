module.exports = {
  up: function(knex) {
    return knex.schema.createTable("DataTags", function(table) {
      table.increments('id').primary();
      table.string("name");
      table.timestamps();
    });
  },
  down: function(knex) {
    return knex.schema.dropTable("DataTags");
  }
}
