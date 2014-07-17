exports.up = function(knex, Promise) {
  return knex.schema.table('DataSets', function (table) {
    table.integer('numColumns')
    table.text('csvPreview');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('DataSets', function (table) {
    table.dropColumn('numColumns')
    table.dropColumn('csvPreview');
  });
};
