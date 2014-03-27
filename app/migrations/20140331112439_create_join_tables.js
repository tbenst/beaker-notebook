
module.exports = {
  up: function(knex) {
    return knex.schema.createTable('DataSetsCategories', function(table) {
      table.integer("id");
      table.integer("dataSetId");
      table.integer("categoryId");
    }).then(function() {
      return knex.schema.createTable('DataSetsDataTags', function(table) {
        table.integer("id");
        table.integer("dataSetId");
        table.integer("dataTagId");
      });
    }).then(function() {
      return knex.schema.createTable('DataSetsDataPreviews', function(table) {
        table.integer("id");
        table.integer("dataSetId");
        table.integer("dataPreviewId");
      });
    });
  },

  down: function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('DataSetsCategories'),
      knex.schema.dropTable('DataSetsDataTags'),
      knex.schema.dropTable('DataSetsDataPreviews')
    ]);
  }
}
