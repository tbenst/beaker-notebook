exports.up = function(knex, Promise) {
  return knex.schema.table('DataSetsUsers', function (table) {
    table.increments('id').primary()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('DataSetsUsers', function (table) {
    table.dropColumn('id');
  });
};
