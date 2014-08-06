var Promise = require('bluebird');

module.exports = {
  up: function(knex) {
    return knex.schema.createTable('beaker_claims', function(table) {
      table.increments('id').primary();
      table.string('container_id');
      table.integer('user_id');
      table.timestamps();
    }).then(function() {
      return knex.raw('create index on "beaker_claims"("user_id", "container_id");')
    });
  },

  down: function(knex) {
    return knex.schema.dropTable('beaker_claims');
  }
}
