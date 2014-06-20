module.exports = {
  up: function(knex, Promise) {
    return knex.raw('create index on "DataSetsDataTags"("dataTagId");').then(function() {
      return knex.raw('create index on "DataSetsDataTags"("dataSetId");');
    }).then(function() {
      return knex.raw('create index on "DataSets"("vendorId");');
    });;
  },

  down: function(knex, Promise) {
    return knex.raw('drop index "DataSetsDataTags_dataTagId_idx";').then(function() {
      return knex.raw('drop index "DataSetsDataTags_dataSetId_idx";');
    }).then(function() {
      return knex.raw('drop index "DataSets_vendorId_idx";');
    });;
  }
}
