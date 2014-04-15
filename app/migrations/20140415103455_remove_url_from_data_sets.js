exports.up = function(knex, Promise) {
  return knex.schema.table('DataSets', function (table) {
    table.dropColumn('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('DataSets', function (table) {
    table.string('url');
  });
};
