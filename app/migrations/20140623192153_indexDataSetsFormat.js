module.exports = {
  up: function(knex, Promise) {
    return knex.raw('create index on "DataSets"("format");');
  },
  down: function(knex, Promise) {
    return knex.raw('drop index "DataSets_format_idx";');
  }
}
