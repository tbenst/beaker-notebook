module.exports = {
  up: function(knex, Promise) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS pg_trgm')
      .then(function() {
        return knex.raw('create index "DataSets_title" ON "DataSets" using gin(title gin_trgm_ops)');
      })
      .then(function() {
        return knex.raw('create index "DataSets_description" ON "DataSets" using gin(description gin_trgm_ops)');
      })
      .then(function() {
        return knex.raw('create index "Vendors_name" ON "Vendors" using gin(name gin_trgm_ops)');
      });
  },
  down: function(knex, Promise) {
    return knex.raw('drop index "DataSets_title"')
      .then(function() {
         return knex.raw('drop index "DataSets_description"');
      })
      .then(function() {
        return knex.raw('drop index "Vendors_name"');
       })
      .then(function() {
        return knex.raw('drop extension pg_trgm');
       });
  }
}
