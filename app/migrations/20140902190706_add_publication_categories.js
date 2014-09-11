'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('publication_categories', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('publication_categories');
};
