exports.up = function(knex, Promise) {
  return knex.schema.table('notebooks', function(table) {
    table.text('description');
    table.integer('category_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('notebooks', function(table) {
    table.dropColumn('description');
    table.dropColumn('category_id');
  });
};
