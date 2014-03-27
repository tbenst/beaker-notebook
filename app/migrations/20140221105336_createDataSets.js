module.exports = {
  up: function(knex, Promise) {
    return knex.schema.createTable('DataSets', function(table) {
      table.increments('id').primary();
      table.text("title");
      table.text("description");
      table.string("url");
      table.string("format");
      table.bigInteger("rows");
      table.integer("vendorId");
      table.dateTime("lastUpdated");
      table.string("updateFrequency");
      table.date("startDate");
      table.timestamps();
    });
  },

  down: function(knex, Promise) {
    return knew.schema.dropTable('DataSets');
  }
}
