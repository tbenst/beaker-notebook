module.exports = {
  up: function(knex) {
    return knex.schema.createTable("DataSetsUsers", function(table) {
      table.integer("dataSetId");
      table.integer("userId");
      table.timestamps();
    });
  },

  down: function(knex) {
    return knex.schema.dropTable("DataSetsUsers");
  }
};
