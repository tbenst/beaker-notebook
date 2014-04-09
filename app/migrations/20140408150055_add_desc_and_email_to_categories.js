exports.up = function(knex, Promise) {
  return knex.schema.table('Categories', function (table) {
    table.string('ownerName');
    table.string('ownerEmail');
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Categories', function (table) {
    table.dropColumn('ownerEmail');
    table.dropColumn('ownerName');
    table.dropColumn('description');
  });
};
