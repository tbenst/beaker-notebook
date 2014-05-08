exports.up = function(knex, Promise) {
  return knex.schema.table('DataSets', function (table) {
    table.text('remoteFile');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('DataSets', function (table) {
    table.dropColumn('remoteFile');
  });
};
