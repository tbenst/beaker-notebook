
exports.up = function(knex, Promise) {
  return knex.schema.table('Projects', function (table) {
    table.dateTime("openedAt");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('Projects', function (table) {
    table.dropColumn("openedAt");
  });
};
