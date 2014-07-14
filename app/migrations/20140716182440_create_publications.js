exports.up = function(knex, Promise) {
  return knex.schema.createTable("publications", function(table) {
    table.increments('id').primary();
    table.integer('notebook_id').unique();
    table.text('contents');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('publications');
};
