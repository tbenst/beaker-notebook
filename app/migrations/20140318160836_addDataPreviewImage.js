module.exports = {
  up: function(knex) {
    return knex.schema.createTable("DataPreviews", function(table) {
      table.increments("id").primary();
      table.string("previewUrl");
      table.string("smallPreviewUrl")
      table.timestamps();
    });
  },

  down: function(knex) {
    return knex.schema.dropTable("DataPreviews");
  }
}
