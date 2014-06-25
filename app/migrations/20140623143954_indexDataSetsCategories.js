module.exports = {
  up: function(knex, Promise) {
    return knex.raw('create index on "DataSetsCategories"("categoryId");').then(function() {
      return knex.raw('create index on "DataSetsCategories"("dataSetId");');
    });
  },
  down: function(knex, Promise) {
    return knex.raw('drop index "DataSetsCategories_categoryId_idx";').then(function() {
      return knex.raw('drop index "DataSetsCategories_dataSetId_idx";');
    });
  }
}
